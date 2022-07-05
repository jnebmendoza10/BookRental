import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/UserService';
import Logger from '../lib/Logger';
import { AnySchema } from 'joi';
import { UserInfo } from '../entities/types';

export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly logger: Logger,
        private readonly schema: AnySchema,
    ) {}

    createAccount = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        this.logger.info(`Incoming ${request.method} request`);
        const user: UserInfo = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            role: request.body.role,
            username: request.body.username,
            password: request.body.password,
        };
        const validatedUser = await this.schema.validateAsync(user);
        try {
            await this.userService.createAccount(validatedUser);
            response.status(201).json({ message: 'Account successfully created.' });
        } catch (error) {
            this.logger.error('Account registration failed.', error);
            next(error);
        }
    };
    login = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        this.logger.info(`Incoming ${request.method} request`);
        const { username, password } = request.body;
        try {
            const token = await this.userService.login(username, password);
            response.status(200).send(token);
        } catch (error) {
            this.logger.error('Login failed.', error);
            next(error);
        }
    };
}
