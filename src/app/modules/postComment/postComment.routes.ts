import express from 'express';
import { PostCommentController } from './postComment.controller';

const router = express.Router();

router.post(
  '/create-blogPost-comment',
  PostCommentController.createPostComment
);

router.get('/:id', PostCommentController.getSingleBlogPostComments);

router.delete('/:id', PostCommentController.deletePostComment);

export const BlogPostCommentRoutes = router;
