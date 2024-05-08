import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {useAuthContext} from '../../../context/authContext';
import useAuth from '../../../hooks/useAuth'

export default function Navbar() {

    function LightMode() {
        window.switchTheme(); 
    }

   

    const { authState } = useAuthContext();
    const {logOut} = useAuth();

  return (
    <>
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

     

                <div className="header-right">
                
                      <button onClick={logOut} className="tf-button">
                        Logout
                      </button>
            
                  
                  <a href="#" onClick={LightMode} className="mode-switch">
                    <img id="img-mode" src="assets/images/icon/moon.png" alt="Image" />
                  </a>
                </div>

                <div className="mobile-button"><span></span></div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}











