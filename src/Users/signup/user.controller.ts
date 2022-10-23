import { Body, Controller, Inject,Post,  UsePipes, ValidationPipe } from '@nestjs/common';
import { createUserDto } from 'src/Dto/users.dto';
import {  UserService } from './user.service';

@Controller('signup')
export class UserController {
constructor(@Inject('USER_SERVICE') private userService:UserService){

}
    @Post('seller')
    @UsePipes(ValidationPipe)
    signupadmin(@Body() createUserDto:createUserDto){
      this.userService.checkPasswords(createUserDto.password,createUserDto.confirmPassword)
       return this.userService.signupSeller(createUserDto)
    }

    @Post('buyer')
    @UsePipes(ValidationPipe)
    signupbuyer(@Body() createUserDto:createUserDto){
      this.userService.checkPasswords(createUserDto.password,createUserDto.confirmPassword)
       return this.userService.signupBuyer(createUserDto)
    }

 
}
