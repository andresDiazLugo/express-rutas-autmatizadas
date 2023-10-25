import { DataUser } from '../type/user.type'
import { createQuery } from '../libs/query'
import bcrypt from 'bcryptjs'
import { createToken } from '../libs/jwt'
export async function serviceRegister(body:DataUser){
    const { email, password } = body
    try {
        const findUserRegister =  await createQuery(`SELECT * FROM user WHERE email = '${email}'`)
        console.log(findUserRegister)
        if(findUserRegister && Array.isArray(findUserRegister) && findUserRegister.length > 0){
            return{
                message:['The user its register']
            }
        }else{
            const passwordHashed = await bcrypt.hash(password,10)
            const createUser = await createQuery(`INSERT INTO user(email,password) VALUES('${email}','${passwordHashed}')`)
            return {
                message: ['the user register with success'],
                data: createUser
            }
        }
        
    } catch (error:any) {
        return error
    }
    
}
export async function serviceSignIn(body:DataUser){
    const { email, password } = body
    try {
        const userFound:DataUser[]= await createQuery(`SELECT * FROM user WHERE email = '${email}'`) as DataUser[]
       if(userFound && Array.isArray(userFound) && userFound.length === 0) return {
        message:['the user is not register']
       }
       const isMatch = await bcrypt.compare(password,userFound[0].password)
       if(!isMatch) return {
        message:['the email or password incorrect']
       }
       const token = userFound[0].id !== undefined && await createToken({id:userFound[0].id})
       return {
        token,
        data:userFound[0]
       }
    } catch (error:any) {
        return error
    }
}