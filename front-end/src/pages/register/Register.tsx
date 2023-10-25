// import type { RootState } from '../../redux/store'
import { AxiosError } from 'axios'
// import { signUp } from '../../redux/auth'
// import { useSelector, useDispatch} from 'react-redux'
import { postApi } from '../../api/endpoints'
import React,{ useState, useEffect } from 'react'

export default function Register() {
    const [registerUser, setRegisterUser] = useState({
        email:'',
        password: ''
    })
    const [errors,setErrors] = useState<string[]>([])
    const [msg,setMsg] = useState<string[]>([])
    // const auth = useSelector((state :RootState) => state.auth)
    // const dispatch = useDispatch()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterUser(
            {...registerUser,
                [ e.target.name ] :  e.target.value
            })
        }
        const hadleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            postApi.register(registerUser).then((data)=>{
                const dataRegister:{message:string[]} = data.data as {message:string[]}
                 if('message' in data.data ){
                    setMsg(dataRegister.message)
                    setRegisterUser({
                        ...registerUser,
                        email:'',
                        password:''
                    }
                    )
                }
             }).catch((err:AxiosError) =>{
                if(Array.isArray(err.response?.data)){
                    setErrors((err.response?.data) as string[])
                }
             })
    }
    useEffect(()=>{
        const timeoutRef = setTimeout(()=>{
            setErrors([])
            setMsg([])
        },2000)
        console.log('me ejecuto')
        return () => {
            clearTimeout(timeoutRef);
        }
    },[errors,msg])
  return (
    <div className=" bg-slate-400 h-[100vh] flex flex-col items-center justify-center">
        <h1 className=" text-xl font-semibold mb-2">Registrate</h1>
        {errors && errors.map((e)=><div className=' bg-red-600 p-1 text-white'><h2>{e}</h2></div>)}
        {msg && msg.map((e)=><div className=' bg-red-50 p-1 text-black'><h2>{e}</h2></div>)}
        <form onSubmit={hadleSubmit} className=" flex flex-col gap-2 bg-slate-600 p-4 rounded-lg w-72">
            <input onChange={handleInputChange} type="email" placeholder="Ingrese su email" value={registerUser.email} name='email'/>
            <input onChange={handleInputChange} type="password" placeholder="Ingrese su passowrd" value={registerUser.password} name='password'/>
            <button className=" font-bold border-slate-80 bg-lime-400 p-2">Registrate</button>
        </form>
    </div>
  )
}