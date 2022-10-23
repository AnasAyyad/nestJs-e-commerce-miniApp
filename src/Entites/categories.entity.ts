import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity('category')
export class Category { 
    @Column()
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    categoryName:string;
    
    @OneToMany(()=>Products,(product)=>product.category)
    products:Products[];
   
    
}