export class IncorrectPasswordError extends Error {
    private static readonly message = 'The password you entered is incorrect.';

    constructor() {
        super(IncorrectPasswordError.message);
        this.stack = new Error().stack;
    }
}
