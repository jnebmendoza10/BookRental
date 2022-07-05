import { Role } from '../entities/Role';
import { UserInfo } from '../entities/types';
import { User } from '../entities/User';

export interface UserRepository {
    addUser(user: UserInfo): Promise<void>;
    getUserByUsername(username: string): Promise<User>;
    editUser(role: Role, userId: string): Promise<void>;
}
