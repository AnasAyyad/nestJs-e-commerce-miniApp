import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/Utilites/bcrypt/bcrypt';
import { UserService } from '../signup/user.service';

@Injectable()
export class LoginService {
    constructor(@Inject("USER_SERVICE" ) private readonly userService:UserService,
    private jwtService:JwtService
    ){}

    async validateUser(email:string,password:string){
        const userDB=await this.userService.findUserByEmail(email)
        
    if(userDB){
        const matching = comparePasswords(password,userDB.password)
            if(matching){
        const {password,...user}=userDB
        return user;
    }
}
    return null;
    }
    
   async login(user:any){
        const payload={sub:user.id,role:user.role}
        return {
            access_token:this.jwtService.sign(payload)
        }
    }
}