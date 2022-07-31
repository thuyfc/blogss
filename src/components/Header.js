import React, { useState } from 'react'
import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
import "./header.css"
const Header = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;
  const [isMobile, setIsMonile] = useState(false)
  return (
    <nav className="bg-slate-200  flow-root ">
      <div className='hidden menu'>
      <button
          className="text-3xl text-center items"
          type="button"
          onClick={() => setIsMonile(!isMobile)}
        >
          {isMobile ? <FaIcons.FaRegWindowClose /> : <FaIcons.FaBars />}
      
      
        </button></div>
      <div className={isMobile ? "nav-mobile" : "nav-links"}  class="flex-rp"
        onClick={() => setIsMonile(false)}>

        <div className="w-2/4 rl-full "
        >
          <div className='h-full nav-bar '>
            <ul className=" flex justify-center rl-block h-full items-center ">
              <Link to="/">
                <li
                  className={`p-3 hover-rp  hover:bg-amber-400 rounded-md ${active === "home" ? "active" : ""}`}
                  onClick={() => setActive("home")}>
                  Home
                </li>
              </Link>
              <Link to="/create" >
                <li
                  className={`p-3 hover:bg-amber-400 rounded-md ${active === "create" ? "active" : ""
                    }`}
                  onClick={() => setActive("create")}
                >
                  Create
                </li>
              </Link>

              <Link to="/about" style={{ textDecoration: "none" }}>
                <li
                  className={` p-3 hover:bg-amber-400 rounded-md  ${active === "about" ? "active" : ""
                    }`}
                  onClick={() => setActive("about")}
                >
                  About
                </li>
              </Link>
            </ul>
          </div>


        </div>
        <div className="w-2/4 rl-full login-rp" >

          <ul className=' p-4 float-right rp-block mr-6 flex ' >

            {userId ? (
              <>
               <div className='rp-block flex'>
               <div className='flex '>
                  <div className="bg-orange-300 w-8 h-8 p-1 rounded-full" >

                  </div>
                  <p className='ml-2 mr-5 p-1'>
                    {user?.displayName}
                  </p>
                </div>
                <li className="hover:bg-amber-400 ml-2 p-1 rounded-md" onClick={handleLogout}>
                  Logout
                </li>
               </div>
              </>
            ) : (
              <Link to="/auth" style={{ textDecoration: "none" }}>
                <li
                  className={`hover:bg-amber-400 ml-2 p-1 rounded-md ${active === "login" ? "active" : ""}`}
                  onClick={() => setActive("login")}
                >
                  Login
                </li>
              </Link>
            )}


          </ul>

        </div>
      </div>
    </nav>
  )
}

export default Header