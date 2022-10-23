import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class addProductDto{
   @IsString()
   @IsNotEmpty()
    name:string;

    @IsNumber()
    @IsNotEmpty()
    price:number;

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsString()
    @IsNotEmpty()
    categoryName:string;
}