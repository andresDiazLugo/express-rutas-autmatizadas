/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios'
import { instance } from './base'

enum endpointPost{
    REGISTER_USER = 'user/register',
    SIGNIN_USER = 'user/sigin'
}

enum endpointGet{
    VERIFYTOKEN='user/verify/'
}

export const postApi = {
    register : function(body:{email:string,password:string}){
        return instance.post(endpointPost.REGISTER_USER,body)
    },
    sigin: function(body:{email:string,password:string}){
        return instance.post(endpointPost.SIGNIN_USER,body)
    }
} 
export const getApi = {
    verifyToken: function(){
        return instance.get(endpointGet.VERIFYTOKEN)
    }
}
// import { post } from '../url/urlApi'
// import { response } from 'express'
// import { unknown } from 'zod'
// export const registerUserApi = async(body:{email:string,password:string})=>{
//     try {
//         const response= await axios.post(post.createUser,body)
//         const data:{message:[string]} = response.data as {message:[string]}
//         console.log("estos son los datos",data)
//         return data
//     } catch (error: any) {
//         if('response' in error ){
//             console.log(error.response.data)
//             throw new Error(error.response.data)
//         }else if('message' in error){
//             throw new Error(error.message)
//         }
//     }
// }