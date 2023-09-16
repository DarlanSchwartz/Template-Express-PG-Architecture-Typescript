import { Router } from "express";
import validateSchema from "@/middlewares/validateSchema.middleware";
import PostSchema from "@/schemas/posts.schemas";
import PostController from "@/controllers/posts.controller";

const postsRouter = Router();

postsRouter.get("/posts", PostController.getAll);
postsRouter.post("/new-post", validateSchema(PostSchema), PostController.create);
postsRouter.patch("/like-post/:id", PostController.like);
postsRouter.delete("/remove-post/:id", PostController.remove);
postsRouter.put("/update-post/:id", validateSchema(PostSchema), PostController.edit);

export default postsRouter;