import { Book } from '../entities/Book';
import { BookInfo } from '../entities/types';

export interface BookRepository {
    getAvailableBooks(): Promise<Book[]>;
    getBookByTitle(bookTitle: string): Promise<Book>;
    addBook(book: BookInfo): Promise<void>;
    editBook(book: BookInfo, bookIdd: string): Promise<void>;
    delete(bookId: string): Promise<void>;
}
