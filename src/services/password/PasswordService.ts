export interface PasswordService {
    hash(password: string): Promise<string>;
    compare(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
