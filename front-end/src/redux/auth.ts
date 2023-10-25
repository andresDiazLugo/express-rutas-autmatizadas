import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
export interface userAuth{
    isAutenticateCookie : string | null
    user: null | {id:number,email:string,password:string}
    errors?: string[] | null
}
const cookies = Cookies.get() as {token?:string}
const token = cookies.token ? cookies.token : null
const initialState:userAuth = {
    isAutenticateCookie: token,
    user: null,
    errors: undefined
}
export const userSlice = createSlice({
    name:'user-autenthicate',
    initialState,
    reducers:{
        signin: (state, action:PayloadAction<{id:number,email:string,password:string,error?:boolean} | string[]>) => {
            if( !Array.isArray(action.payload) ){
                state.user = action.payload
                state.isAutenticateCookie = Cookies.get().token
            }else{
                state.errors = action.payload 
            }
        },
        setStateTokenNull: (state)=>{
            state.isAutenticateCookie = null
        }
    }
})

export const { signin,setStateTokenNull } = userSlice.actions
export default userSlice.reducer