import React, { useState } from 'react'
import Navbar from './navbar'

export default function Contact() {

    const [message , setMessage] = useState('');
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault()
        const newMessage = {
          email : email ,
          name : name,
          message: message
        }
        console.log(newMessage)
    }

  return (
    <>
  
<div className="preload preload-container">
    <div className="preload-logo"></div>
</div>


<div id="wrapper" className="wrapper-style">
    <div id="page" className="clearfix">
    <Navbar />

        
        <section className="tf-contact">
            <div className="tf-container">
                <div className="row ">
                    <div className="col-md-6">
                        <div className="image ani4">
                            <img src="assets/images/img-contact.png" alt="Image"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="tf-heading style-3">
                            <h4 className="heading">Drop Up A Message</h4>
                            <p className="sub-heading">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit. </p>
                        </div>
                        <form onSubmit={handleSubmit} id="commentform"  className="comment-form">
                            <fieldset className="name">
                                <input type="text" id="name" placeholder="Your Full Name" className="tb-my-input" name="name" value={name} onChange={(e) => setName(e.target.value)}  tabindex="2" aria-required="true" required=""/>
                            </fieldset>    
                            <fieldset className="email">
                                <input type="email" id="email" placeholder="Your Email Address" className="tb-my-input" name="email" value={email} onChange={(e) => setEmail(e.target.value)} tabindex="2" aria-required="true" required=""/>
                            </fieldset>
                           
                            <fieldset className="message">
                                <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)}rows="4" placeholder="Message"  tabindex="4" aria-required="true" required=""></textarea>
                            </fieldset>
                            <div className="btn-submit"><button className="tf-button" type="submit">Send message</button></div>
                        </form>
                        

                    
                        
                    </div>
                </div>
            </div>
        </section>

  
    </div>

</div>


<a id="scroll-top"></a>


    
    </>
  )
}
