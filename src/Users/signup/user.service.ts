import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/Entites/users.entity';
import { hashingPassword } from 'src/Utilites/bcrypt/bcrypt';
import { Role } from 'src/Utilites/types/role.enum';
import { createUserParam } from 'src/Utilites/types/types';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(Users) private readonly usersRepository:Repository<Users>){

    }


    // password confirmation 
    checkPasswords(pass:string, confirmpass:string){
        if (pass!==confirmpass)
         throw new HttpException('Password doesnt match ',HttpStatus.BAD_REQUEST)
    

 }


    //creating new User:
    private async signUpUser(userDetails:createUserParam, role:Role){
        const duplicatedEmail= await this.usersRepository.findOne({where:{email:userDetails.email}})
        
        if (duplicatedEmail){
            throw new HttpException("Email already exists",HttpStatus.BAD_REQUEST)
        }
        const password=hashingPassword(userDetails.password)
        const newUser= this.usersRepository.create({...userDetails,password,role:role})
        return this.usersRepository.save(newUser)
    }


    async signupSeller(userDetails:createUserParam){
       return this.signUpUser(userDetails,Role.SELLER)
    }
    
    
    
    async signupBuyer(userDetails:createUserParam){
        return this.signUpUser(userDetails,Role.BUYER)

    }

   async findUserByEmail(email:string ){

    return this.usersRepository.findOne({where:{email:email}})
    
   }


   findUserById(id:number){
    return this.usersRepository.findOneBy({id})
   }

   

}
