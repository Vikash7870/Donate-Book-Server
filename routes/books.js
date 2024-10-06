import express from 'express';
import { addBook, getBooks, updateBook, deleteBook } from '../controllers/bookController.js';
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to donate a book
router.post('/donate', authMiddleware, addBook);

// Route to get all books
router.get('/', authMiddleware, getBooks);

// Route to update a book by ID
router.put('/:id', authMiddleware, updateBook); // Ensure authMiddleware is included

// Route to delete a book by ID
router.delete('/:id', authMiddleware, deleteBook); // Ensure authMiddleware is included

export default router;
