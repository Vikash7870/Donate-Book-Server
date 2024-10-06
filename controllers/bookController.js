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
            user: req.userId // Link to the user
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

// Delete a book by ID
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error("Error deleting book:", error.message); // Log the error for debugging
        res.status(500).json({ message: 'Failed to delete book' });
    }
};

// Update a book by ID
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        console.error("Error updating book:", error.message); // Log the error for debugging
        res.status(500).json({ message: 'Failed to update book' });
    }
};
