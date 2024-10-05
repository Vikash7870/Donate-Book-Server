import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    sNo: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    yearOfPublication: { type: String, required: true },
    isbn: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Linking book to the donating user
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

export default Book;
