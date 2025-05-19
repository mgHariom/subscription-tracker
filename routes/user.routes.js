import { Router } from "express";
import authorize from '../middlewares/auth.middleware.js';
import { getUsers, getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => res.send({title: "CREATE new User Profile"}));

userRouter.put("/:id", (req, res) => res.send({title: "update User Profile"}));

userRouter.delete("/:id", (req, res) => res.send({title: "DELETE User Profile"}));

export default userRouter;