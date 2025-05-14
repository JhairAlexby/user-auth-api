import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    firstName: string; 

    @Column('text')
    lastName: string;

    @Column('text')
    paternalLastName: string; 

    @Column('text')
    maternalLastName: string; 

    @Column('text', { unique: true })
    email: string;
    
    @Column('text')
    password: string;

    @Column('bool')
    isActive: boolean;

    @Column('text', { array: true, default: ['user'] })
    roles: string[]; 
}
