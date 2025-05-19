import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express');
import dayjs from 'dayjs';
import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js';

const REMAINDERS = [7,5,2,1]

export const sendRemainders = serve( async(context) => {
    const {subscriptionId} = context.requestPayload;

    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())) {
        console.log(`renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`)
        return;
    }

    for (const daysBefore of REMAINDERS) {
        const remainderDate = renewalDate.subtract(daysBefore, 'day');

        if(remainderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, remainderDate);
        }

        if (dayjs().isSame(remainderDate, 'day')) {
            await triggerReminder(context, `${daysBefore} days before reminder`, subscription)
        }

        await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', async() => {
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async(context, label, subscription) => {
    return await context.run(label, async() => {
        console.log(`Triggering ${label} reminder`);
        
        await sendReminderEmail( {
            to: subscription.user.email,
            type: label,
            subscription,

        })
    })
}