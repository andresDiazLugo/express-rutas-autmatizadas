import React,{ useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { signin } from '../../redux/auth'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../redux/store'
import { postApi } from '../../api/endpoints'
import { useNavigate } from "react-router-dom";
export default function SigIn() {
    const navigate = useNavigate()
    const { errors } = useSelector((state:RootState)=> state.auth)
    const dispatch = useDispatch()
    const [registerUser, setRegisterUser] = useState({
        email:'',
        password: ''
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterUser(
            {...registerUser,
                [ e.target.name ] :  e.target.value
            })
        }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        postApi.sigin(registerUser)
        .then(data =>{
            const dataSigin:{id:number,email:string,password:string} = data.data as {id:number,email:string,password:string}
            console.log('esta es la informacion',dataSigin)
            dispatch(signin(dataSigin))
            setRegisterUser({
                ...registerUser,
                email : '',
                password :''
            })
            navigate('/home')
    })
        .catch((err:AxiosError) =>{
            console.log('error',err)
            if(Array.isArray(err.response?.data) && typeof err.response?.data[0] === 'string')
                dispatch(signin(err.response?.data as string[]))
        })
    }
    useEffect(()=>{
        const timeoutRef = setTimeout(()=>{
            dispatch(signin([]))
            console.log('me ejecutooo')
        },2000)
        if(errors?.length === 0  ){
            clearTimeout(timeoutRef)
        }
        return () => {
            clearTimeout(timeoutRef);
        }
    },[errors])
  return (
    <div className=" bg-slate-400 h-[100vh] flex flex-col items-center justify-center">
    <h1 className=" text-xl font-semibold mb-2">Inicia Sesion</h1>
    {errors !== null  && errors?.map((e)=><div className=' bg-red-600 p-1 text-white'><h2>{e}</h2></div>)}
    <form onSubmit={handleSubmit} className=" flex flex-col gap-2 bg-slate-600 p-4 rounded-lg w-72">
        <input onChange={handleInputChange} type="email" placeholder="Ingrese su email" value={registerUser.email} name='email'/>
        <input onChange={handleInputChange} type="password" placeholder="Ingrese su passowrd" value={registerUser.password} name='password'/>
        <button className=" font-bold border-slate-80 bg-lime-400 p-2">Iniciar sesion</button>
    </form>
</div>
  )
}