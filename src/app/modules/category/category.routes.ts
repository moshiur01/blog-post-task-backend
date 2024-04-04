import express from 'express';
import { categoryController } from './category.controller';

const router = express.Router();

router.post('/create-category', categoryController.createCategory);

router.get('/', categoryController.getAllCategory);

export const CategoryRoutes = router;
