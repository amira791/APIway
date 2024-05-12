import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../global_components/navbar';
import Footer from '../global_components/footer';
import useAuth from '../../hooks/useAuth'
import {useAuthContext} from '../../context/authContext'


export default function LoginPage() {
   
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [username,setUsername]= useState("")
    const [password,setPassword] = useState("")

    const {signIn} = useAuth()
    const { authState } = useAuthContext();

   
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const user ={
          username_or_email: username,
          password: password
        }
         
        console.log(user)
        signIn(user)
        
        if (authState.isAuth  && authState.isConsommateur  ) {
            console.log("consumer is logged in")
            navigate('/')
            return;
        }

        if(authState.isAuth && authState.isFournisseur ){
            console.log("provider is logged in")
            navigate('/provider_home')
            return;
        } 
        
       
    };

  return (
    <>
 <div id="wrapper" className="wrapper-style">
        <div id="page" className="clearfix">
        <Navbar />

            <section className="tf-page-title style-2">    
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="breadcrumbs">
                                <li><a href="blog2.html">Home</a></li>
                                <li>Sign In</li>
                            </ul>
                   
                        </div>
                    </div>
                </div>                    
            </section>
                
            <section className="tf-login">
                <div className="tf-container">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="tf-heading style-2">
                                <h4 className="heading">Sign In To APIway</h4>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-9 col-md-12">
                            <form onSubmit={handleFormSubmit}>
                              {/* <fieldset><input value={email} onChange={(e)=> setEmail(e.target.value)} id="email" name="email" tabindex="1" aria-required="true" required="" type="text" placeholder="Email"/></fieldset> */}
                              <fieldset><input value={username} onChange={(e)=> setUsername(e.target.value)} id="username" name="username" tabIndex="1" aria-required="true" required="" type="text" placeholder="User name"/></fieldset>
                              <fieldset> <input value={password} onChange={(e)=> setPassword(e.target.value)} id="showpassword" name="password" tabIndex="2" aria-required="true"  type="password" placeholder="Password" required=""/>
                              <span className="btn-show-pass"><i className="far fa-eye-slash"></i></span></fieldset>  
                              <button className="submit button-gg" type="submit">Login</button> 
                            </form>
                        
                            
                        </div>
                    </div>
                </div>
            </section>

      <Footer/>

        </div>

    </div>


    <a id="scroll-top"></a>
    </>
  )
}
