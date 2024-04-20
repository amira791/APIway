import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../global_components/navbar';
import Footer from '../global_components/footer';
class LoginPage extends Component {


    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'

        return (
            <body className="body header-fixed">

              
                <div className="preload preload-container">
                    <div className="preload-logo"></div>
                </div>
                

                <div id="wrapper" className="wrapper-style">
                    <div id="page" className="clearfix">
                        <Navbar />

                        <section className="tf-page-title style-2">    
                            <div className="tf-container">
                                <div className="row">
                                    <div className="col-md-12">

                                        <ul className="breadcrumbs">
                                            <li><a href="blog2.html">Home</a></li>
                                            <li>Login</li>
                                        </ul>
                            
                                    </div>
                                </div>
                            </div>                    
                        </section>
                            
                        <section className="tf-login">
                            <div className="tf-container">
                                <div className="row justify-content-center">
                                    <div className="col-md-12">
                                        <div className="tf-heading style-5">
                                            <h4 className="heading">Create, Sell Or APIs</h4>
                                            <p className="sub-heading">Welcome to Apiway, the premier destination for APIs! Log in to your account for a better experience. </p>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-8 col-md-12">
                                        <form id="contactform">
                                            <div className="title-login">login with account</div>
                                            <fieldset><input id="name" name="name" tabindex="1" aria-required="true" required="" type="text" placeholder="User name"/></fieldset>
                                            <fieldset className="mb24"> <input id="showpassword" name="password" tabindex="2" aria-required="true"  type="password" placeholder="Password" required=""/>
                                            <span className="btn-show-pass "><i className="far fa-eye-slash"></i></span></fieldset>
                                            <div className="forgot-pass-wrap">
                                                <label>Remember for 30 days
                                                    <input type="checkbox"/>
                                                    <span className="btn-checkbox"></span>
                                                </label>
                                                <a className="forgot-pass" href="https://themesflat.co/login">Fogot password?</a>
                                            </div>
                                            <div className="title-login">if you don't have an account</div>
                                            <div className="button-gg"><a href="#" ><i className="fa-solid fa-user-plus"></i>Sign up</a></div>
                                           
                                            
                                            <button className="submit" type="submit">Login</button>
                                        </form> 

                                    
                                        
                                    </div>
                                </div>
                            </div>
                        </section>

                    
                       <Footer/>

               
                    </div>
                   
                </div>
              

                <a id="scroll-top"></a>

            </body>
        )
    }
}
export default LoginPage