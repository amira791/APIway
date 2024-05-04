import React, { useState } from 'react'
import Navbar from '../global_components/navbar';
import Footer from '../global_components/footer';
import useAuth from '../../hooks/useAuth'


export default function LoginPage() {
   
    const [email,setEmail] = useState("")
    const [username,setUsername]= useState("")
    const [password,setPassword] = useState("")

    const { signIn} = useAuth()

   
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const user ={
          username_or_email: username,
          password: password
        }
         
        console.log(user)
        signIn(user)
    };

  return (
    <>
 <div id="wrapper" class="wrapper-style">
        <div id="page" class="clearfix">
        <Navbar />

            <section class="tf-page-title style-2">    
                <div class="tf-container">
                    <div class="row">
                        <div class="col-md-12">
                            <ul class="breadcrumbs">
                                <li><a href="blog2.html">Home</a></li>
                                <li>Sign In</li>
                            </ul>
                   
                        </div>
                    </div>
                </div>                    
            </section>
                
            <section class="tf-login">
                <div class="tf-container">
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <div class="tf-heading style-2">
                                <h4 class="heading">Sign In To NFT</h4>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-9 col-md-12">
                            <form onSubmit={handleFormSubmit}>
                              {/* <fieldset><input value={email} onChange={(e)=> setEmail(e.target.value)} id="email" name="email" tabindex="1" aria-required="true" required="" type="text" placeholder="Email"/></fieldset> */}
                              <fieldset><input value={username} onChange={(e)=> setUsername(e.target.value)} id="username" name="username" tabindex="1" aria-required="true" required="" type="text" placeholder="User name"/></fieldset>
                              <fieldset> <input value={password} onChange={(e)=> setPassword(e.target.value)} id="showpassword" name="password" tabindex="2" aria-required="true"  type="password" placeholder="Password" required=""/>
                              <span class="btn-show-pass"><i class="far fa-eye-slash"></i></span></fieldset>  
                              <button class="submit button-gg" type="submit">Login</button> 
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
