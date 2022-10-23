import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class SessionSerializer extends PassportSerializer{
    serializeUser(user: any, done: Function) {
        done(null,{id:user.id,role:user.role})
    }
    deserializeUser(payload: any, done: Function) {
        done(null,payload)
    }
}