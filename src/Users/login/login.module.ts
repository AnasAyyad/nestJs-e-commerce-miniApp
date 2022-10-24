import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/Entites/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { localStrategy } from 'src/Utilites/strategies/local.strategy';
import { UserService } from '../signup/user.service';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports:[TypeOrmModule.forFeature([Users]),PassportModule,JwtModule.register({
    secret:"ENV_VAR",
    signOptions:{expiresIn:"3600s"}
  })
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
