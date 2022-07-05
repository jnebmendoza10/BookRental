import { DataSource } from 'typeorm';
import { Role } from '../entities/Role';
import { TypeOrmUser } from '../entities/typeorm/TypeormUser';
import { User } from '../entities/User';
import { UserRepository } from './UserRepository';

export class SqlUserRepository implements UserRepository {
    constructor(private readonly dataSource: DataSource) {}

    public async getUserByUsername(username: string): Promise<User> {
        const result = (await this.dataSource.manager.findOne(TypeOrmUser, {
            where: {
                username: username,
            },
        })) as User;

        return result;
    }

    public async addUser(user: Omit<User, 'id'>): Promise<void> {
        await this.dataSource.manager.insert(TypeOrmUser, user);
    }
    public async editUser(role: Role, userId: string): Promise<void> {
        await this.dataSource.manager.update(TypeOrmUser, userId, { role: role });
    }
}
