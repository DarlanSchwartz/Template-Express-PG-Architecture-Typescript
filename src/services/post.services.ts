import { CustomError, ErrorType } from "@/protocols/error.types";
import { Post } from "@/protocols/post.types";
import PostRepository from "@/repositories/post.repositories";
import createDateFromDDMMYYYY from "./date.services";

async function getAll(limit: number, name: string): Promise<Array<Post>> {
  const posts = await PostRepository.getAll(limit, name);
  return posts;
}

async function create(post: Post): Promise<void> {
  post.createdAt = createDateFromDDMMYYYY(post.createdAt.toString());
  await PostRepository.create(post);
}

async function like(postId: number): Promise<void> {
  const isValidPost = await PostRepository.postIdExists(postId);
  if (!isValidPost) {
    const message = `Post id ${postId} does not exists!`;
    throw new CustomError(ErrorType.NOT_FOUND, message);
  }
  if (!postId) throw new CustomError(ErrorType.BAD_REQUEST, `you need to pass an id to like a post - id passed ${postId}`);
  await PostRepository.like(postId);
}

async function update(postId: number, newPost: Post): Promise<void> {
  const isValidPost = await PostRepository.postIdExists(postId);
  if (!isValidPost) {
    const message = `Post id ${postId} does not exists!`;
    throw new CustomError(ErrorType.NOT_FOUND, message);
  }
  if (!postId) throw new CustomError(ErrorType.BAD_REQUEST, `you need to pass an id to edit a post - id passed ${postId}`);
  newPost.createdAt = createDateFromDDMMYYYY(newPost.createdAt.toString());
  await PostRepository.edit(newPost, postId);
}

async function remove(postId: number): Promise<void> {
  const isValidPost = await PostRepository.postIdExists(postId);
  if (!isValidPost) {
    const message = `Post id ${postId} does not exists!`;
    throw new CustomError(ErrorType.NOT_FOUND, message);
  }
  if (!postId) {
    throw new CustomError(ErrorType.BAD_REQUEST, `you need to pass an id to remove a post - id passed ${postId}`);
  }
  await PostRepository.remove(postId);
}

const PostService = { getAll, create, like, remove, update };

export default PostService;