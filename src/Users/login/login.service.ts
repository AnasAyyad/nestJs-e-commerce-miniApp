import { Inject, Injectable } from '@nestjs/common';
import { comparePasswords } from 'src/Utilites/bcrypt/bcrypt';
import { UserService } from '../signup/user.service';

@Injectable()
export class LoginService {
    constructor(@Inject("USER_SERVICE" ) private readonly userService:UserService,
    
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
    
}