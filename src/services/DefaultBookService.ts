import { Book } from '../entities/Book';
import { BookInfo } from '../entities/types';
import { BookRepository } from '../repository/BookRepository';
import { BookService } from './BookService';

export class DefaultBookService implements BookService {
    constructor(private readonly bookRepository: BookRepository) {}

    public async createBookListing(book: BookInfo): Promise<void> {
        this.bookRepository.addBook(book);
    }
    public async editBookListing(book: BookInfo, bookId: string): Promise<void> {
        await this.bookRepository.editBook(book, bookId);
    }
    public async showAvailableBooks(): Promise<Book[]> {
        const books = await this.bookRepository.getAvailableBooks();
        return books;
    }
    public async deleteBookListing(bookId: string): Promise<void> {
        await this.bookRepository.delete(bookId);
    }
}
