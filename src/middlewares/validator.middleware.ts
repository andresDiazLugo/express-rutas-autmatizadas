import { Request, Response, NextFunction } from 'express'
import { ZodObject } from 'zod'
export const validateSchema = (schema:ZodObject<any>) => (req:Request,res:Response,next:NextFunction) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error:any) {
        console.log(error.errors)
        return res.status(400).json(error.errors.map((error:any) => error.message))
    }
}