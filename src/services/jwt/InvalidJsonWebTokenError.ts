export class InvalidJsonWebTokenError extends Error {
    private static readonly message = 'Invalid token signature.';

    constructor() {
        super(InvalidJsonWebTokenError.message);
        this.stack = new Error().stack;
    }
}
