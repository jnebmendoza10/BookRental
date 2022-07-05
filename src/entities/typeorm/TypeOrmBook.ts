import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TypeOrmUser } from './TypeormUser';

@Entity()
export class TypeOrmBook {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar')
    title!: string;

    @Column('varchar')
    author!: string;

    @Column('varchar')
    ISBN!: string;

    @Column('boolean')
    isAvailable: boolean;

    @ManyToOne(
        () => TypeOrmUser,
        user => user.books,
    )
    user!: TypeOrmUser;
}
