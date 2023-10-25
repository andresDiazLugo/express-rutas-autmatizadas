import {  Routes,useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getApi } from '../api/endpoints'
import { setStateTokenNull } from '../redux/auth'
import { useDispatch } from 'react-redux'
interface Props{
    children: JSX.Element[] | JSX.Element; // ReactNode | Array<ReactElement>;
} 
export default function RoutesComprobationToken({children}:Props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
               getApi.verifyToken().then(data => {
                    navigate('/home')
               }).catch(err => {
                dispatch(setStateTokenNull())
            })
               console.log('me ejecuto')
    },[])
    return (
    <Routes>
        {children}
    </Routes>
  )
}