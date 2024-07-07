import { isAuthenticated } from "../../middlewares/auth.middleware";
import postsController from "../../controllers/posts/posts.controller";
import { Router } from "express";
import getFileUploader from "../../utils/storage";
import { createPostSchema, updatePostSchema } from "./posts.validation";
import { validatorMiddleware } from "../../middlewares/validator.middleware";

export default (app: Router) => {
  // get all posts
  const upload = getFileUploader('local');
  app.get(
    '/',
    isAuthenticated(),
    postsController.getAllPosts
  )
  // create post
  app.post(
    '/',
    isAuthenticated('post:create'),
    upload.single('file'),
    validatorMiddleware(createPostSchema),
    postsController.createPost
  )
  // update post
  app.patch(
    '/update/:id',
    isAuthenticated('post:update'),
    validatorMiddleware(updatePostSchema),
    postsController.updatePost
  )
  // delete post
  app.delete(
    '/delete/:id',
    isAuthenticated('post:delete'),
    postsController.deletePost
  )
  return app;
}