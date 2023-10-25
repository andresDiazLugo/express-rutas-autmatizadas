import { Link } from 'react-router-dom'

export default function Navigations() {
  return (
    <nav className=' bg-slate-300 p-1 flex items-center justify-between sticky top-0'>
        <h1 className=' text-xl font-bold ml-5'>Gestion-Task</h1>
        <ul className='flex gap-4 mr-4 items-center font-semibold'>
            <Link to='/register'><li>Crear una cuenta</li></Link>
            <Link to='/login'><li>Iniciar sesion</li></Link>
        </ul>
    </nav>
  )
}