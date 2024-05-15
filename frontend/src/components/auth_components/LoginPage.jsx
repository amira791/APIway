import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../global_components/navbar';
import Footer from '../global_components/footer';
import useAuth from '../../hooks/useAuth';
import { useAuthContext } from '../../context/authContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError] = useState()

    const { signIn } = useAuth();
    const { authState } = useAuthContext();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const user = {
            username_or_email: username,
            password: password,
        };
    
        try {
            signIn(user);
        } catch (error) {
            console.error("Error occurred during sign-in:", error);
            
            setError(true);
            return;
        }
    

        if (authState.isAuth  && authState.isConsommateur ) {
            console.log("Consumer is logged in");
            navigate('/');
        } else if (authState.isAuth && authState.isFournisseur) {
            console.log("Provider is logged in");
            localStorage.setItem('load',true)
            navigate('/provider_home');
        }
    };
    

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <>
            <div id="wrapper" className="wrapper-style">
                <div id="page" className="clearfix">
                    <Navbar />
                    <br />
                    <br />
                    <section className="tf-login" >
                        <div className="tf-container">
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div className="tf-heading style-2">
                                        <h4 className="heading">Sign In To APIway</h4>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-9 col-md-12">
                                    <form onSubmit={handleFormSubmit}>
                                     <ToastContainer />
                                        <fieldset>
                                            <input value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" tabIndex="1" aria-required="true" required type="text" placeholder="User name" />
                                        </fieldset>
                                        <fieldset>
                                            <input value={password} onChange={(e) => setPassword(e.target.value)} id="showpassword" name="password" tabIndex="2" aria-required="true" type={showPassword ? "text" : "password"} placeholder="Password" required />
                                            <span className="btn-show-pass" onClick={togglePasswordVisibility}><i className="far fa-eye-slash"></i></span>
                                        </fieldset>
                                        <button className="submit button-gg" type="submit">Login</button>
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
    );
}
