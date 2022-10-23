import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/Utilites/types/role.enum";
import { UserService } from "../signup/user.service";

@Injectable()
export class RoleGuard implements CanActivate{

    constructor(private reflector:Reflector,@Inject("USER_SERVICE") private userService:UserService){}

    async canActivate(context: ExecutionContext) {
        const requiredRole=this.reflector.getAllAndOverride<Role>('role',[context.getHandler(),context.getClass()])
        const request =context.switchToHttp().getRequest();
        if(!requiredRole){
            return true
        }

        if(request?.user){
           

            const {id}=request.user
           
            const user= await this.userService.findUserById(id)
            
            return requiredRole===user.role
        }
        
    
       
        return false;
    }
} 