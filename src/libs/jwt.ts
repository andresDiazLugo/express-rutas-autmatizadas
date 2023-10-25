//aca yo voy a crear una palbra clave cualquiera, lo recomedable es que lo guardes en el local storage
import jwt from 'jsonwebtoken'

export function createToken(payload:{id:number}){
    return new Promise((resolve,reject) =>{
        jwt.sign(
            payload,
            'clave',
            {
                expiresIn:'1D' // 1 hora de validez del Token
            },
            (err, token) =>{
                if(err) reject(err)
                resolve(token)
            }
        )
    })
}