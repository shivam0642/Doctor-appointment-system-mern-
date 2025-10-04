import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import { BrowserRouter, Routes, Route } from 'react-router'
import Navbar from './components/Layout/Navbar/Navbar'
import Footer from './components/Layout/Navbar/Footer/Footer'
import GalleryPage from './pages/Gallery/GalleryPage'
import Register from './pages/Auth/Register'
import {Toaster} from 'react-hot-toast'
import Login from './pages/Auth/Login'
import AllDoctors from './pages/Doctors/AllDoctors'
import Appointments from './pages/Doctors/Appointments'

function App() {
  

  return (
    <>
      <Navbar/>
      <Toaster />
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/gallery' element={<GalleryPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element = {<Login />} />
          <Route path='/doctors' element = {<AllDoctors />} />
          <Route path='/doctors/:id' element = {<Appointments />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
