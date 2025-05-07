import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false)

  return (
    <div className='flex items-center justify-between px-8 md:px-16 lg:px-24 py-2 shadow relative'>
      <div className="logo cursor-pointer">
        <img src={assets.Logo} alt="Logo" className='w-30 ' />
      </div>
      <ul className="nav-list md:flex items-center gap-8 hidden">
        <li className='text-gray-700 font-semibold cursor-pointer hover:text-blue-900'>Home</li>
        <li className='text-gray-700 font-semibold cursor-pointer hover:text-blue-900'>Products</li>
        <li className='text-gray-700 font-semibold cursor-pointer hover:text-blue-900'>Contact</li>
      </ul>
      <button className='hidden md:block px-4 py-1 text-sm rounded-full bg-blue-900 text-white cursor-pointer hover:bg-blue-900/90'>Login</button>

      <div className="mobile-button block md:hidden">
        <img src={assets.menu} alt="Menu Icon" className='w-8' onClick={()=> setShowMenu(true)} />
      </div>
      <div className={`mobile-menu w-1/2 h-screen bg-white absolute top-0 flex flex-col items-center justify-center gap-4 md:hidden ${showMenu?'right-0': 'right-[-100%]'} transition-all duration-500`}>
        <img src={assets.close} alt="close icon" className='w-5 absolute top-5 right-5' onClick={()=> setShowMenu(false)} />     
        <ul className="nav-list flex flex-col items-center gap-4 mt-4">
          <li className='text-gray-700 font-semibold cursor-pointer hover:text-blue-900'>Home</li>
          <li className='text-gray-700 font-semibold cursor-pointer hover:text-blue-900'>Products</li>
          <li className='text-gray-700 font-semibold cursor-pointer hover:text-blue-900'>Contact</li>
        </ul>
        <button className='px-4 py-1 text-sm rounded-full bg-blue-900 text-white cursor-pointer hover:bg-blue-900/90'>Login</button>
      </div>
    </div>
  )
}

export default Navbar
