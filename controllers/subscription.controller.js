import Subscription from '../models/subscription.model.js';
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        })

        const {workflowRunId} = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscriptions/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            Headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        })

        res.status(200).json({success: true, data: {subscription, workflowRunId}});
    } catch (error) {
        next(error)
    }
}

export const getUserSubscription = async (req, res, next) => {
    try {
        //check if the user is the same as the one in token
        if(req.user.id !== req.params.id) {
            const error = new Error('you are not the owner of this account')
            error.status = 401
            throw error 
        }

        const subscriptions = await Subscription.find({user: req.params.id});

        res.status(200).json({success: true, data: subscriptions})
    } catch (error) {
        next(error)
    }
}