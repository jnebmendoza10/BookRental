export class IncorrectUsernameError extends Error {
    private static readonly message = 'The username entered is incorrect.';

    constructor() {
        super(IncorrectUsernameError.message);
        this.stack = new Error().stack;
    }
}
