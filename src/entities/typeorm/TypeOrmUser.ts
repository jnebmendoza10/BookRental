import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from '../Role';
import { User } from '../User';
import { TypeOrmBook } from './TypeormBook';

@Entity()
export class TypeOrmUser implements User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar')
    firstName!: string;

    @Column('varchar')
    lastName!: string;

    @Column('varchar')
    username!: string;

    @Column('varchar')
    password!: string;

    @Column('varchar')
    role!: Role;

    @OneToMany(
        () => TypeOrmBook,
        book => book.user,
    )
    books!: TypeOrmBook[];
}
