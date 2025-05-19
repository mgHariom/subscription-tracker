import dayjs from "dayjs";
import { emailTemplates } from "./email-template.js";
import transporter, { accountEmail } from "../config/nodemailer.js";

export const sendReminderEmail = async({to, type, subscription}) => {
    if(!to || !type) throw new Error(`Missing required params`);

    const template = emailTemplates.find((t) => t.label == type);

    if(!template) throw new Error(`invalid email type`);

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('DD-MM-YYYY'),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} ${subscription.frequency}`,
        PaymentMethod: subscription.paymentMethod,

    }

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);
    
    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message,
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) return console.log(error, 'Error sending email');

        console.log('email sent' + info.response)
    })
}