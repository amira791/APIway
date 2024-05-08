import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../global_components/navbar';
import Footer from '../global_components/footer';
import useAuth from '../../hooks/useAuth';
import {useAuthContext} from '../../context/authContext';

export default function SignUpPage() {

    const navigate = useNavigate()
    const [last_name, setLastName] = useState("")
    const [first_name, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user_type, setUserType] = useState('');

    const { signUp } = useAuth()
    const { authState } = useAuthContext();


    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            user_type: user_type,
            user: {
                username: username,
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: password,
                phone: "00000000000"
            }
        }

        console.log(newUser)
        signUp(newUser)
        if (authState.isAuth && authState.isConsommateur ) {
            navigate('/')
            return;
        }
        if(authState.isAuth && authState.isFournisseur){
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
                                        <li>Sign Up</li>
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
                                        <h4 className="heading">Sign Up To APIway</h4>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-9 col-md-12">
                                    <form onSubmit={handleFormSubmit}>
                                        <div className='add-nft-inner'>
                                            <h6 class="title">Choose Role</h6>
                                            <p class="sub">Connect to APIway as provider to create APIs or as Consumer to use APIs</p>
                                            <ul class="blockchain-button">
                                                <li><label><input type="radio" name="userType" value="fournisseur" onChange={() => setUserType('fournisseur')} required /> Provider</label></li>
                                                <li><label><input type="radio" name="userType" value="consommateur" onChange={() => setUserType('consommateur')} required /> Consumer</label></li>
                                            </ul>
                                        </div>
                                        <fieldset><input value={first_name} onChange={(e) => setFirstName(e.target.value)} id="first_name" name="first_name" tabIndex="1" aria-required="true" required type="text" placeholder="First name" /></fieldset>
                                        <fieldset><input value={last_name} onChange={(e) => setLastName(e.target.value)} id="last_name" name="last_name" tabIndex="1" aria-required="true" required type="text" placeholder="Last name" /></fieldset>
                                        <fieldset><input value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" tabIndex="1" aria-required="true" required type="text" placeholder="Username" /></fieldset>
                                        <fieldset><input value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" tabIndex="1" aria-required="true" required type="text" placeholder="Email" /></fieldset>
                                        <fieldset> <input value={password} onChange={(e) => setPassword(e.target.value)} id="showpassword" name="password" tabIndex="2" aria-required="true" type="password" placeholder="Password" required />
                                            <span className="btn-show-pass"><i className="far fa-eye-slash"></i></span></fieldset>
                                        <fieldset className="mb24"> <input id="showpassword2" name="password" tabIndex="2" aria-required="true" type="password" placeholder="Confirm password" required="" />
                                            <span className="btn-show-pass2"><i className="far fa-eye-slash"></i></span></fieldset>
                                        <button className="submit button-gg" type="submit">Sign Up</button>

                                        <div className="title-login">Or login with social</div>
                                        <div className="button-gg"><a href="#" ><i className="fab fa-facebook"></i>Facebook</a></div>
                                        <div className="button-gg mb33"><a href="#" ><i className="fab fa-google"></i>Google</a>
                                        </div>

                                    </form>


                                </div>
                            </div>
                        </div>
                    </section>

                    <Footer />

                </div>

            </div>


            <a id="scroll-top"></a>
        </>
    )
}
