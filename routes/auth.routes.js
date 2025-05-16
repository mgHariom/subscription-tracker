import { Router } from "express";

const authRouter = Router();

authRouter.get("/", (req, res) => {res.send({title: "GET all users"})})

authRouter.post("/sign-up", (req, res) => {res.send( {title: "Sign Up"})});

authRouter.post("/sign-in", (req, res) => {res.send({title: "Sign in"})});

authRouter.post("/sign-out", (req, res) => {res.send({title: "Sign out"})});

export default authRouter;