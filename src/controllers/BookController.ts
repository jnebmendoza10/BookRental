import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'joi';
import { BookInfo } from '../entities/types';
import Logger from '../lib/Logger';
import { BookService } from '../services/BookService';

export class BookController {
    constructor(
        private readonly bookService: BookService,
        private readonly logger: Logger,
        private readonly schema: AnySchema,
    ) {}

    createBookListing = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        this.logger.info(`Incoming ${request.method} request`);
        const book: BookInfo = {
            title: request.body.title,
            author: request.body.author,
            ISBN: request.body.ISBN,
            isAvailable: request.body.isAvailable,
        };
        const validatedBook = await this.schema.validateAsync(book);
        try {
            await this.bookService.createBookListing(validatedBook);
            response.status(201).send({ message: 'Book listing successfully created' });
        } catch (error) {
            this.logger.error('Failed to create the book listing', error);
            next(error);
        }
    };
    editBookListing = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        this.logger.info(`Incoming ${request.method} request`);

        const { bookId } = request.params;
        if (bookId == undefined) {
            response.status(400).send({ message: 'Id is required.' });
        }

        const book: BookInfo = {
            title: request.body.title,
            author: request.body.author,
            ISBN: request.body.ISBN,
            isAvailable: request.body.isAvailable,
        };

        const validatedBook = await this.schema.validateAsync(book);

        try {
            await this.bookService.editBookListing(validatedBook, bookId);
            response.status(201).send({ message: 'Successfully edited a book listing.' });
        } catch (error) {
            this.logger.error('Failed to edit the book listing', error);
            next(error);
        }
    };
    showAvailableBooks = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        this.logger.info(`Incoming ${request.method} request`);

        try {
            const books = await this.bookService.showAvailableBooks();
            response.status(200).send(books);
        } catch (error) {
            this.logger.error('Failed to fetch the available books', error);
            next(error);
        }
    };
    deleteBookListing = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        this.logger.info(`Incoming ${request.method} request`);

        const { bookId } = request.params;
        if (bookId == undefined) {
            response.status(400).send({ message: 'Id is required.' });
        }

        try {
            await this.bookService.deleteBookListing(bookId);
        } catch (error) {
            this.logger.error('Failed to delete the book listing', error);
            next(error);
        }
    };
}
