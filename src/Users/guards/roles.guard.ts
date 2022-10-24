import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/Utilites/utils/role.enum";
import { UserService } from "../signup/user.service";

@Injectable()
export class RoleGuard implements CanActivate{

    constructor(private reflector:Reflector,@Inject("USER_SERVICE") private userService:UserService){}

    async canActivate(context: ExecutionContext) {
        const requiredRole=this.reflector.getAllAndOverride<Role>('role',[context.getHandler(),context.getClass()])
        const {user} =context.switchToHttp().getRequest();
        if(!requiredRole){
            return true
        }

      
           

            
            
            return requiredRole===user.role
        
    }
} 