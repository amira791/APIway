import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import useAuth from '../../hooks/useAuth'

export default function Navbar() {

  function LightMode() {
    window.switchTheme();
  }

  const menuItems = [
    { name: "Home", url: "/", active: true },
    { name: "Explore", url: "/searchApi" },
    { name: "FAQ", url: "/tickets" },
    { name: "Contact", url: "/signup" }
  ];

  const { authState } = useAuthContext();
  const { logOut } = useAuth();
  console.log(authState.isAuth)

  return (
    <>
     <div>
      <header className="header absolute">
        <div className="tf-container">
          <div className="row">
            <div className="col-md-12">
              <div id="site-header-inner">
                <div id="site-logo" className="clearfix">
                  <div id="site-logo-inner">
                    <a href="index-2.html" rel="home" className="main-logo">
                      <img id="logo_header" style={{ paddingTop: "5%", translate: "-10%", width: "60%" }} src="assets/images/logo/MAPI_logo_White.png" alt="Image" />
                    </a>
                  </div>
                </div>

                <div className="header-center">
                  <nav id="main-nav" className="main-nav">
                    <ul id="menu-primary-menu" className="menu">
                      {menuItems.map((item, index) => (
                        <li key={index} className={`menu-item ${item.active ? 'current-menu-item' : ''}`}>
                          <a href={item.url}>{item.name}</a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                <div className="header-right">
                  {authState.isConsommateur ? (
                    <>
                      <button onClick={logOut} className="tf-button">
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="tf-button">
                        Login
                      </Link>
                      <Link to="/signup" className="tf-button">
                        Signup
                      </Link>
                    </>
                  )}
                  {/* to test and ommit if not nedded */}
                  <a href="#" onClick={LightMode} className="mode-switch">
                    <img id="img-mode" src="/assets/images/icon/moon.png" alt="Image"></img>
                  </a>
                </div>

                <div className="mobile-button"><span></span></div>
              </div>
            </div>
          </div>
        </div>
      </header>
      </div>
    </>
  )
}











