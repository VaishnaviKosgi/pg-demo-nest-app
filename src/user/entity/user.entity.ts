import { Column, PrimaryGeneratedColumn } from "typeorm";
import {Role} from '../enums/role.enum'

export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;


    @Column({unique:true})
    email: string;

    @Column()
    mobile:string;

    @Column({
        type: 'enum',
        enum:Role ,
    
    })
    role:Role;

    @Column()
    access:string[];
}