import { User } from '../entities/User';
import { UserRepository } from '../repository/UserRepository';
import { JwtService } from './jwt/JwtService';
import { IncorrectUsernameError } from './IncorrectUsernameError';
import { PasswordService } from './password/PasswordService';
import { UserService } from './UserService';
import { UserInfo, UserPayload } from '../entities/types';
import { IncorrectPasswordError } from './password/IncorrectPasswordError';
import { UsernameExistsError } from './UsernameExistsError';

export class DefaultUserService implements UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordService: PasswordService,
        private readonly jwtService: JwtService,
        private readonly privateKey: string,
    ) {}

    public async login(username: string, password: string): Promise<string> {
        const user = await this.validateUsername(username);
        const payload = this.mapToUserPayload(user);
        const isMatch = await this.passwordService.compare(password, user.password);
        const token = this.getToken(isMatch, payload);
        return token;
    }
    private async validateUsername(username: string): Promise<User> {
        const user = await this.userRepository.getUserByUsername(username);
        if (user == null) {
            throw new IncorrectUsernameError();
        }
        return user;
    }
    private mapToUserPayload(user: User): UserPayload {
        const mappedUser: UserPayload = {
            id: user.id,
            username: user.username,
            role: user.role,
        };
        return mappedUser;
    }
    private getToken(matchedPasswords: boolean, payload: object): string {
        if (matchedPasswords) {
            const token = this.jwtService.sign(payload, this.privateKey);
            return token;
        } else {
            throw new IncorrectPasswordError();
        }
    }
    public async createAccount(user: User): Promise<void> {
        this.checkExistingUsername(user.username);
        const userInfo = this.mapToUserInfo(user);
        this.passwordService.hash(userInfo.password);
        await this.userRepository.addUser(userInfo);
    }
    private async checkExistingUsername(username: string): Promise<void> {
        const user = this.userRepository.getUserByUsername(username);
        if (user != null) {
            throw new UsernameExistsError();
        }
    }
    private mapToUserInfo(user: User): UserInfo {
        const mappedUser: UserInfo = {
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            username: user.username,
            password: user.password,
        };
        return mappedUser;
    }
}
