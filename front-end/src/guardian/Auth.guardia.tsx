import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { Navigate, Outlet } from 'react-router-dom'
export default function Authguardia() {
    const userState = useSelector((store:RootState) => store.auth)
  return userState.isAutenticateCookie ? <Outlet/> : <Navigate replace to= '/login'/>
}