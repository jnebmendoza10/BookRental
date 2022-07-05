import { Book } from '../entities/Book';
import { BookRepository } from './BookRepository';
import { TypeOrmBook } from '../entities/typeorm/TypeormBook';
import { DataSource } from 'typeorm';
import { BookInfo } from '../entities/types';

export class SqlBookRepository implements BookRepository {
    constructor(private readonly dataSource: DataSource) {}

    public async getAvailableBooks(): Promise<Book[]> {
        const result = await this.dataSource.manager.find(TypeOrmBook, { where: { isAvailable: true } });
        return result;
    }
    public async getBookByTitle(bookTitle: string): Promise<Book> {
        const result = (await this.dataSource.manager.findOne(TypeOrmBook, {
            where: {
                title: bookTitle,
            },
        })) as Book;

        return result;
    }
    public async addBook(book: BookInfo): Promise<void> {
        await this.dataSource.manager.insert(TypeOrmBook, book);
    }
    public async editBook(book: BookInfo, bookId: string): Promise<void> {
        await this.dataSource.manager.update(TypeOrmBook, bookId, book);
    }
    public async delete(bookId: string): Promise<void> {
        await this.dataSource.manager.delete(TypeOrmBook, bookId);
    }
}
