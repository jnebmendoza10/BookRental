import { Book } from '../entities/Book';
import { BookInfo } from '../entities/types';

export interface BookService {
    createBookListing(book: BookInfo): Promise<void>;
    editBookListing(book: BookInfo, bookId: string): Promise<void>;
    showAvailableBooks(): Promise<Book[]>;
    deleteBookListing(bookId: string): Promise<void>;
}
