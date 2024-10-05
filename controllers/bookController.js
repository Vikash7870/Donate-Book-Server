import Book from '../models/Book.js';

// Add a book
export const addBook = async (req, res) => {
    const { sNo, title, author, genre, yearOfPublication, isbn } = req.body;

    try {
        // Ensure all fields are present
        if (!sNo || !title || !author || !genre || !yearOfPublication || !isbn) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new book
        const newBook = await Book.create({
            sNo,
            title,
            author,
            genre,
            yearOfPublication,
            isbn,
            user: req.userId // Make sure you are linking to the user
        });

        res.status(201).json(newBook);
    } catch (error) {
        console.error("Error adding book:", error.message); // Log the error for debugging
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get all books
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error("Error fetching books:", error.message); // Log the error for debugging
        res.status(500).json({ message: 'Something went wrong' });
    }
};
