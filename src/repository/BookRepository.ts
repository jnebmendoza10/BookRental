import { Book } from '../entities/Book';

export interface BookRepository {
    getBooks(): Promise<Book[]>;
    addBook(book: Book): Promise<void>;
    editBook(book: Book, bookIdd: string): Promise<void>;
    delete(bookId: string): Promise<void>;
}
