export class UsernameExistsError extends Error {
    private static readonly message = 'The username already exists';

    constructor() {
        super(UsernameExistsError.message);
        this.stack = new Error().stack;
    }
}
