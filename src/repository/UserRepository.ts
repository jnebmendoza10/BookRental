import { Role } from '../entities/Role';
import { User } from '../entities/User';

export interface UserRepository {
    addUser(user: User): Promise<void>;
    editUser(role: Role, userId: string): Promise<void>;
}
