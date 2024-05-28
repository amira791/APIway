import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import ManipulateCat from "../../hooks/CategoryHook";
import { useEffect } from "react";
import TopProvidersSection from "./TopProvidersSection";
import HotSalesSection from "./HotSalesSection";

function useExternalScript(url) {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
}
const HomeSection = () => {


  return (
    <body className="body header-fixed home-6">
      <div id="wrapper" className="wrapper-style">
        <div id="page" className="clearfix">
          <Navbar />
          <section className="tf-slider">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <img
                    src="/assets/images/slider/bg-slider-2.png"
                    alt="Image"
                    className="img-slider-1"
                  />
                  <div className="swiper-container slider-home ">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="slider-item">
                          <div className="tf-slider-item style-6">
                            <div className="content-inner">
                              <h1 className="title">
                                <span className="animationtext clip">
                                  <span className="cd-words-wrapper">
                                    Empower Your Apps
                                  </span>{" "}
                                </span>
                              </h1>
                              <p
                                style={{
                                  fontSize: "25px",
                                  margin: "4% 0",
                                  lineHeight: "1.5",
                                }}
                              >
                                {" "}
                                Discover, Integrate, and Customize your apps
                                with Our API Marketplace. Explore a variety of
                                APIs in our marketplace, And Enhance your apps
                                effortlessly with our diverse selection.
                              </p>
                              <div style={{ fontSize: "20px", gap: "20px" }}>
                                <Link to={'/searchApi'} className="tf-button style-6">
                                Discover now
                                </Link>
                               
                              </div>
                            </div>
                           
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


         <HotSalesSection/>

         <TopProvidersSection/>
          <section className="tf-section tf-create-and-sell">
            <div className="tf-container">
           <div className="row">
            <div className="col-md-12">
                <div className="tf-heading style-2 mb40 wow fadeInUp">
                    <h4 className="heading"> Our Marketplace Services</h4>
                </div>
            </div>
            <div className="col-lg-3 col-md-6">
                <div className="tf-create wow fadeInUp"  data-wow-delay="0.2s">
                    <div className="icon">
                        <img src="/assets/images/svg/icon-create-5.svg" alt="Image"/>
                    </div>
                    <h6 className="title"><a href="#">API Exploitation</a></h6>
                    <p className="content">Search, explore, and integrate APIs seamlessly, unlocking endless possibilities for your projects and endeavors.</p>
                </div>
            </div>
            <div className="col-lg-3 col-md-6">
                <div className="tf-create wow fadeInUp"  data-wow-delay="0.4s">
                    <div className="icon">
                        <img src="/assets/images/svg/icon-create-2.svg" alt="Image"/>
                    </div>
                    <h6 className="title"><a href="#">API Publishing & Management</a> </h6>
                    <p className="content">Welcome to seamless API management! Easily add and update APIs with our intuitive platform.</p>
                </div>
            </div>
            <div className="col-lg-3 col-md-6">
                <div className="tf-create wow fadeInUp"  data-wow-delay="0.6s">
                    <div className="icon">
                        <img src="/assets/images/svg/icon-create-6.svg" alt="Image"/>
                    </div>
                    <h6 className="title"><a href="#">API Documentation</a> </h6>
                    <p className="content">Unlock the power of clear documentation! Publish comprehensive API docs effortlessly with our platform.</p>
                </div>
            </div>
            <div className="col-lg-3 col-md-6">
                <div className="tf-create wow fadeInUp"  data-wow-delay="0.8s">
                    <div className="icon">
                        <img src="/assets/images/svg/icon-create-9.svg" alt="Image"/>
                    </div>
                    <h6 className="title"><a href="#">API Testing & Monitoring</a></h6>
                    <p className="content">Seamlessly test functionality, performance, and reliability to guarantee a smooth user experience.</p>
                </div>
            </div>
        </div>
    </div>
</section>

   <Footer/>
        </div>
      </div>

      <div
        className="modal fade popup"
        id="popup_bid"
        tabIndex="-1"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body space-y-20 pd-40">
              <h3>Place a Bid</h3>
              <p className="text-center sub-heading">
                You must bid a least{" "}
                <span className="price color-popup">4.89 ETH</span>
              </p>
              <input type="text" className="form-control" placeholder="00.00 ETH" />
              <p className="label-1">
                Enter quantity. <span className="color-popup">5 available</span>
              </p>
              <input
                type="text"
                className="form-control quantity form-bottom"
                value="1"
              />
              <div className="d-flex justify-content-between detail-1">
                <p> You must bid at least:</p>
                <p className="text-right price color-popup"> 4.89 ETH </p>
              </div>
              <div className="d-flex justify-content-between detail-2">
                <p> Service free:</p>
                <p className="text-right price color-popup"> 0,89 ETH </p>
              </div>
              <div className="d-flex justify-content-between detail-3">
                <p> Total bid amount:</p>
                <p className="text-right price color-popup"> 4 ETH </p>
              </div>
              <a
                href="#"
                className="button-popup"
                data-toggle="modal"
                data-target="#popup_bid_success"
                data-dismiss="modal"
                aria-label="Close"
              >
                {" "}
                Purchase
              </a>
            </div>
          </div>
        </div>
      </div>

      <a id="scroll-top"></a>

    </body>
  );
};

export default HomeSection;
