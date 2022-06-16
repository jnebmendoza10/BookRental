import { Role } from './Role';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: Role;
}
