import { SqlDataSource } from '../database/dbConnection';
import { Role } from '../entities/Role';
import { TypeOrmUser } from '../entities/typeorm/TypeormUser';
import { User } from '../entities/User';
import { UserRepository } from './UserRepository';

export class SqlUserRepository implements UserRepository {
    constructor(private readonly dataManager: typeof SqlDataSource) {}

    async addUser(user: User): Promise<void> {
        await this.dataManager.manager.insert(TypeOrmUser, user);
    }
    async editUser(role: Role, userId: string): Promise<void> {
        await this.dataManager.manager.update(TypeOrmUser, userId, { role: role });
    }
}
