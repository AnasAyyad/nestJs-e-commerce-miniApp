import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class boughtProductDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNumber()
    @IsNotEmpty()
    price:number;
}