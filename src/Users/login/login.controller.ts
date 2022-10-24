import {  Controller, Inject, Post, Request, UseGuards } from '@nestjs/common';
import { LoginService } from './login.service';
import { LocalAuth } from '../guards/user-auth.guard';


@Controller()
export class LoginController {

    constructor(@Inject('LOGIN_SERVICE') private readonly loginService:LoginService){}

    // login 

    @UseGuards(LocalAuth)
    @Post('login')
     async loginUser(@Request() req ){
        
            return this.loginService.login(req.user)
    }
    

    

   
}
