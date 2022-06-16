import { Book } from '../entities/Book';
import { BookRepository } from './BookRepository';
import { SqlDataSource } from '../database/dbConnection';
import { TypeOrmBook } from '../entities/typeorm/TypeormBook';

export class SqlBookRepository implements BookRepository {
    constructor(private readonly dataManager: typeof SqlDataSource) {}

    async getBooks(): Promise<Book[]> {
        const result = await this.dataManager.manager.find(TypeOrmBook);
        return result;
    }
    async addBook(book: Book): Promise<void> {
        await this.dataManager.manager.insert(TypeOrmBook, book);
    }
    async editBook(book: Book, bookId: string): Promise<void> {
        await this.dataManager.manager.update(TypeOrmBook, bookId, book);
    }
    async delete(bookId: string): Promise<void> {
        await this.dataManager.manager.delete(TypeOrmBook, bookId);
    }
}
