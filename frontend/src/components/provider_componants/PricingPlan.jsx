import React, { useState } from 'react';
const allPricingData = [
    {
      type: 'Daily',
      tarifications: [
        { name: 'Basic', price: '$10/day', features: ['Feature 1', 'Feature 2', 'Feature 3'], quota: 100, rate: 10 },
        { name: 'Premium', price: '$20/day', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], quota: 200, rate: 20 },
        { name: 'Ultra', price: '$30/day', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'], quota: 300, rate: 30 },
        // Add more tarifications for Daily plan if needed
      ]
    },
    {
      type: 'Monthly',
      tarifications: [
        { name: 'Basic', price: '$100/month', features: ['Feature 1', 'Feature 2', 'Feature 3'], quota: 1000, rate: 100 },
        { name: 'Premium', price: '$200/month', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], quota: 2000, rate: 200 },
        { name: 'Ultra', price: '$300/month', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'], quota: 3000, rate: 300 },
        // Add more tarifications for Monthly plan if needed
      ]
    },
    {
      type: 'Yearly',
      tarifications: [
        { name: 'Basic', price: '$1000/year', features: ['Feature 1', 'Feature 2', 'Feature 3'], quota: 10000, rate: 1000 },
        { name: 'Premium', price: '$2000/year', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'], quota: 20000, rate: 2000 },
        { name: 'Ultra', price: '$3000/year', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'], quota: 30000, rate: 3000 },
        // Add more tarifications for Yearly plan if needed
      ]
    },
    // Add more plans here if needed
  ];
  
const PricingMenu = ({ allPricingData, onSelect }) => {
    const [activeType, setActiveType] = useState(allPricingData[0].type);
  
    const handleTypeClick = (type) => {
      setActiveType(type);
      onSelect(type);
    };
  
    return (
      <div className="top-menu">
        <ul className="filter-menu">
          {allPricingData.map(({ type }) => (
            <li key={type} className={activeType === type ? "active" : ""}>
              <a href="#" onClick={() => handleTypeClick(type)}>
                {type}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  const PricingPlan = ({ type, tarifications }) => (
    <>
    
    <div className="pricing-plan">
      <div className="tarifications">
        {tarifications.map((tarif, index) => (
        
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 "  key={index}>
                            <div class="sc-product style2" >
                                <div class="top" style={{display:"flex",alignContent:"center",justifyContent:"center"}}>
                                    <a href="item-details.html" class="price" style={{fontSize:"30px"}}>{tarif.name}</a>
                                   
                                </div>
                              {/*   <div class="bottom">
                                    <div class="details-product">
                                        <div class="author">
                                            <div class="content">
                                                <div class="position">Creator</div>
                                                <div class="name"> <a href="#">Sirena May</a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div class="features">
                                <ul className="feature-list">
            {tarif.features.map((feature, index) => (
              <li key={index}>
                <span className="bullet-point">&#8226;</span> {feature}
              </li>
            ))}
          </ul>
                                </div>
                                <div class="bottom-style2" style={{paddingBottom:"6%",fontSize:"25px"}}>
                                <div class="price">
                                             <div class="content">
                                  <div class="cash">Quota Limit: {tarif.quota}/{type}</div>
                                        </div>
                                    </div>
                                    <div class="price">
                                             <div class="content">
                                  <div class="cash">Rate Limit: {tarif.rate}/hour</div>
                                        </div>
                                    </div>
                                    </div>
                                <div class="bottom-style2">
                                    <div class="price">
                                             <div class="content">
                                  <div class="cash">{tarif.price}</div>
                                        </div>
                                    </div>
                                    <div class="product-button">
                                        <a href="#" data-toggle="modal" data-target="#popup_bid" class="tf-button"> Purchase</a>
                                    </div>
                                </div>

                            </div>
                        </div>
         
        ))}
      </div>
    </div>
    </>
  );
  
  const PricingContainer = () => {
    const [selectedType, setSelectedType] = useState(allPricingData[0].type);
  
    const handleTypeSelect = (type) => {
      setSelectedType(type);
    };
  
    const selectedPricing = allPricingData.find(({ type }) => type === selectedType);
  
    return (
      <div className="pricing-container">
        <PricingMenu allPricingData={allPricingData} onSelect={handleTypeSelect} />
        <PricingPlan type={selectedPricing.type} tarifications={selectedPricing.tarifications} />
      </div>
    );
  };
  
  export default PricingContainer;