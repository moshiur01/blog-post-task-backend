import express from 'express';

import { UserRoutes } from '../modules/Users/user.routes';
import { BlogPostRoutes } from '../modules/blogPost/blogPost.routes';
import { CategoryRoutes } from '../modules/category/category.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/blogPosts',
    route: BlogPostRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
