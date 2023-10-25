import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import Register from './pages/register/Register'
import Navigations from './componets/Navigations'
import SigIn from './pages/sigIn/SigIn'
import RoutesComprobationToken from './utils/RoutesComprobationToken'
import Authguardia from './guardian/Auth.guardia'
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Navigations/>
      <RoutesComprobationToken>
        <Route path='/' element={<div>Landing</div>}/>
        <Route path='/login' element={<SigIn/>}/>
        <Route path='/register' element={<Register/>}/>
{/* -------------------------proteger las siguientes rutas------------------ */}
        <Route element={<Authguardia/>}>
          <Route path='/Home' element={<div>Home</div>}/>
          <Route path='/create-task' element={<div>create-task</div>}/>
          <Route path='/task/:id' element={<div>detail task</div>}/>
        </Route>
      </RoutesComprobationToken>
    </BrowserRouter>
    </Provider>
  )
}

export default App
