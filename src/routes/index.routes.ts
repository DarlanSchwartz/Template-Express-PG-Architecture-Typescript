import { Router } from "express";
import postsRouter from "./posts.routes";

const MainRouter = Router();
MainRouter.use(postsRouter);
export default MainRouter;