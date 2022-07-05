import { Book } from './Book';
import { User } from './User';

export type UserInfo = Omit<User, 'id'>;
export type UserPayload = Omit<User, 'firstName' | 'lastName' | 'password'>;

export type BookInfo = Omit<Book, 'id'>;
