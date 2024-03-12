import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'
        let imgattr = "Footer logo"

        return (
          <footer className="footer">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-3 col-md-3">
                            <div className="widget widget-infor">
                                <div className="logo">
                                    <img id="logo_footer" src="assets/images/logo/logo_dark.png" alt="Image" />
                                </div>
                                <p className="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                                <ul className="social-item">
                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fab fa-telegram-plane"></i></a></li>
                                    <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                                    <li><a href="#"><i className="icon-fl-tik-tok-2"></i></a></li>
                                    <li><a href="#"><i className="icon-fl-vt"></i></a></li>
                                </ul>
                                <p className="copy-right">Copyright © 2022 Themesflat. All Rights Reserved.

                                </p>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-5">
                            <div className="widget widget-menu">
                                <div className="menu menu-1">
                                    <h6 className="widget-title">Maketplace</h6>
                                    <ul >
                                        <li><a href="#">Explore</a></li>
                                        <li><a href="#">Item Detail</a></li>
                                        <li><a href="#">Live Auditon</a></li>
                                    </ul>
                                </div>
                                <div className="menu menu-2">
                                    <h6 className="widget-title">Stats</h6>
                                    <ul >
                                        <li><a href="#">Ranking</a></li>
                                        <li><a href="#">Ativity</a></li>
                                        <li><a href="#">Auther</a></li>
                                    </ul>
                                </div>
                                <div className="menu menu-3">
                                    <h6 className="widget-title">Resoure</h6>
                                    <ul >
                                        <li><a href="#">Blogs</a></li>
                                        <li><a href="#">Help and Center</a></li>
                                        <li><a href="#">FaQs</a></li>
                                    </ul>
                                </div>
                                <div className="menu menu-4">
                                    <h6 className="widget-title">My account</h6>
                                    <ul >
                                        <li><a href="#">Profile</a></li>
                                        <li><a href="#">My wallet</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-4">
                            <div className="widget widget-subcribe">
                                <h6 className="widget-title">Subscribe Us</h6>
                                <p className="content">Signup for our newsletter to get the latest news in your inbox.</p>
                                <form action="#" id="subscribe-form">
                                    <input type="email" placeholder="Info@yourgmail.com" required="" id="subscribe-email" defaultChecked={true}/>
                                    <button className="tf-button" type="submit" id="subscribe-button"><i className="icon-fl-send"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
           </footer>
        )
    }
}


export default Footer