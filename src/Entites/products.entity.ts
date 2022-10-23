import { Column, Entity,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./categories.entity";
import { Users } from "./users.entity";

@Entity('products')
export class Products {
    @Column()
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    name:string;
    @Column()
    price:number;
    @Column()
    description:string;
    @ManyToOne(()=>Category,(category)=>category.products,{nullable:false})
    category:Category;
    @ManyToOne(()=>Users,(user)=>user.products,{nullable:false})
    seller:Users;
}