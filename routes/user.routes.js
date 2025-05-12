import { Router } from "express";

const userRouter = Router();

userRouter.get("/users", (req, res) => res.send({title: "GET all User Profile"}));

userRouter.get("/:id", (req, res) => res.send({title: "GET user profile"}));

userRouter.post("/", (req, res) => res.send({title: "CREATE new User Profile"}));

userRouter.put("/:id", (req, res) => res.send({title: "update User Profile"}));

userRouter.delete("/:id", (req, res) => res.send({title: "DELETE User Profile"}));

export default userRouter;