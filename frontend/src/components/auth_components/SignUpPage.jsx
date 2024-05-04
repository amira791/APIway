import React, { useState } from 'react'
import Navbar from '../global_components/navbar';
import Footer from '../global_components/footer';
import useAuth from '../../hooks/useAuth'


export default function SignUpPage() {
    const [last_name , setLastName] = useState("")
    const [first_name, setFirstName] = useState("")
    const [email,setEmail] = useState("")
    const [username,setUsername]= useState("")
    const [password,setPassword] = useState("")

    const {signUp , signIn} = useAuth()

   
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newUser ={
          user_type: "consommateur",
          user : {
            username : username,
            email : email,
            first_name : first_name,
            last_name  :last_name,
            password : password,
            phone : "00000000000"
          }
        }
         
        console.log(newUser)
        signUp(newUser)
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
                                <li>Sign Up</li>
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
                                <h4 class="heading">Sign Up To NFT</h4>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-9 col-md-12">
                            <form onSubmit={handleFormSubmit}>
                               <fieldset><input value={first_name} onChange={(e)=> setFirstName(e.target.value)} id="first_name" name="first_name" tabindex="1" aria-required="true" required="" type="text" placeholder="First name"/></fieldset>
                               <fieldset><input value={last_name} onChange={(e)=> setLastName(e.target.value)} id="last_name" name="last_name" tabindex="1" aria-required="true" required="" type="text" placeholder="Last name"/></fieldset>
                               <fieldset><input value={username} onChange={(e)=> setUsername(e.target.value)} id="username" name="username" tabindex="1" aria-required="true" required="" type="text" placeholder="Email"/></fieldset>
                               <fieldset><input value={email} onChange={(e)=> setEmail(e.target.value)} id="email" name="email" tabindex="1" aria-required="true" required="" type="text" placeholder="User name"/></fieldset>
                               <fieldset> <input value={password} onChange={(e)=> setPassword(e.target.value)} id="showpassword" name="password" tabindex="2" aria-required="true"  type="password" placeholder="Password" required=""/>
                                <span class="btn-show-pass"><i class="far fa-eye-slash"></i></span></fieldset>
                                <fieldset class="mb24"> <input id="showpassword2" name="password" tabindex="2" aria-required="true"  type="password" placeholder="Confirm password" required=""/>
                                    <span class="btn-show-pass2"><i class="far fa-eye-slash"></i></span></fieldset>
                                    <button class="submit button-gg" type="submit">Login</button>

                                <div class="title-login">Or login with social</div>
                                <div class="button-gg"><a href="#" ><i class="fab fa-facebook"></i>Facebook</a></div>
                                <div class="button-gg mb33"><a href="#" ><i class="fab fa-google"></i>Google</a>
                                </div>
                               
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
