import { Router } from "express";
import authorize from '../middlewares/auth.middleware.js'
import {createSubscription, getUserSubscription} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({title: "GET all Subscription"}));

subscriptionRouter.get('/:id', (req, res) => res.send({title: "GET Subscription details"}));

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => res.send({title: "UPDATE Subscription"}));

subscriptionRouter.delete('/:id', (req, res) => res.send({title: "DELETE Subscription"}));

subscriptionRouter.get('/user/:id', authorize, getUserSubscription);

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({title: "CANCEL Subscription"}));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({title: "GET upcoming renewals"}));

export default subscriptionRouter;