import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Book } from '../Book';
import { TypeOrmUser } from './TypeormUser';

@Entity()
export class TypeOrmBook implements Book {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar')
    title!: string;

    @Column('varchar')
    author!: string;

    @Column('varchar')
    ISBN!: string;

    @ManyToOne(
        () => TypeOrmUser,
        user => user.books,
    )
    user!: TypeOrmUser;
}
