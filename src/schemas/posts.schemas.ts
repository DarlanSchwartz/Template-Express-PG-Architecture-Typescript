import JoiBase, { Root } from "joi";
import { Post } from "@/protocols/post.types";
import JoiDate from "@joi/date";

const Joi = JoiBase.extend(JoiDate) as Root;

const PostSchema = Joi.object<Post>({
  name: Joi.string().min(3).max(100).required(),
  writerId: Joi.number().required(),
  likeCount: Joi.number().required(),
  content: Joi.string().min(3).max(600).required(),
  createdAt: Joi.date().format('DD-MM-YYYY').less('now').required()
});

export default PostSchema;