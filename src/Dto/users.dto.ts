import {  IsDateString, IsEmail,IsNotEmpty, IsString } from "class-validator";

export class createUserDto{

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsNotEmpty()
    confirmPassword:string;

    @IsNotEmpty()
    @IsDateString()
    dateOfBirth:Date;

    @IsString()
    @IsNotEmpty()
    gender:string;

    @IsString()
    @IsNotEmpty()
    fullName:string;





}