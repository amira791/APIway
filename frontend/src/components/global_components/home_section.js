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
  let publicUrl = process.env.PUBLIC_URL + "/";
  /*   useExternalScript(`${publicUrl}assets/js/jquery-3.7.0.js`);
  useExternalScript(`${publicUrl}assets/js/jquery.dataTables.min.js`);
  useExternalScript(`${publicUrl}assets/js/jquery.easing.js`);
  useExternalScript(`${publicUrl}assets/js/bootstrap.min.js`);
  useExternalScript(`${publicUrl}assets/js/swiper-bundle.min.js`);
  useExternalScript(`${publicUrl}assets/js/swiper.js`);
  useExternalScript(`${publicUrl}assets/js/count-down.js`);
  useExternalScript(`${publicUrl}assets/js/jquery.isotope.min.js`);
  useExternalScript(`${publicUrl}assets/js/switchmode.js`);
  useExternalScript(`${publicUrl}assets/js/plugin.js`);
  useExternalScript(`${publicUrl}assets/js/shortcodes.js`);
  useExternalScript(`${publicUrl}assets/js/main.js`);
 */

  return (
    <body class="body header-fixed home-6">
      <div id="wrapper" class="wrapper-style">
        <div id="page" class="clearfix">
          <Navbar />
          <section class="tf-slider">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-12">
                  <img
                    src="assets/images/slider/bg-slider-2.png"
                    alt="Image"
                    class="img-slider-1"
                  />
                  <div class="swiper-container slider-home ">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide">
                        <div class="slider-item">
                          <div class="tf-slider-item style-6">
                            <div class="content-inner">
                              <h1 class="title">
                                <span class="animationtext clip">
                                  <span class="cd-words-wrapper">
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
                                  
                                  class="tf-button style-6"
                                >
                                 <div >
                            <Link to={"/details/1/"}>Go to</Link>
                        </div>
                                </a>
                              </div>
                            </div>
                            <div class="image ">
                              <div class="slider-card-img">
                                <ul>
                                  <li class="prev2">
                                    <div class="sc-product style1 ">
                                    <div class="top">
                                        <a href="item-details.html" class="tag">
                                          MusicAPI
                                        </a>
                                        <div class="wish-list">
                                          <a href="#" class="heart-icon"></a>
                                        </div>
                                      </div>
                                      <div class="features">
                                        <div class="product-media">
                                          <img
                                            src="assets/images/product/product79.jpg"
                                            alt="images"
                                          />
                                        </div>
                                        <div class="featured-countdown">
                                         
                                        </div>
                                        <div class="rain-drop1">
                                          <img
                                            src="assets/images/icon/rain1.svg"
                                            alt="images"
                                          />
                                        </div>
                                        <div class="rain-drop2">
                                          <img
                                            src="assets/images/icon/rain2.svg"
                                            alt="images"
                                          />
                                        </div>
                                      </div>
                                      <div class="bottom">
                                        <div class="details-product">
                                          <div class="author">
                                            <div class="avatar">
                                              <img
                                                src="assets/images/author/author1.png"
                                                alt="images"
                                              />
                                            </div>
                                            <div class="content">
                                              <div class="position">
                                                Owner
                                              </div>
                                              <div class="name">
                                                {" "}
                                                <a href="#">Magnus Perry</a>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="bid">
                                            <div class="subtitle">
                                              Price
                                            </div>
                                            <div class="price">
                                              <span class="cash">$70.00</span>
                                              <span class="icon">
                                             
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="product-button">
                                          <a
                                            href="#"
                                            data-toggle="modal"
                                            data-target="#popup_bid"
                                            class="tf-button"
                                          >
                                            {" "}
                                            <span class="icon-btn-product"></span>{" "}
                                            Purchase
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li class="prev1">
                                    <div class="sc-product style1 ">
                                      <div class="top">
                                        <a href="item-details.html" class="tag">
                                          TransportationAPI
                                        </a>
                                        <div class="wish-list">
                                          <a href="#" class="heart-icon"></a>
                                        </div>
                                      </div>
                                      <div class="features">
                                        <div class="product-media">
                                          <img
                                            src="assets/images/product/product75.jpg"
                                            alt="images"
                                          />
                                        </div>
                                        <div class="featured-countdown">
                                         
                                        </div>
                                        <div class="rain-drop1">
                                          <img
                                            src="assets/images/icon/rain1.svg"
                                            alt="images"
                                          />
                                        </div>
                                        <div class="rain-drop2">
                                          <img
                                            src="assets/images/icon/rain2.svg"
                                            alt="images"
                                          />
                                        </div>
                                      </div>
                                      <div class="bottom">
                                        <div class="product-button">
                                          <a
                                            href="#"
                                            data-toggle="modal"
                                            data-target="#popup_bid"
                                            class="tf-button"
                                          >
                                            {" "}
                                            <span class="icon-btn-product"></span>{" "}
                                            Purchase
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li class="current">
                                    <div class="sc-product style1 ">
                                    <div class="top">
                                        <a href="item-details.html" class="tag">
                                          WeatherAPI
                                        </a>
                                        <div class="wish-list">
                                          <a href="#" class="heart-icon"></a>
                                        </div>
                                      </div>
                                      <div class="features">
                                        <div class="product-media">
                                          <img
                                            src="assets/images/product/product79.jpg"
                                            alt="images"
                                          />
                                        </div>
                                        <div class="featured-countdown">
                                         
                                        </div>
                                        <div class="rain-drop1">
                                          <img
                                            src="assets/images/icon/rain1.svg"
                                            alt="images"
                                          />
                                        </div>
                                        <div class="rain-drop2">
                                          <img
                                            src="assets/images/icon/rain2.svg"
                                            alt="images"
                                          />
                                        </div>
                                      </div>
                                      <div class="bottom">
                                        <div class="details-product">
                                          <div class="author">
                                            <div class="avatar">
                                              <img
                                                src="assets/images/author/author1.png"
                                                alt="images"
                                              />
                                            </div>
                                            <div class="content">
                                              <div class="position">
                                                Owner
                                              </div>
                                              <div class="name">
                                                {" "}
                                                <a href="#">Magnus Perry</a>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="bid">
                                            <div class="subtitle">
                                              Price
                                            </div>
                                            <div class="price">
                                              <span class="cash">$70.00</span>
                                              <span class="icon">
                                             
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="product-button">
                                          <a
                                            href="#"
                                            data-toggle="modal"
                                            data-target="#popup_bid"
                                            class="tf-button"
                                          >
                                            {" "}
                                            <span class="icon-btn-product"></span>{" "}
                                            Purchase
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li class="next1">
                                    <div class="sc-product style1 ">
                                      <div class="top">
                                        <a href="item-details.html" class="tag">
                                          SportAPI
                                        </a>
                                        <div class="wish-list">
                                          <a href="#" class="heart-icon"></a>
                                        </div>
                                      </div>
                                      <div class="features">
                                        <div class="product-media">
                                          <img
                                            src="assets/images/product/product75.jpg"
                                            alt="images"
                                          />
                                        </div>
                                        <div class="featured-countdown">
                                         
                                        </div>
                                        <div class="rain-drop1">
                                          <img
                                            src="assets/images/icon/rain1.svg"
                                            alt="images"
                                          />
                                        </div>
                                        <div class="rain-drop2">
                                          <img
                                            src="assets/images/icon/rain2.svg"
                                            alt="images"
                                          />
                                        </div>
                                      </div>
                                      <div class="bottom">
                                        <div class="product-button">
                                          <a
                                            href="#"
                                            data-toggle="modal"
                                            data-target="#popup_bid"
                                            class="tf-button"
                                          >
                                            {" "}
                                            <span class="icon-btn-product"></span>{" "}
                                            Purchase
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li class="next2">
                                    <div class="sc-product style1 ">
                                    <div class="top">
                                        <a href="item-details.html" class="tag">
                                         GameAPI
                                        </a>
                                        <div class="wish-list">
                                          <a href="#" class="heart-icon"></a>
                                        </div>
                                      </div>
                                      <div class="features">
                                        <div class="product-media">
                                          <img
                                            src="assets/images/product/product79.jpg"
                                            alt="images"
                                          />
                                        </div>
                                        <div class="featured-countdown">
                                         
                                        </div>
                                        <div class="rain-drop1">
                                          <img
                                            src="assets/images/icon/rain1.svg"
                                            alt="images"
                                          />
                                        </div>
                                        <div class="rain-drop2">
                                          <img
                                            src="assets/images/icon/rain2.svg"
                                            alt="images"
                                          />
                                        </div>
                                      </div>
                                      <div class="bottom">
                                        <div class="details-product">
                                          <div class="author">
                                            <div class="avatar">
                                              <img
                                                src="assets/images/author/author1.png"
                                                alt="images"
                                              />
                                            </div>
                                            <div class="content">
                                              <div class="position">
                                                Owner
                                              </div>
                                              <div class="name">
                                                {" "}
                                                <a href="#">Magnus Perry</a>
                                              </div>
                                            </div>
                                          </div>
                                          <div class="bid">
                                            <div class="subtitle">
                                              Price
                                            </div>
                                            <div class="price">
                                              <span class="cash">$99.99</span>
                                              <span class="icon">
                                             
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div class="product-button">
                                          <a
                                            href="#"
                                            data-toggle="modal"
                                            data-target="#popup_bid"
                                            class="tf-button"
                                          >
                                            {" "}
                                            <span class="icon-btn-product"></span>{" "}
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
          <section class="tf-section tf-category">
                <div class="tf-container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="tf-heading style-4 mb40 wow fadeInUp">
                                <h4 class="heading">All Categories</h4>
                            </div>
                        </div>
                        <div class="col-md-12 wow fadeInUp">
                            <div class="swiper-container product-category ">
                                <div class="swiper-wrapper">
                                  {/*   {categories.map((category) => 
                               <div class="swiper-slide">
                               <div class="slider-item">
                                   <div class="tf-product-category">
                                       <img src="assets/images/product-category/product-category-1.jpg" alt="Image"/>
                                       <div class="category"><a href="#">{category.label}</a></div>
                                   </div>
                               </div>
                           </div>)} *
                                    <div class="swiper-slide">
                                        <div class="slider-item">
                                            <div class="tf-product-category">
                                                <img src="assets/images/product-category/product-category-1.jpg" alt="Image"/>
                                                <div class="category"><a href="#">Digital art</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="slider-item">
                                            <div class="tf-product-category">
                                                <img src="assets/images/product-category/product-category-2.jpg" alt="Image"/>
                                                <div class="category"><a href="#">Style</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="slider-item">
                                            <div class="tf-product-category">
                                                <img src="assets/images/product-category/product-category-3.jpg" alt="Image"/>
                                                <div class="category"><a href="#">Music</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="slider-item">
                                            <div class="tf-product-category">
                                                <img src="assets/images/product-category/product-category-4.jpg" alt="Image"/>
                                                <div class="category"><a href="#">Sport</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="slider-item">
                                            <div class="tf-product-category">
                                                <img src="assets/images/product-category/product-category-1.jpg" alt="Image"/>
                                                <div class="category"><a href="#">Digital art</a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="slider-item">
                                            <div class="tf-product-category">
                                                <img src="assets/images/product-category/product-category-2.jpg" alt="Image"/>
                                                <div class="category"><a href="#">Style</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div> 
                            <div class="swiper-button-next button-product-category-next"></div>
                            <div class="swiper-button-prev button-product-category-prev"></div>     
                        </div>
                    </div>
                </div>
            </section> */}

          <section class="tf-section tf-hot-pick tf-filter">
            <div class="tf-container">
              <div class="row ">
                <div class="col-md-12">
                  <div class="tf-heading style-4 mb26 wow fadeInUp">
                    <h3 class="heading">Hot Sales</h3>
                    <p class="sub-heading">
                      The most purchased APIs - Based on the last 30 days
                    </p>
                  </div>
                </div>
              </div>
              <div class="row tf-filter-container wow fadeInUp">
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d cyber">
                  <div class="sc-product style2">
                    <div class="top">
                      <a href="item-details.html" class="tag">
                        FinanceAPI
                      </a>
                      <div class="wish-list">
                        <a href="#" class="heart-icon"></a>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="details-product">
                        <div class="author">
                          <div class="avatar">
                            <img
                              src="assets/images/author/author1.png"
                              alt="images"
                            />
                          </div>
                          <div class="content">
                            <div class="position">Owner</div>
                            <div class="name">
                              {" "}
                              <a href="#">Financial Solutions Inc.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="features">
                      <div class="product-media">
                        <img
                          src="assets/images/product/product74.jpg"
                          alt="images"
                        />
                      </div>
                      <div class="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div class="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div class="bottom-style2">
                      <div class="price">
                        <div class="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div class="content">
                         
                          <div class="cash">Price: $99.00</div>
                        </div>
                      </div>
                      <div class="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          class="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div class="sc-product style2">
                    <div class="top">
                      <a href="item-details.html" class="tag">
                        WeatherAPI 
                      </a>
                      <div class="wish-list">
                        <a href="#" class="heart-icon"></a>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="details-product">
                        <div class="author">
                          <div class="avatar">
                            <img
                              src="assets/images/author/author14.png"
                              alt="images"
                            />
                          </div>
                          <div class="content">
                            <div class="position">Owner</div>
                            <div class="name">
                              {" "}
                              <a href="#">Weather Solutions </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="features">
                      <div class="product-media">
                        <img
                          src="assets/images/product/product75.jpg"
                          alt="images"
                        />
                      </div>
                      <div class="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div class="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div class="bottom-style2">
                      <div class="price">
                        <div class="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div class="content">
                         
                          <div class="cash">Price: $70.99</div>
                        </div>
                      </div>
                      <div class="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          class="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div class="sc-product style2">
                    <div class="top">
                      <a href="item-details.html" class="tag">
                        Health API
                      </a>
                      <div class="wish-list">
                        <a href="#" class="heart-icon"></a>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="details-product">
                        <div class="author">
                          <div class="avatar">
                            <img
                              src="assets/images/author/author14.png"
                              alt="images"
                            />
                          </div>
                          <div class="content">
                            <div class="position">Owner</div>
                            <div class="name">
                              {" "}
                              <a href="#">Health Solutions Inc.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="features">
                      <div class="product-media">
                        <img
                          src="assets/images/product/product71.jpg"
                          alt="images"
                        />
                      </div>
                      <div class="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div class="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div class="bottom-style2">
                      <div class="price">
                      <div class="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                    </div>
                        <div class="content">
                         
                          <div class="cash">Price: $61.99</div>
                        </div>
                      </div>
                      <div class="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          class="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div class="sc-product style2">
                    <div class="top">
                      <a href="item-details.html" class="tag">
                        MusicAPI
                      </a>
                      <div class="wish-list">
                        <a href="#" class="heart-icon"></a>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="details-product">
                        <div class="author">
                          <div class="avatar">
                            <img
                              src="assets/images/author/author1.png"
                              alt="images"
                            />
                          </div>
                          <div class="content">
                            <div class="position">Owner</div>
                            <div class="name">
                              {" "}
                              <a href="#">Music Solutions Ltd.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="features">
                      <div class="product-media">
                        <img
                          src="assets/images/product/product70.jpg"
                          alt="images"
                        />
                      </div>
                      <div class="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div class="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div class="bottom-style2">
                      <div class="price">
                        <div class="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div class="content">
                         
                          <div class="cash">Price: $87.99</div>
                        </div>
                      </div>
                      <div class="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          class="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div class="sc-product style2">
                    <div class="top">
                      <a href="item-details.html" class="tag">
                        TravelAPI
                      </a>
                      <div class="wish-list">
                        <a href="#" class="heart-icon"></a>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="details-product">
                        <div class="author">
                          <div class="avatar">
                            <img
                              src="assets/images/author/author4.png"
                              alt="images"
                            />
                          </div>
                          <div class="content">
                            <div class="position">Owner</div>
                            <div class="name">
                              {" "}
                              <a href="#">Travel Solutions LLC.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="features">
                      <div class="product-media">
                        <img
                          src="assets/images/product/product72.jpg"
                          alt="images"
                        />
                      </div>
                      <div class="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div class="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div class="bottom-style2">
                      <div class="price">
                        <div class="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div class="content">
                         
                          <div class="cash">Price: $75.99</div>
                        </div>
                      </div>
                      <div class="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          class="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div class="sc-product style2">
                    <div class="top">
                      <a href="item-details.html" class="tag">
                        SocialAPI
                      </a>
                      <div class="wish-list">
                        <a href="#" class="heart-icon"></a>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="details-product">
                        <div class="author">
                          <div class="avatar">
                            <img
                              src="assets/images/author/author5.png"
                              alt="images"
                            />
                          </div>
                          <div class="content">
                            <div class="position">Owner</div>
                            <div class="name">
                              {" "}
                              <a href="#">Social Solutions Inc.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="features">
                      <div class="product-media">
                        <img
                          src="assets/images/product/product73.jpg"
                          alt="images"
                        />
                      </div>
                      <div class="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div class="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div class="bottom-style2">
                      <div class="price">
                        <div class="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div class="content">
                         
                          <div class="cash">Price: $80.99</div>
                        </div>
                      </div>
                      <div class="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          class="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div class="sc-product style2">
                    <div class="top">
                      <a href="item-details.html" class="tag">
                        E-commerceAPI
                      </a>
                      <div class="wish-list">
                        <a href="#" class="heart-icon"></a>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="details-product">
                        <div class="author">
                          <div class="avatar">
                            <img
                              src="assets/images/author/author7.png"
                              alt="images"
                            />
                          </div>
                          <div class="content">
                            <div class="position">Owner</div>
                            <div class="name">
                              {" "}
                              <a href="#">E-commerce Solutions Ltd.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="features">
                      <div class="product-media">
                        <img
                          src="assets/images/product/product77.jpg"
                          alt="images"
                        />
                      </div>
                      <div class="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div class="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div class="bottom-style2">
                      <div class="price">
                        <div class="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div class="content">
                         
                          <div class="cash">Price: $70.99</div>
                        </div>
                      </div>
                      <div class="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          class="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div class="sc-product style2">
                    <div class="top">
                      <a href="item-details.html" class="tag">
                        SecurityAPI
                      </a>
                      <div class="wish-list">
                        <a href="#" class="heart-icon"></a>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="details-product">
                        <div class="author">
                          <div class="avatar">
                            <img
                              src="assets/images/author/author14.png"
                              alt="images"
                            />
                          </div>
                          <div class="content">
                            <div class="position">Owner</div>
                            <div class="name">
                              {" "}
                              <a href="#">Security Solutions Inc.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="features">
                      <div class="product-media">
                        <img
                          src="assets/images/product/product78.jpg"
                          alt="images"
                        />
                      </div>
                      <div class="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div class="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div class="bottom-style2">
                      <div class="price">
                        <div class="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div class="content">
                         
                          <div class="cash">Price: $70.99</div>
                        </div>
                      </div>
                      <div class="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          class="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div class="sc-product style2">
                    <div class="top">
                      <a href="item-details.html" class="tag">
                        FitnessAPI
                      </a>
                      <div class="wish-list">
                        <a href="#" class="heart-icon"></a>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="details-product">
                        <div class="author">
                          <div class="avatar">
                            <img
                              src="assets/images/author/author19.png"
                              alt="images"
                            />
                          </div>
                          <div class="content">
                            <div class="position">Owner</div>
                            <div class="name">
                              {" "}
                              <a href="#">Fitness Tracker Inc.</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="features">
                      <div class="product-media">
                        <img
                          src="assets/images/product/product71.jpg"
                          alt="images"
                        />
                      </div>
                      <div class="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div class="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div class="bottom-style2">
                      <div class="price">
                        <div class="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div class="content">
                         
                          <div class="cash">Price: $70.99</div>
                        </div>
                      </div>
                      <div class="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          class="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div class="sc-product style2">
                    <div class="top">
                      <a href="item-details.html" class="tag">
                        FoodAPI
                      </a>
                      <div class="wish-list">
                        <a href="#" class="heart-icon"></a>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="details-product">
                        <div class="author">
                          <div class="avatar">
                            <img
                              src="assets/images/author/author14.png"
                              alt="images"
                            />
                          </div>
                          <div class="content">
                            <div class="position">Owner</div>
                            <div class="name">
                              {" "}
                              <a href="#">Foodie Tech Solutions</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="features">
                      <div class="product-media">
                        <img
                          src="assets/images/product/product77.jpg"
                          alt="images"
                        />
                      </div>
                      <div class="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div class="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div class="bottom-style2">
                      <div class="price">
                        <div class="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div class="content">
                         
                          <div class="cash">Price: $60.99</div>
                        </div>
                      </div>
                      <div class="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          class="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div class="sc-product style2">
                    <div class="top">
                      <a href="item-details.html" class="tag">
                        GamingAPI
                      </a>
                      <div class="wish-list">
                        <a href="#" class="heart-icon"></a>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="details-product">
                        <div class="author">
                          <div class="avatar">
                            <img
                              src="assets/images/author/author12.png"
                              alt="images"
                            />
                          </div>
                          <div class="content">
                            <div class="position">Owner</div>
                            <div class="name">
                              {" "}
                              <a href="#">GameTech Innovations</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="features">
                      <div class="product-media">
                        <img
                          src="assets/images/product/product70.jpg"
                          alt="images"
                        />
                      </div>
                      <div class="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div class="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div class="bottom-style2">
                      <div class="price">
                        <div class="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div class="content">
                         
                          <div class="cash">Price: $120.99</div>
                        </div>
                      </div>
                      <div class="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          class="tf-button"
                        >
                          {" "}
                          Purchase
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 tf-loadmore 3d pixel">
                  <div class="sc-product style2">
                    <div class="top">
                      <a href="item-details.html" class="tag">
                        TransportationAPI
                      </a>
                      <div class="wish-list">
                        <a href="#" class="heart-icon"></a>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="details-product">
                        <div class="author">
                          <div class="avatar">
                            <img
                              src="assets/images/author/author10.png"
                              alt="images"
                            />
                          </div>
                          <div class="content">
                            <div class="position">Owner</div>
                            <div class="name">
                              {" "}
                              <a href="#">TransitTech Solutions</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="features">
                      <div class="product-media">
                        <img
                          src="assets/images/product/product73.jpg"
                          alt="images"
                        />
                      </div>
                      <div class="rain-drop1">
                        <img src="assets/images/icon/rain1.svg" alt="images" />
                      </div>
                      <div class="rain-drop2">
                        <img src="assets/images/icon/rain2.svg" alt="images" />
                      </div>
                    </div>
                    <div class="bottom-style2">
                      <div class="price">
                        <div class="icon">
                        <img src="assets/images/svg/coinbase.svg" alt="Image"/>
                        </div>
                        <div class="content">
                         
                          <div class="cash">Price: $100.99</div>
                        </div>
                      </div>
                      <div class="product-button">
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#popup_bid"
                          class="tf-button"
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

          <section class="tf-section tf-top-seller">
            <div class="tf-container">
              <div class="row wow fadeInUp">
                <div class="col-md-12">
                  <div class="tf-heading style-4 mb44 ">
                    <h3 class="heading">Top Providers</h3>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6">
                  <div class="tf-author style-3">
                    <span class="number">1</span>
                    <div class="image">
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
                    <div class="content">
                      <div class="title">
                        <a href="#">TransitTech Solutions</a>
                      </div>
                      <div class="price">
                        <span class="price-eth">10  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6">
                  <div class="tf-author style-3">
                    <span class="number">2</span>
                    <div class="image">
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
                    <div class="content">
                      <div class="title">
                        <a href="#">E-commerce Solutions </a>
                      </div>
                      <div class="price">
                        <span class="price-eth">8  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6">
                  <div class="tf-author style-3">
                    <span class="number">3</span>
                    <div class="image">
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
                    <div class="content">
                      <div class="title">
                        <a href="#">GameTech Innovations</a>
                      </div>
                      <div class="price">
                        <span class="price-eth">13  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6">
                  <div class="tf-author style-3">
                    <span class="number">4</span>
                    <div class="image">
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
                    <div class="content">
                      <div class="title">
                        <a href="#">Cade Castillo</a>
                      </div>
                      <div class="price">
                        <span class="price-eth">17  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-lg-4 col-md-6">
                  <div class="tf-author style-3">
                    <span class="number">5</span>
                    <div class="image">
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
                    <div class="content">
                      <div class="title">
                        <a href="#">Alma Dunn</a>
                      </div>
                      <div class="price">
                        <span class="price-eth">15  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6">
                  <div class="tf-author style-3">
                    <span class="number">6</span>
                    <div class="image">
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
                    <div class="content">
                      <div class="title">
                        <a href="#">Kayla Henry</a>
                      </div>
                      <div class="price">
                        <span class="price-eth">22  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6">
                  <div class="tf-author style-3">
                    <span class="number">7</span>
                    <div class="image">
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
                    <div class="content">
                      <div class="title">
                        <a href="#">Joey Cress</a>
                      </div>
                      <div class="price">
                        <span class="price-eth">12  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6">
                  <div class="tf-author style-3">
                    <span class="number">8</span>
                    <div class="image">
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
                    <div class="content">
                      <div class="title">
                        <a href="#">Emily Peay</a>
                      </div>
                      <div class="price">
                        <span class="price-eth">23  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6">
                  <div class="tf-author style-3">
                    <span class="number">9</span>
                    <div class="image">
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
                    <div class="content">
                      <div class="title">
                        <a href="#">Damon Lynch</a>
                      </div>
                      <div class="price">
                        <span class="price-eth">14 Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6">
                  <div class="tf-author style-3">
                    <span class="number">10</span>
                    <div class="image">
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
                    <div class="content">
                      <div class="title">
                        <a href="#">Terence Cobb</a>
                      </div>
                      <div class="price">
                        <span class="price-eth">11  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6">
                  <div class="tf-author style-3">
                    <span class="number">11</span>
                    <div class="image">
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
                    <div class="content">
                      <div class="title">
                        <a href="#">Clive Schultz</a>
                      </div>
                      <div class="price">
                        <span class="price-eth">10  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-4 col-md-6">
                  <div class="tf-author style-3">
                    <span class="number">12</span>
                    <div class="image">
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
                    <div class="content">
                      <div class="title">
                        <a href="#">Happy Parsons</a>
                      </div>
                      <div class="price">
                        <span class="price-eth">13  Shared APIs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="tf-section tf-create-and-sell">
    <div class="tf-container">
        <div class="row">
            <div class="col-md-12">
                <div class="tf-heading style-2 mb40 wow fadeInUp">
                    <h4 class="heading"> Our Marketplace Services</h4>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="tf-create wow fadeInUp"  data-wow-delay="0.2s">
                    <div class="icon">
                        <img src="assets/images/svg/icon-create-5.svg" alt="Image"/>
                    </div>
                    <h6 class="title"><a href="#">API Exploitation</a></h6>
                    <p class="content">Search, explore, and integrate APIs seamlessly, unlocking endless possibilities for your projects and endeavors.</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="tf-create wow fadeInUp"  data-wow-delay="0.4s">
                    <div class="icon">
                        <img src="assets/images/svg/icon-create-2.svg" alt="Image"/>
                    </div>
                    <h6 class="title"><a href="#">API Publishing & Management</a> </h6>
                    <p class="content">Welcome to seamless API management! Easily add and update APIs with our intuitive platform.</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="tf-create wow fadeInUp"  data-wow-delay="0.6s">
                    <div class="icon">
                        <img src="assets/images/svg/icon-create-6.svg" alt="Image"/>
                    </div>
                    <h6 class="title"><a href="#">API Documentation</a> </h6>
                    <p class="content">Unlock the power of clear documentation! Publish comprehensive API docs effortlessly with our platform.</p>
                </div>
            </div>
            <div class="col-lg-3 col-md-6">
                <div class="tf-create wow fadeInUp"  data-wow-delay="0.8s">
                    <div class="icon">
                        <img src="assets/images/svg/icon-create-9.svg" alt="Image"/>
                    </div>
                    <h6 class="title"><a href="#">API Testing & Monitoring</a></h6>
                    <p class="content">Seamlessly test functionality, performance, and reliability to guarantee a smooth user experience.</p>
                </div>
            </div>
        </div>
    </div>
</section>

   <Footer/>
        </div>
      </div>

      <div
        class="modal fade popup"
        id="popup_bid"
        tabindex="-1"
        aria-modal="true"
        role="dialog"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body space-y-20 pd-40">
              <h3>Place a Bid</h3>
              <p class="text-center sub-heading">
                You must bid a least{" "}
                <span class="price color-popup">4.89 ETH</span>
              </p>
              <input type="text" class="form-control" placeholder="00.00 ETH" />
              <p class="label-1">
                Enter quantity. <span class="color-popup">5 available</span>
              </p>
              <input
                type="text"
                class="form-control quantity form-bottom"
                value="1"
              />
              <div class="d-flex justify-content-between detail-1">
                <p> You must bid at least:</p>
                <p class="text-right price color-popup"> 4.89 ETH </p>
              </div>
              <div class="d-flex justify-content-between detail-2">
                <p> Service free:</p>
                <p class="text-right price color-popup"> 0,89 ETH </p>
              </div>
              <div class="d-flex justify-content-between detail-3">
                <p> Total bid amount:</p>
                <p class="text-right price color-popup"> 4 ETH </p>
              </div>
              <a
                href="#"
                class="button-popup"
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