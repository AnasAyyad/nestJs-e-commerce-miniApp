import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity()
export class ProductHistory{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    price:number;
    
    @Column()
    dateOfPurchase:Date

    @ManyToOne(()=>Users,(user)=>user.productHistory)
    user:Users
}