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
  
<div class="preload preload-container">
    <div class="preload-logo"></div>
</div>


<div id="wrapper" class="wrapper-style">
    <div id="page" class="clearfix">
    <Navbar />

        
        <section class="tf-contact">
            <div class="tf-container">
                <div class="row ">
                    <div class="col-md-6">
                        <div class="image ani4">
                            <img src="assets/images/img-contact.png" alt="Image"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="tf-heading style-3">
                            <h4 class="heading">Drop Up A Message</h4>
                            <p class="sub-heading">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit. </p>
                        </div>
                        <form onSubmit={handleSubmit} id="commentform"  class="comment-form">
                            <fieldset class="name">
                                <input type="text" id="name" placeholder="Your Full Name" class="tb-my-input" name="name" value={name} onChange={(e) => setName(e.target.value)}  tabindex="2" aria-required="true" required=""/>
                            </fieldset>    
                            <fieldset class="email">
                                <input type="email" id="email" placeholder="Your Email Address" class="tb-my-input" name="email" value={email} onChange={(e) => setEmail(e.target.value)} tabindex="2" aria-required="true" required=""/>
                            </fieldset>
                           
                            <fieldset class="message">
                                <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)}rows="4" placeholder="Message"  tabindex="4" aria-required="true" required=""></textarea>
                            </fieldset>
                            <div class="btn-submit"><button class="tf-button" type="submit">Send message</button></div>
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
