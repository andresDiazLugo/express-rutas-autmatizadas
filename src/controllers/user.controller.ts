import  { Request, Response } from 'express'
import { serviceRegister, serviceSignIn } from '../services/user.service'
import { handleHttp } from '../utils/error.handle'
import jwt,{ VerifyErrors }  from 'jsonwebtoken'
import { createQuery } from '../libs/query'
import { DataUser } from '../type/user.type'


export async function register(req:Request,res:Response){
    
    try {
        const response = await serviceRegister(req.body)
        res.json(response)
    } catch (error: any) {
        if('message' in error){
            handleHttp(res,error.message as string)
        }else{
            handleHttp(res,'it happened when trying to register your data')
        }
    }
}
export async function sigIn(req:Request, res:Response){
    
try {
    const response:Promise<{message:string} | {token:string,data:{id?:number,email:string,password:string}}> = await serviceSignIn(req.body)
    if ('token' in response && 'data' in response){
        // console.log('este es el token',response.token)
        res.cookie('token',response.token)
        res.json(response.data)
        return
    }
    res.json(response)
} catch (error:any) {
    if('message' in error){
        handleHttp(res,error.message as string)
    }else{
        handleHttp(res,'it happened when trying to register your data')
    }
}
}
interface User {
    id: number | string
}

export async function verifyToken(req:Request, res:Response){
    const token = req.cookies
    console.log('este es el token',token)

    if(!token.token) return res.status(401).json({message: 'Unauthorized'})
    try {
        const decodedToken = await jwt.verify(token.token, 'clave')
        const { id } = decodedToken as User 
        const userFound:DataUser[] = await createQuery(`SELECT * FROM user WHERE id = ${id};`) as DataUser[]
        if(!userFound) return res.status(401).json({
            message:'Unauthorized'
        })
        return res.json({
            user:userFound[0] 
        })
    } catch (err:VerifyErrors | any) {
       console.log('entrandooo')
       res.status(500).json({message: 'Unauthorized'})
    }
}