import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/Entites/users.entity';
import { localStrategy } from 'src/Utilites/strategies/local.strategy';
import { UserService } from '../signup/user.service';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports:[TypeOrmModule.forFeature([Users]),PassportModule,
],
  controllers: [LoginController],
  providers: [{
    provide:'LOGIN_SERVICE', 
    useClass: LoginService
  },
  {
    provide:'USER_SERVICE',
    useClass:UserService
  },
  localStrategy
]
})
export class LoginModule {}
