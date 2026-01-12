import React from 'react'
import Topbar from './Topbar'
import NavMenu from './NavMenu'
import { NavLink } from 'react-router'
import Logo from '../../../assets/images/logo.jpg'

const Navbar = () => {
  return (
    <>
        <div className='navbar-container sticky-top'>
           <div className='row'>
              <div className='col-md-2'>
                <NavLink to='/' className='nav-logo'>
                    <img src = {Logo} alt='logo' className='brand-logo'/>
                </NavLink>
              </div>
              <div className='col-md-10'>
               {/* This 9 cloumn is further divided into 2 rows
                 1st row - Topbar
                 2nd row - NavMenu */}
              <div className='row'>
                 <div>
                    <Topbar />
                 </div>
                 <div>
                    <NavMenu />
                 </div>
              </div>
           </div> 
        </div>
      </div>
    </>
  )
}

export default Navbar