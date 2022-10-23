import * as bcrypt from 'bcrypt'

export function hashingPassword(rawPassword:string){
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword,SALT)
}

export function comparePasswords(rawPassword:string , hashedPassword:string){
    return bcrypt.compareSync(rawPassword,hashedPassword)
}
