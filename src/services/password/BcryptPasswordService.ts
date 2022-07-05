import { PasswordService } from './PasswordService';
import * as bcrypt from 'bcrypt';

export class BcryptPasswordService implements PasswordService {
    public async hash(password: string): Promise<string> {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }
    public async compare(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        const isMatched = await bcrypt.compare(plainTextPassword, hashedPassword);

        return isMatched;
    }
}
