import { NextFunction, Request, Response } from 'express';
import { IncorrectUsernameError } from '../services/IncorrectUsernameError';
import { InvalidJsonWebTokenError } from '../services/jwt/InvalidJsonWebTokenError';
import { IncorrectPasswordError } from '../services/password/IncorrectPasswordError';
import { UsernameExistsError } from '../services/UsernameExistsError';

export const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction): void => {
    if (error instanceof IncorrectUsernameError || error instanceof IncorrectPasswordError) {
        response.status(403).json({
            title: 'Forbidden',
            message: 'Invalid username or password',
        });
    } else if (error instanceof InvalidJsonWebTokenError) {
        response.status(401).json({
            title: 'Unauthorized',
            message: 'You are not allowed to access this resource.',
        });
    } else if (error instanceof UsernameExistsError) {
        response.status(409).json({
            title: 'Conflict',
            message: 'The resource already exists.',
        });
    } else {
        response.status(500).json({
            title: 'Internal Server error',
            message: 'Server encountered an unexpected .',
        });
    }
};
