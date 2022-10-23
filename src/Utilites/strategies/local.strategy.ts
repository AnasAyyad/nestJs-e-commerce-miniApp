import {  Inject, Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"
import { LoginService } from "src/Users/login/login.service"

@Injectable()
export class localStrategy extends PassportStrategy(Strategy){

constructor(@Inject('LOGIN_SERVICE') private readonly loginService: LoginService){
    super({
        usernameField:'email'
    })
}

async validate(email:string,password:string){

   const user =await this.loginService.validateUser(email,password);
   if (!user){
    throw new UnauthorizedException()

    
   }
   return user;
}
}