import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductHistory } from "./productHistory.entity";
import { Products } from "./products.entity";

@Entity('users')
export class Users {
    @Column()
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    email:string;
    @Column()
    password:string;
    @Column()
    dateOfBirth:Date;
    @Column({length:1})
    gender:string;
    @Column()
    fullName:string;
    @Column()
    role:string;
    
    @OneToMany(()=>ProductHistory,(product)=>product.user,{nullable:true,cascade:true})
    productHistory:ProductHistory[];

    @OneToMany(()=>Products,(product)=>product.seller,{nullable:true,cascade:true})
    products:Products[];
}