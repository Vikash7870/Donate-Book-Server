import express from 'express';
import { addBook, getBooks } from '../controllers/bookController.js';
import authMiddleware from  "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/donate', authMiddleware, addBook);

router.get('/', authMiddleware, getBooks);

export default router;
