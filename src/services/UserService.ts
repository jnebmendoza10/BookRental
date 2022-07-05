import { UserInfo } from '../entities/types';

export interface UserService {
    createAccount(user: UserInfo): Promise<void>;
    login(username: string, password: string): Promise<string>;
}
