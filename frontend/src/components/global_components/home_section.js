import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import { useEffect } from "react";

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
                    src="assets/images/slider/bg-slider-2.png"
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
                                <a
                                  href="searchApi"
                                  className="tf-button style-6"
                                >
                                  Discover now
                                </a>
                              </div>
                            </div>
                            <div className="image ">
                              <div className="slider-card-img">
                                <ul>
                                  <li className="prev2">
                                    <div className="sc-product style1 ">
                                    <div className="top">
                                        <a href="item-details.html" className="tag">
                                          MusicAPI
                                        </a>
                                        <div className="wish-list">
                                          <a href="#" className="heart-icon"></a>
                                        </div>
                                      </div>
                                      <div className="features">
                                        <div className="product-media">
                                          <img
                                            src="assets/images/product/product79.jpg"
                                            alt="images"
                                          />
                                        </div>
                                        <div className="featured-countdown">
                                         
                                        </div>
                                        <div className="rain-drop1">
                                          <img
                                            src="assets/images/icon/rain1.svg"
                                            alt="images"
                                          />
                                        </div>
                                        <div className="rain-drop2">
                                          <img
                                            src="assets/images/icon/rain2.svg"
                                            alt="images"
                                          />
                                        </div>
                                      </div>
                                      <div className="bottom">
                                        <div className="details-product">
                                          <div className="author">
                                            <div className="avatar">
                                              <img
                                                src="assets/images/author/author1.png"
                                                alt="images"
                                              />
                                            </div>
                                            <div className="content">
                                              <div className="position">
                                                Owner
                                              </div>
                                              <div className="name">
                                                {" "}
                                                <a href="#">Magnus Perry</a>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="bid">
                                            <div className="subtitle">
                                              Price
                                            </div>
                                            <div className="price">
                                              <span className="cash">$70.00</span>
                                              <span className="icon">
                                             
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="product-button">
                                          <a
                                            href="#"
                                            data-toggle="modal"
                                            data-target="#popup_bid"
                                            className="tf-button"
                                          >
                                            {" "}
                                            <span className="icon-btn-product"></span>{" "}
                                            Purchase
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="prev1">
                                    <div className="sc-product style1 ">
                                      <div className="top">
                                        <a href="item-details.html" className="tag">
                                          TransportationAPI
                                        </a>
                                        <div className="wish-list">
                                          <a href="#" className="heart-icon"></a>
                                        </div>
                                      </div>
                                      <div className="features">
                                        <div className="product-media">
                                          <img
                                            src="assets/images/product/product75.jpg"
                                            alt="images"
                                          />
                                        </div>
                                        <div className="featured-countdown">
                                         
                                        </div>
                                        <div className="rain-drop1">
                                          <img
                                            src="assets/images/icon/rain1.svg"
                                            alt="images"
                                          />
                                        </div>
                                        <div className="rain-drop2">
                                          <img
                                            src="assets/images/icon/rain2.svg"
                                            alt="images"
                                          />
                                        </div>
                                      </div>
                                      <div className="bottom">
                                        <div className="product-button">
                                          <a
                                            href="#"
                                            data-toggle="modal"
                                            data-target="#popup_bid"
                                            className="tf-button"
                                          >
                                            {" "}
                                            <span className="icon-btn-product"></span>{" "}
                                            Purchase
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="current">
                                    <div className="sc-product style1 ">
                                    <div className="top">
                                        <a href="item-details.html" className="tag">
                                          WeatherAPI
                                        </a>
                                        <div className="wish-list">
                                          <a href="#" className="heart-icon"></a>
                                        </div>
                                      </div>
                                      <div className="features">
                                        <div className="product-media">
                                          <img
                                            src="assets/images/product/product79.jpg"
                                            alt="images"
                                          />
                                        </div>
                                        <div className="featured-countdown">
                                         
                                        </div>
                                        <div className="rain-drop1">
                                          <img
                                            src="assets/images/icon/rain1.svg"
                                            alt="images"
                                          />
                                        </div>
                                        <div className="rain-drop2">
                                          <img
                                            src="assets/images/icon/rain2.svg"
                                            alt="images"
                                          />
                                        </div>
                                      </div>
                                      <div className="bottom">
                                        <div className="details-product">
                                          <div className="author">
                                            <div className="avatar">
                                              <img
                                                src="assets/images/author/author1.png"
                                                alt="images"
                                              />
                                            </div>
                                            <div className="content">
                                              <div className="position">
                                                Owner
                                              </div>
                                              <div className="name">
                                                {" "}
                                                <a href="#">Magnus Perry</a>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="bid">
                                            <div className="subtitle">
                                              Price
                                            </div>
                                            <div className="price">
                                              <span className="cash">$70.00</span>
                                              <span className="icon">
                                             
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="product-button">
                                          <a
                                            href="#"
                                            data-toggle="modal"
                                            data-target="#popup_bid"
                                            className="tf-button"
                                          >
                                            {" "}
                                            <span className="icon-btn-product"></span>{" "}
                                            Purchase
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="next1">
                                    <div className="sc-product style1 ">
                                      <div className="top">
                                        <a href="item-details.html" className="tag">
                                          SportAPI
                                        </a>
                                        <div className="wish-list">
                                          <a href="#" className="heart-icon"></a>
                                        </div>
                                      </div>
                                      <div className="features">
                                        <div className="product-media">
                                          <img
                                            src="assets/images/product/product75.jpg"
                                            alt="images"
                                          />
                                        </div>
                                        <div className="featured-countdown">
                                         
                                        </div>
                                        <div className="rain-drop1">
                                          <img
                                            src="assets/images/icon/rain1.svg"
                                            alt="images"
                                          />
                                        </div>
                                        <div className="rain-drop2">
                                          <img
                                            src="assets/images/icon/rain2.svg"
                                            alt="images"
                                          />
                                        </div>
                                      </div>
                                      <div className="bottom">
                                        <div className="product-button">
                                          <a
                                            href="#"
                                            data-toggle="modal"
                                            data-target="#popup_bid"
                                            className="tf-button"
                                          >
                                            {" "}
                                            <span className="icon-btn-product"></span>{" "}
                                            Purchase
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="next2">
                                    <div className="sc-product style1 ">
                                    <div className="top">
                                        <a href="item-details.html" className="tag">
                                         GameAPI
                                        </a>
                                        <div className="wish-list">
                                          <a href="#" className="heart-icon"></a>
                                        </div>
                                      </div>
                                      <div className="features">
                                        <div className="product-media">
                                          <img
                                            src="assets/images/product/product79.jpg"
                                            alt="images"
                                          />
                                        </div>
                                        <div className="featured-countdown">
                                         
                                        </div>
                                        <div className="rain-drop1">
                                          <img
                                            src="assets/images/icon/rain1.svg"
                                            alt="images"
                                          />
                                        </div>
                                        <div className="rain-drop2">
                                          <img
                                            src="assets/images/icon/rain2.svg"
                                            alt="images"
                                          />
                                        </div>
                                      </div>
                                      <div className="bottom">
                                        <div className="details-product">
                                          <div className="author">
                                            <div className="avatar">
                                              <img
                                                src="assets/images/author/author1.png"
                                                alt="images"
                                              />
                                            </div>
                                            <div className="content">
                                              <div className="position">
                                                Owner
                                              </div>
                                              <div className="name">
                                                {" "}
                                                <a href="#">Magnus Perry</a>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="bid">
                                            <div className="subtitle">
                                              Price
                                            </div>
                                            <div className="price">
                                              <span className="cash">$99.99</span>
                                              <span className="icon">
                                             
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="product-button">
                                          <a
                                            href="#"
                                            data-toggle="modal"
                                            data-target="#popup_bid"
                                            className="tf-button"
                                          >
                                            {" "}
                                            <span className="icon-btn-product"></span>{" "}
                                            Purchase
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
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
          {/* 
          <section className="tf-section tf-category">
                <div className="tf-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tf-heading style-4 mb40 wow fadeInUp">
                                <h4 className="heading">All Categories</h4>
                            </div>
                        </div>
                        <div className="col-md-12 wow fadeInUp">
                            <div className="swiper-container product-category ">
                                <div className="swiper-wrapper">
                                  {/*   {categories.map((category) => 
                               <div className="swiper-slide">
                               <div className="slider-item">
                                   <div className="tf-product-category">
                                       <img src="assets/images/product-category/product-category-1.jpg" alt="Image"/>
                                       <div className="category"><a href="#">{category.label}</a></div>
                                   </div>
                               </div>
                           </div>)} *
                                    <div className="swiper-slide">
                                        <div className="slider-item">
                                            <div className="tf-product-category">
                                                <img src="assets/images/product-category/product-category-1.jpg" alt="Image"/>
                                                <div className="category"><a href="#">Digital art</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="slider-item">
                                            <div className="tf-product-category">
                                                <img src="assets/images/product-category/product-category-2.jpg" alt="Image"/>
                                                <div className="category"><a href="#">Style</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="slider-item">
                                            <div className="tf-product-category">
                                                <img src="assets/images/product-category/product-category-3.jpg" alt="Image"/>
                                                <div className="category"><a href="#">Music</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="slider-item">
                                            <div className="tf-product-category">
                                                <img src="assets/images/product-category/product-category-4.jpg" alt="Image"/>
                                                <div className="category"><a href="#">Sport</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="slider-item">
                                            <div className="tf-product-category">
                                                <img src="assets/images/product-category/product-category-1.jpg" alt="Image"/>
                                                <div className="category"><a href="#">Digital art</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="slider-item">
                                            <div className="tf-product-category">
                                                <img src="assets/images/product-category/product-category-2.jpg" alt="Image"/>
                                                <div className="category"><a href="#">Style</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div> 
                            <div className="swiper-button-next button-product-category-next"></div>
                            <div className="swiper-button-prev button-product-category-prev"></div>     
                        </div>
                    </div>
                </div>
            </section> */}

          <section className="tf-section tf-hot-pick tf-filter">
            <div className="tf-container">
              <div className="row ">
                <div className="col-md-12">
                  <div className="tf-heading style-4 mb26 wow fadeInUp">
                    <h3 className="heading">Hot Sales</h3>
                    <p className="sub-heading">
                      The most purchased APIs - Based on the last 30 days
                    </p>
                  </div>
                </div>
              </div>
              <div className="row tf-filter-container wow fadeInUp">
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d cyber">
                  <div className="sc-product style2">
                    <div className="top">
                      <a href="item-details.html" className="tag">
                        FinanceAPI
                      </a>
                      <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="details-product">
                        <div className="author">
                          <div className="avatar">
                            <img
                              src="assets/images/author/author1.png"
                              alt="images"
                            />
                          </div>
                          <div className="content">
                            <div className="position">Owner</div>
                            <div className="name">
                              {" "}
                              <a href="#">Financial Solutions Inc.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <div className="product-media">
                        <img
                          src="assets/images/product/product74.jpg"
                          alt="images"
                        />
                      </div>
                      <div className="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div className="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div className="bottom-style2">
                      <div className="price">
                        <div className="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div className="content">
                         
                          <div className="cash">Price: $99.00</div>
                        </div>
                      </div>
                      <div className="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div className="sc-product style2">
                    <div className="top">
                      <a href="item-details.html" className="tag">
                        WeatherAPI 
                      </a>
                      <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="details-product">
                        <div className="author">
                          <div className="avatar">
                            <img
                              src="assets/images/author/author14.png"
                              alt="images"
                            />
                          </div>
                          <div className="content">
                            <div className="position">Owner</div>
                            <div className="name">
                              {" "}
                              <a href="#">Weather Solutions </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <div className="product-media">
                        <img
                          src="assets/images/product/product75.jpg"
                          alt="images"
                        />
                      </div>
                      <div className="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div className="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div className="bottom-style2">
                      <div className="price">
                        <div className="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div className="content">
                         
                          <div className="cash">Price: $70.99</div>
                        </div>
                      </div>
                      <div className="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div className="sc-product style2">
                    <div className="top">
                      <a href="item-details.html" className="tag">
                        Health API
                      </a>
                      <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="details-product">
                        <div className="author">
                          <div className="avatar">
                            <img
                              src="assets/images/author/author14.png"
                              alt="images"
                            />
                          </div>
                          <div className="content">
                            <div className="position">Owner</div>
                            <div className="name">
                              {" "}
                              <a href="#">Health Solutions Inc.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <div className="product-media">
                        <img
                          src="assets/images/product/product71.jpg"
                          alt="images"
                        />
                      </div>
                      <div className="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div className="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div className="bottom-style2">
                      <div className="price">
                      <div className="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                    </div>
                        <div className="content">
                         
                          <div className="cash">Price: $61.99</div>
                        </div>
                      </div>
                      <div className="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div className="sc-product style2">
                    <div className="top">
                      <a href="item-details.html" className="tag">
                        MusicAPI
                      </a>
                      <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="details-product">
                        <div className="author">
                          <div className="avatar">
                            <img
                              src="assets/images/author/author1.png"
                              alt="images"
                            />
                          </div>
                          <div className="content">
                            <div className="position">Owner</div>
                            <div className="name">
                              {" "}
                              <a href="#">Music Solutions Ltd.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <div className="product-media">
                        <img
                          src="assets/images/product/product70.jpg"
                          alt="images"
                        />
                      </div>
                      <div className="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div className="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div className="bottom-style2">
                      <div className="price">
                        <div className="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div className="content">
                         
                          <div className="cash">Price: $87.99</div>
                        </div>
                      </div>
                      <div className="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div className="sc-product style2">
                    <div className="top">
                      <a href="item-details.html" className="tag">
                        TravelAPI
                      </a>
                      <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="details-product">
                        <div className="author">
                          <div className="avatar">
                            <img
                              src="assets/images/author/author4.png"
                              alt="images"
                            />
                          </div>
                          <div className="content">
                            <div className="position">Owner</div>
                            <div className="name">
                              {" "}
                              <a href="#">Travel Solutions LLC.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <div className="product-media">
                        <img
                          src="assets/images/product/product72.jpg"
                          alt="images"
                        />
                      </div>
                      <div className="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div className="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div className="bottom-style2">
                      <div className="price">
                        <div className="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div className="content">
                         
                          <div className="cash">Price: $75.99</div>
                        </div>
                      </div>
                      <div className="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div className="sc-product style2">
                    <div className="top">
                      <a href="item-details.html" className="tag">
                        SocialAPI
                      </a>
                      <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="details-product">
                        <div className="author">
                          <div className="avatar">
                            <img
                              src="assets/images/author/author5.png"
                              alt="images"
                            />
                          </div>
                          <div className="content">
                            <div className="position">Owner</div>
                            <div className="name">
                              {" "}
                              <a href="#">Social Solutions Inc.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <div className="product-media">
                        <img
                          src="assets/images/product/product73.jpg"
                          alt="images"
                        />
                      </div>
                      <div className="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div className="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div className="bottom-style2">
                      <div className="price">
                        <div className="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div className="content">
                         
                          <div className="cash">Price: $80.99</div>
                        </div>
                      </div>
                      <div className="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div className="sc-product style2">
                    <div className="top">
                      <a href="item-details.html" className="tag">
                        E-commerceAPI
                      </a>
                      <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="details-product">
                        <div className="author">
                          <div className="avatar">
                            <img
                              src="assets/images/author/author7.png"
                              alt="images"
                            />
                          </div>
                          <div className="content">
                            <div className="position">Owner</div>
                            <div className="name">
                              {" "}
                              <a href="#">E-commerce Solutions Ltd.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <div className="product-media">
                        <img
                          src="assets/images/product/product77.jpg"
                          alt="images"
                        />
                      </div>
                      <div className="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div className="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div className="bottom-style2">
                      <div className="price">
                        <div className="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div className="content">
                         
                          <div className="cash">Price: $70.99</div>
                        </div>
                      </div>
                      <div className="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div className="sc-product style2">
                    <div className="top">
                      <a href="item-details.html" className="tag">
                        SecurityAPI
                      </a>
                      <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="details-product">
                        <div className="author">
                          <div className="avatar">
                            <img
                              src="assets/images/author/author14.png"
                              alt="images"
                            />
                          </div>
                          <div className="content">
                            <div className="position">Owner</div>
                            <div className="name">
                              {" "}
                              <a href="#">Security Solutions Inc.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <div className="product-media">
                        <img
                          src="assets/images/product/product78.jpg"
                          alt="images"
                        />
                      </div>
                      <div className="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div className="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div className="bottom-style2">
                      <div className="price">
                        <div className="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div className="content">
                         
                          <div className="cash">Price: $70.99</div>
                        </div>
                      </div>
                      <div className="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div className="sc-product style2">
                    <div className="top">
                      <a href="item-details.html" className="tag">
                        FitnessAPI
                      </a>
                      <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="details-product">
                        <div className="author">
                          <div className="avatar">
                            <img
                              src="assets/images/author/author19.png"
                              alt="images"
                            />
                          </div>
                          <div className="content">
                            <div className="position">Owner</div>
                            <div className="name">
                              {" "}
                              <a href="#">Fitness Tracker Inc.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <div className="product-media">
                        <img
                          src="assets/images/product/product71.jpg"
                          alt="images"
                        />
                      </div>
                      <div className="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div className="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div className="bottom-style2">
                      <div className="price">
                        <div className="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div className="content">
                         
                          <div className="cash">Price: $70.99</div>
                        </div>
                      </div>
                      <div className="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div className="sc-product style2">
                    <div className="top">
                      <a href="item-details.html" className="tag">
                        FoodAPI
                      </a>
                      <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="details-product">
                        <div className="author">
                          <div className="avatar">
                            <img
                              src="assets/images/author/author14.png"
                              alt="images"
                            />
                          </div>
                          <div className="content">
                            <div className="position">Owner</div>
                            <div className="name">
                              {" "}
                              <a href="#">Foodie Tech Solutions</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <div className="product-media">
                        <img
                          src="assets/images/product/product77.jpg"
                          alt="images"
                        />
                      </div>
                      <div className="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div className="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div className="bottom-style2">
                      <div className="price">
                        <div className="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div className="content">
                         
                          <div className="cash">Price: $60.99</div>
                        </div>
                      </div>
                      <div className="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div className="sc-product style2">
                    <div className="top">
                      <a href="item-details.html" className="tag">
                        GamingAPI
                      </a>
                      <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="details-product">
                        <div className="author">
                          <div className="avatar">
                            <img
                              src="assets/images/author/author12.png"
                              alt="images"
                            />
                          </div>
                          <div className="content">
                            <div className="position">Owner</div>
                            <div className="name">
                              {" "}
                              <a href="#">GameTech Innovations</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <div className="product-media">
                        <img
                          src="assets/images/product/product70.jpg"
                          alt="images"
                        />
                      </div>
                      <div className="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div className="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div className="bottom-style2">
                      <div className="price">
                        <div className="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div className="content">
                         
                          <div className="cash">Price: $120.99</div>
                        </div>
                      </div>
                      <div className="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div className="sc-product style2">
                    <div className="top">
                      <a href="item-details.html" className="tag">
                        TransportationAPI
                      </a>
                      <div className="wish-list">
                        <a href="#" className="heart-icon"></a>
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="details-product">
                        <div className="author">
                          <div className="avatar">
                            <img
                              src="assets/images/author/author10.png"
                              alt="images"
                            />
                          </div>
                          <div className="content">
                            <div className="position">Owner</div>
                            <div className="name">
                              {" "}
                              <a href="#">TransitTech Solutions</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="features">
                      <div className="product-media">
                        <img
                          src="assets/images/product/product73.jpg"
                          alt="images"
                        />
                      </div>
                      <div className="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div className="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div className="bottom-style2">
                      <div className="price">
                        <div className="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div className="content">
                         
                          <div className="cash">Price: $100.99</div>
                        </div>
                      </div>
                      <div className="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          className="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="tf-section tf-top-seller">
            <div className="tf-container">
              <div className="row wow fadeInUp">
                <div className="col-md-12">
                  <div className="tf-heading style-4 mb44 ">
                    <h3 className="heading">Top Providers</h3>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="tf-author style-3">
                    <span className="number">1</span>
                    <div className="image">
                      <img src="assets/images/author/author1.png" alt="Image" />
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0.730469L11.1971 2.96846L14.2901 2.44932L14.7521 5.55132L17.5595 6.94932L16.11 9.73047L17.5595 12.5116L14.7521 13.9096L14.2901 17.0116L11.1971 16.4925L9 18.7305L6.80289 16.4925L3.70993 17.0116L3.24789 13.9096L0.440492 12.5116L1.89 9.73047L0.440492 6.94932L3.24789 5.55132L3.70993 2.44932L6.80289 2.96846L9 0.730469Z"
                          fill="#3749E9"
                        />
                        <path
                          d="M8.17054 12.8131C8.08681 12.896 7.97263 12.9423 7.85397 12.9423C7.73531 12.9423 7.62113 12.896 7.5374 12.8131L5.00929 10.3226C4.7469 10.0641 4.7469 9.64516 5.00929 9.38716L5.32587 9.07535C5.58826 8.81691 6.01319 8.81691 6.27558 9.07535L7.85397 10.63L12.119 6.42918C12.3814 6.17074 12.8067 6.17074 13.0687 6.42918L13.3853 6.74099C13.6477 6.99943 13.6477 7.41841 13.3853 7.67641L8.17054 12.8131Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href="#">TransitTech Solutions</a>
                      </div>
                      <div className="price">
                        <span className="price-eth">10  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="tf-author style-3">
                    <span className="number">2</span>
                    <div className="image">
                      <img
                        src="assets/images/author/author14.png"
                        alt="Image"
                      />
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0.730469L11.1971 2.96846L14.2901 2.44932L14.7521 5.55132L17.5595 6.94932L16.11 9.73047L17.5595 12.5116L14.7521 13.9096L14.2901 17.0116L11.1971 16.4925L9 18.7305L6.80289 16.4925L3.70993 17.0116L3.24789 13.9096L0.440492 12.5116L1.89 9.73047L0.440492 6.94932L3.24789 5.55132L3.70993 2.44932L6.80289 2.96846L9 0.730469Z"
                          fill="#3749E9"
                        />
                        <path
                          d="M8.17054 12.8131C8.08681 12.896 7.97263 12.9423 7.85397 12.9423C7.73531 12.9423 7.62113 12.896 7.5374 12.8131L5.00929 10.3226C4.7469 10.0641 4.7469 9.64516 5.00929 9.38716L5.32587 9.07535C5.58826 8.81691 6.01319 8.81691 6.27558 9.07535L7.85397 10.63L12.119 6.42918C12.3814 6.17074 12.8067 6.17074 13.0687 6.42918L13.3853 6.74099C13.6477 6.99943 13.6477 7.41841 13.3853 7.67641L8.17054 12.8131Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href="#">E-commerce Solutions </a>
                      </div>
                      <div className="price">
                        <span className="price-eth">8  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="tf-author style-3">
                    <span className="number">3</span>
                    <div className="image">
                      <img
                        src="assets/images/author/author15.png"
                        alt="Image"
                      />
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0.730469L11.1971 2.96846L14.2901 2.44932L14.7521 5.55132L17.5595 6.94932L16.11 9.73047L17.5595 12.5116L14.7521 13.9096L14.2901 17.0116L11.1971 16.4925L9 18.7305L6.80289 16.4925L3.70993 17.0116L3.24789 13.9096L0.440492 12.5116L1.89 9.73047L0.440492 6.94932L3.24789 5.55132L3.70993 2.44932L6.80289 2.96846L9 0.730469Z"
                          fill="#3749E9"
                        />
                        <path
                          d="M8.17054 12.8131C8.08681 12.896 7.97263 12.9423 7.85397 12.9423C7.73531 12.9423 7.62113 12.896 7.5374 12.8131L5.00929 10.3226C4.7469 10.0641 4.7469 9.64516 5.00929 9.38716L5.32587 9.07535C5.58826 8.81691 6.01319 8.81691 6.27558 9.07535L7.85397 10.63L12.119 6.42918C12.3814 6.17074 12.8067 6.17074 13.0687 6.42918L13.3853 6.74099C13.6477 6.99943 13.6477 7.41841 13.3853 7.67641L8.17054 12.8131Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href="#">GameTech Innovations</a>
                      </div>
                      <div className="price">
                        <span className="price-eth">13  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="tf-author style-3">
                    <span className="number">4</span>
                    <div className="image">
                      <img
                        src="assets/images/author/author16.png"
                        alt="Image"
                      />
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0.730469L11.1971 2.96846L14.2901 2.44932L14.7521 5.55132L17.5595 6.94932L16.11 9.73047L17.5595 12.5116L14.7521 13.9096L14.2901 17.0116L11.1971 16.4925L9 18.7305L6.80289 16.4925L3.70993 17.0116L3.24789 13.9096L0.440492 12.5116L1.89 9.73047L0.440492 6.94932L3.24789 5.55132L3.70993 2.44932L6.80289 2.96846L9 0.730469Z"
                          fill="#3749E9"
                        />
                        <path
                          d="M8.17054 12.8131C8.08681 12.896 7.97263 12.9423 7.85397 12.9423C7.73531 12.9423 7.62113 12.896 7.5374 12.8131L5.00929 10.3226C4.7469 10.0641 4.7469 9.64516 5.00929 9.38716L5.32587 9.07535C5.58826 8.81691 6.01319 8.81691 6.27558 9.07535L7.85397 10.63L12.119 6.42918C12.3814 6.17074 12.8067 6.17074 13.0687 6.42918L13.3853 6.74099C13.6477 6.99943 13.6477 7.41841 13.3853 7.67641L8.17054 12.8131Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href="#">Cade Castillo</a>
                      </div>
                      <div className="price">
                        <span className="price-eth">17  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="tf-author style-3">
                    <span className="number">5</span>
                    <div className="image">
                      <img
                        src="assets/images/author/author17.png"
                        alt="Image"
                      />
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0.730469L11.1971 2.96846L14.2901 2.44932L14.7521 5.55132L17.5595 6.94932L16.11 9.73047L17.5595 12.5116L14.7521 13.9096L14.2901 17.0116L11.1971 16.4925L9 18.7305L6.80289 16.4925L3.70993 17.0116L3.24789 13.9096L0.440492 12.5116L1.89 9.73047L0.440492 6.94932L3.24789 5.55132L3.70993 2.44932L6.80289 2.96846L9 0.730469Z"
                          fill="#3749E9"
                        />
                        <path
                          d="M8.17054 12.8131C8.08681 12.896 7.97263 12.9423 7.85397 12.9423C7.73531 12.9423 7.62113 12.896 7.5374 12.8131L5.00929 10.3226C4.7469 10.0641 4.7469 9.64516 5.00929 9.38716L5.32587 9.07535C5.58826 8.81691 6.01319 8.81691 6.27558 9.07535L7.85397 10.63L12.119 6.42918C12.3814 6.17074 12.8067 6.17074 13.0687 6.42918L13.3853 6.74099C13.6477 6.99943 13.6477 7.41841 13.3853 7.67641L8.17054 12.8131Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href="#">Alma Dunn</a>
                      </div>
                      <div className="price">
                        <span className="price-eth">15  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="tf-author style-3">
                    <span className="number">6</span>
                    <div className="image">
                      <img
                        src="assets/images/author/author18.png"
                        alt="Image"
                      />
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0.730469L11.1971 2.96846L14.2901 2.44932L14.7521 5.55132L17.5595 6.94932L16.11 9.73047L17.5595 12.5116L14.7521 13.9096L14.2901 17.0116L11.1971 16.4925L9 18.7305L6.80289 16.4925L3.70993 17.0116L3.24789 13.9096L0.440492 12.5116L1.89 9.73047L0.440492 6.94932L3.24789 5.55132L3.70993 2.44932L6.80289 2.96846L9 0.730469Z"
                          fill="#3749E9"
                        />
                        <path
                          d="M8.17054 12.8131C8.08681 12.896 7.97263 12.9423 7.85397 12.9423C7.73531 12.9423 7.62113 12.896 7.5374 12.8131L5.00929 10.3226C4.7469 10.0641 4.7469 9.64516 5.00929 9.38716L5.32587 9.07535C5.58826 8.81691 6.01319 8.81691 6.27558 9.07535L7.85397 10.63L12.119 6.42918C12.3814 6.17074 12.8067 6.17074 13.0687 6.42918L13.3853 6.74099C13.6477 6.99943 13.6477 7.41841 13.3853 7.67641L8.17054 12.8131Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href="#">Kayla Henry</a>
                      </div>
                      <div className="price">
                        <span className="price-eth">22  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="tf-author style-3">
                    <span className="number">7</span>
                    <div className="image">
                      <img
                        src="assets/images/author/author19.png"
                        alt="Image"
                      />
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0.730469L11.1971 2.96846L14.2901 2.44932L14.7521 5.55132L17.5595 6.94932L16.11 9.73047L17.5595 12.5116L14.7521 13.9096L14.2901 17.0116L11.1971 16.4925L9 18.7305L6.80289 16.4925L3.70993 17.0116L3.24789 13.9096L0.440492 12.5116L1.89 9.73047L0.440492 6.94932L3.24789 5.55132L3.70993 2.44932L6.80289 2.96846L9 0.730469Z"
                          fill="#3749E9"
                        />
                        <path
                          d="M8.17054 12.8131C8.08681 12.896 7.97263 12.9423 7.85397 12.9423C7.73531 12.9423 7.62113 12.896 7.5374 12.8131L5.00929 10.3226C4.7469 10.0641 4.7469 9.64516 5.00929 9.38716L5.32587 9.07535C5.58826 8.81691 6.01319 8.81691 6.27558 9.07535L7.85397 10.63L12.119 6.42918C12.3814 6.17074 12.8067 6.17074 13.0687 6.42918L13.3853 6.74099C13.6477 6.99943 13.6477 7.41841 13.3853 7.67641L8.17054 12.8131Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href="#">Joey Cress</a>
                      </div>
                      <div className="price">
                        <span className="price-eth">12  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="tf-author style-3">
                    <span className="number">8</span>
                    <div className="image">
                      <img
                        src="assets/images/author/author20.png"
                        alt="Image"
                      />
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0.730469L11.1971 2.96846L14.2901 2.44932L14.7521 5.55132L17.5595 6.94932L16.11 9.73047L17.5595 12.5116L14.7521 13.9096L14.2901 17.0116L11.1971 16.4925L9 18.7305L6.80289 16.4925L3.70993 17.0116L3.24789 13.9096L0.440492 12.5116L1.89 9.73047L0.440492 6.94932L3.24789 5.55132L3.70993 2.44932L6.80289 2.96846L9 0.730469Z"
                          fill="#3749E9"
                        />
                        <path
                          d="M8.17054 12.8131C8.08681 12.896 7.97263 12.9423 7.85397 12.9423C7.73531 12.9423 7.62113 12.896 7.5374 12.8131L5.00929 10.3226C4.7469 10.0641 4.7469 9.64516 5.00929 9.38716L5.32587 9.07535C5.58826 8.81691 6.01319 8.81691 6.27558 9.07535L7.85397 10.63L12.119 6.42918C12.3814 6.17074 12.8067 6.17074 13.0687 6.42918L13.3853 6.74099C13.6477 6.99943 13.6477 7.41841 13.3853 7.67641L8.17054 12.8131Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href="#">Emily Peay</a>
                      </div>
                      <div className="price">
                        <span className="price-eth">23  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="tf-author style-3">
                    <span className="number">9</span>
                    <div className="image">
                      <img
                        src="assets/images/author/author21.png"
                        alt="Image"
                      />
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0.730469L11.1971 2.96846L14.2901 2.44932L14.7521 5.55132L17.5595 6.94932L16.11 9.73047L17.5595 12.5116L14.7521 13.9096L14.2901 17.0116L11.1971 16.4925L9 18.7305L6.80289 16.4925L3.70993 17.0116L3.24789 13.9096L0.440492 12.5116L1.89 9.73047L0.440492 6.94932L3.24789 5.55132L3.70993 2.44932L6.80289 2.96846L9 0.730469Z"
                          fill="#3749E9"
                        />
                        <path
                          d="M8.17054 12.8131C8.08681 12.896 7.97263 12.9423 7.85397 12.9423C7.73531 12.9423 7.62113 12.896 7.5374 12.8131L5.00929 10.3226C4.7469 10.0641 4.7469 9.64516 5.00929 9.38716L5.32587 9.07535C5.58826 8.81691 6.01319 8.81691 6.27558 9.07535L7.85397 10.63L12.119 6.42918C12.3814 6.17074 12.8067 6.17074 13.0687 6.42918L13.3853 6.74099C13.6477 6.99943 13.6477 7.41841 13.3853 7.67641L8.17054 12.8131Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href="#">Damon Lynch</a>
                      </div>
                      <div className="price">
                        <span className="price-eth">14 Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="tf-author style-3">
                    <span className="number">10</span>
                    <div className="image">
                      <img
                        src="assets/images/author/author22.png"
                        alt="Image"
                      />
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0.730469L11.1971 2.96846L14.2901 2.44932L14.7521 5.55132L17.5595 6.94932L16.11 9.73047L17.5595 12.5116L14.7521 13.9096L14.2901 17.0116L11.1971 16.4925L9 18.7305L6.80289 16.4925L3.70993 17.0116L3.24789 13.9096L0.440492 12.5116L1.89 9.73047L0.440492 6.94932L3.24789 5.55132L3.70993 2.44932L6.80289 2.96846L9 0.730469Z"
                          fill="#3749E9"
                        />
                        <path
                          d="M8.17054 12.8131C8.08681 12.896 7.97263 12.9423 7.85397 12.9423C7.73531 12.9423 7.62113 12.896 7.5374 12.8131L5.00929 10.3226C4.7469 10.0641 4.7469 9.64516 5.00929 9.38716L5.32587 9.07535C5.58826 8.81691 6.01319 8.81691 6.27558 9.07535L7.85397 10.63L12.119 6.42918C12.3814 6.17074 12.8067 6.17074 13.0687 6.42918L13.3853 6.74099C13.6477 6.99943 13.6477 7.41841 13.3853 7.67641L8.17054 12.8131Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href="#">Terence Cobb</a>
                      </div>
                      <div className="price">
                        <span className="price-eth">11  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="tf-author style-3">
                    <span className="number">11</span>
                    <div className="image">
                      <img
                        src="assets/images/author/author23.png"
                        alt="Image"
                      />
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0.730469L11.1971 2.96846L14.2901 2.44932L14.7521 5.55132L17.5595 6.94932L16.11 9.73047L17.5595 12.5116L14.7521 13.9096L14.2901 17.0116L11.1971 16.4925L9 18.7305L6.80289 16.4925L3.70993 17.0116L3.24789 13.9096L0.440492 12.5116L1.89 9.73047L0.440492 6.94932L3.24789 5.55132L3.70993 2.44932L6.80289 2.96846L9 0.730469Z"
                          fill="#3749E9"
                        />
                        <path
                          d="M8.17054 12.8131C8.08681 12.896 7.97263 12.9423 7.85397 12.9423C7.73531 12.9423 7.62113 12.896 7.5374 12.8131L5.00929 10.3226C4.7469 10.0641 4.7469 9.64516 5.00929 9.38716L5.32587 9.07535C5.58826 8.81691 6.01319 8.81691 6.27558 9.07535L7.85397 10.63L12.119 6.42918C12.3814 6.17074 12.8067 6.17074 13.0687 6.42918L13.3853 6.74099C13.6477 6.99943 13.6477 7.41841 13.3853 7.67641L8.17054 12.8131Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href="#">Clive Schultz</a>
                      </div>
                      <div className="price">
                        <span className="price-eth">10  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                  <div className="tf-author style-3">
                    <span className="number">12</span>
                    <div className="image">
                      <img
                        src="assets/images/author/author24.png"
                        alt="Image"
                      />
                      <svg
                        width="18"
                        height="19"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 0.730469L11.1971 2.96846L14.2901 2.44932L14.7521 5.55132L17.5595 6.94932L16.11 9.73047L17.5595 12.5116L14.7521 13.9096L14.2901 17.0116L11.1971 16.4925L9 18.7305L6.80289 16.4925L3.70993 17.0116L3.24789 13.9096L0.440492 12.5116L1.89 9.73047L0.440492 6.94932L3.24789 5.55132L3.70993 2.44932L6.80289 2.96846L9 0.730469Z"
                          fill="#3749E9"
                        />
                        <path
                          d="M8.17054 12.8131C8.08681 12.896 7.97263 12.9423 7.85397 12.9423C7.73531 12.9423 7.62113 12.896 7.5374 12.8131L5.00929 10.3226C4.7469 10.0641 4.7469 9.64516 5.00929 9.38716L5.32587 9.07535C5.58826 8.81691 6.01319 8.81691 6.27558 9.07535L7.85397 10.63L12.119 6.42918C12.3814 6.17074 12.8067 6.17074 13.0687 6.42918L13.3853 6.74099C13.6477 6.99943 13.6477 7.41841 13.3853 7.67641L8.17054 12.8131Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href="#">Happy Parsons</a>
                      </div>
                      <div className="price">
                        <span className="price-eth">13  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
                        <img src="assets/images/svg/icon-create-5.svg" alt="Image"/>
                    </div>
                    <h6 className="title"><a href="#">API Exploitation</a></h6>
                    <p className="content">Search, explore, and integrate APIs seamlessly, unlocking endless possibilities for your projects and endeavors.</p>
                </div>
            </div>
            <div className="col-lg-3 col-md-6">
                <div className="tf-create wow fadeInUp"  data-wow-delay="0.4s">
                    <div className="icon">
                        <img src="assets/images/svg/icon-create-2.svg" alt="Image"/>
                    </div>
                    <h6 className="title"><a href="#">API Publishing & Management</a> </h6>
                    <p className="content">Welcome to seamless API management! Easily add and update APIs with our intuitive platform.</p>
                </div>
            </div>
            <div className="col-lg-3 col-md-6">
                <div className="tf-create wow fadeInUp"  data-wow-delay="0.6s">
                    <div className="icon">
                        <img src="assets/images/svg/icon-create-6.svg" alt="Image"/>
                    </div>
                    <h6 className="title"><a href="#">API Documentation</a> </h6>
                    <p className="content">Unlock the power of clear documentation! Publish comprehensive API docs effortlessly with our platform.</p>
                </div>
            </div>
            <div className="col-lg-3 col-md-6">
                <div className="tf-create wow fadeInUp"  data-wow-delay="0.8s">
                    <div className="icon">
                        <img src="assets/images/svg/icon-create-9.svg" alt="Image"/>
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

      <script src="assets/js/jquery.min.js"></script>
      <script src="assets/js/jquery.easing.js"></script>
      <script src="assets/js/bootstrap.min.js"></script>
      <script src="assets/js/swiper-bundle.min.js"></script>
      <script src="assets/js/swiper.js"></script>
      <script src="assets/js/count-down.js"></script>
      <script src="assets/js/jquery.isotope.min.js"></script>
      <script src="assets/js/textanimation.js"></script>
      <script src="assets/js/switchmode.js"></script>
      <script src="assets/js/plugin.js"></script>
      <script src="assets/js/shortcodes.js"></script>
      <script src="assets/js/main.js"></script>
    </body>
  );
};

export default HomeSection;