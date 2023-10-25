import { Request,Response,NextFunction } from 'express'
import jwt, {VerifyErrors, VerifyOptions, verify} from 'jsonwebtoken'

const tokenSecret = 'clave'

interface User {
    id: number | string
}

declare module 'express-serve-static-core' {
    interface Request{
        user?: number | string
    }
}

export const authRquired = (req:Request,res:Response,next:NextFunction) => {
    const { token } = req.cookies
    console.log(token)
    //necesitamos una libreria para poder leer las cookies
    try {
        const decodedToken = jwt.verify(token, tokenSecret)
        const { id } = decodedToken as User 
        req.user = id
        return next();
    } catch (err:VerifyErrors | any) {
       res.json({message: 'Invalid Token'})
    }
}