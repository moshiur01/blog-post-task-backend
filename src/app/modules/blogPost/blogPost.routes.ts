import express from 'express';
import { BlogPostController } from './blogPost.controller';

const router = express.Router();

router.post('/create-blogPost', BlogPostController.createBlogPost);

router.get('/', BlogPostController.getAllBlogPost);
router.get('/:id', BlogPostController.getSingleBlogPost);
router.patch('/:id', BlogPostController.updateBlogPost);
router.delete('/:id', BlogPostController.deleteBlogPost);

export const BlogPostRoutes = router;
