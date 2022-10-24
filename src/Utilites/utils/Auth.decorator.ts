import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtAuth } from "src/Users/guards/jwtAuth.guard";
import { RoleGuard } from "src/Users/guards/roles.guard";
import { Role } from 'src/Utilites/utils/role.enum';
import { Roles } from 'src/Utilites/utils/roles.decorator';


export function Auth(role:Role){
    return applyDecorators(
        Roles(role),
        UseGuards(JwtAuth,RoleGuard),
    )
}
