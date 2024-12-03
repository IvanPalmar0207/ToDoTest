//React-router-dom
import {BrowserRouter, Route, Routes} from 'react-router-dom'
//Pages
import MainLogin from './pages/main'
import RegisterForm from './pages/register'
import ManageTask from './pages/login/ManageTask'
import FormTask from './pages/login/FormTask'
//Components
import NavBar from './components/navbar'
import Footer from './components/footer'
//Providers
import { UserProvider } from './context/userContext'
import { TaskProvider } from './context/taskContext'
//Middleware
import ProtectedRoutes from './ProtectedRoutes'
//General Styles
import './app.css'

function App() {

  return (
    <UserProvider>
      <TaskProvider>        
        <BrowserRouter>
          <NavBar />
          <Routes>          
            
            <Route path='/' element={<MainLogin />}/>
            <Route path='/registerUser' element={<RegisterForm />}/>          

            <Route element ={<ProtectedRoutes />}>

              <Route path='/manageTasks' element = {<ManageTask />}/>
              <Route path='/addTask' element = {<FormTask />}/>
              <Route path='/updateTask/:id' element = {<FormTask />}/>          

            </Route>

          </Routes>
          <Footer />
        </BrowserRouter>        
      </TaskProvider>
    </UserProvider>
  )
}

export default App
