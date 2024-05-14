import React, { useState,useEffect } from 'react';
import APIAjout from '../../hooks/APIHook2';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';

  
const PricingMenu = ({ allPricingData, onSelect }) => {
    const [activeType, setActiveType] = useState(allPricingData[0].type);
  
    const handleTypeClick = (type) => {
      setActiveType(type);
      onSelect(type);
    };
    
    return (
      <div className="top-menu">
        <ul className="filter-menu">
        {allPricingData
    .slice()  // Create a shallow copy to avoid mutating the original array
    .sort((a, b) => a.type.localeCompare(b.type))  // Sort alphabetically based on type
    .map(({ type }) => (
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
        
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 "  key={index} style={{gap:"3%"}}>
                            <div class="sc-product style2 pricing" >
                                <div class="top" style={{display:"flex",alignContent:"center",justifyContent:"center"}}>
                                    <a href="item-details.html" class="price" style={{fontSize:"30px",marginBottom:"10%"}}>{tarif.name}</a>
                                   
                                </div>
                             
                                <div class="features">
                                <div class="price">
                                             <div class="content">
                                  <div class="cash" style={{paddingBottom:"6%"}}> The plan's features:  </div>
                                    </div>
                                   
                                </div>
                                <ul className="feature-list">
            {tarif.features}
          </ul>
                                </div>
                                <div className="bottom-style2" style={{paddingBottom:"6%",fontSize:"25px"}}>
                                <div className="price">
                                             <div className="content">
                                  <div className="cash">Quota Limit: {tarif.quota}/{type}</div>
                                        </div>
                                    </div>
                                    <div className="price">
                                             <div className="content">
                                  <div className="cash">Rate Limit: {tarif.rate}/hour</div>
                                        </div>
                                    </div>
                                    </div>
                                <div className="bottom-style2">
                                    <div className="price">
                                             <div className="content">
                                  <div className="cash">Price: {tarif.price} DA</div>
                                        </div>
                                    </div>
                                   
                                </div>
                                <div className="content" style={{marginTop:"4%"}}>
                                <div className="cash">          
 <div className="product-button">
  <Link to={`/payment/${tarif.id}`}>Purchase</Link>
                                        {/* <a href="#" data-toggle="modal"  className="tf-button"> Purchase id is {tarif.id}</a> */}
                                    </div>
                                    </div>
                                     </div>
                            </div>
                        </div>
         
        ))}
      </div>
    </div>
    </>
  );
  
  const PricingContainer = ({id,tarifs}) => {
    const [pricingData, setPricingData] = useState([]);
    const [selectedType, setSelectedType] = useState();
    const {  fetchAPIModelsById,
      fetchAPITarifByModelId } = APIAjout();
    
      const { tarifTypes } = APIAjout();

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch models and tariffs data separately
          const modelsResponse = await fetchAPIModelsById(id);
          const tariffsResponse = await fetchAPITarifByModelId();
      
          // Combine models and tariffs data
          const combinedData = modelsResponse.map((model) => {
            const tarifications = tariffsResponse.filter((tarif) => tarif.pricingModel === model.id_model)
            .map((tarif) => {
              var type = tarifs.find((type) => type.id_TypeTarif == tarif.type);
            
              return {
                id:tarif.id_tarif,
                name: type ? type.name : "Unknown",
                price: tarif.price,
                features: tarif.features.split(','), // Assuming features are stored as a comma-separated string
                quota: tarif.quota_limit,
                rate: tarif.rate_limit,
              };
            });
            
            return {
              type: model.period,
              tarifications: tarifications,
            };
          });
      
          // Group the combined data by type (period)
          const groupedData = combinedData.reduce((acc, curr) => {
            if (!acc[curr.type]) {
              acc[curr.type] = [];
            }
            acc[curr.type] = acc[curr.type].concat(curr.tarifications);
            return acc;
          }, {});
      
          // Convert groupedData object to an array
          const pricingArray = Object.entries(groupedData).map(([type, tarifications]) => ({
            type,
            tarifications,
          }));
      
          // Set the pricing data in state
          setPricingData(pricingArray);
          setSelectedType(pricingArray[0]?.type || "");
          console.log(pricingData);
        } catch (error) {
          console.error('Error fetching pricing data:', error);
        }
      };
      
  
      fetchData();
     console.log(pricingData);
    }, []);
    useEffect(() => {
      console.log(pricingData); // This will log the updated pricingData whenever it changes
      pricingData[0]?  setSelectedType(pricingData[0].type):setSelectedType("");
    }, [pricingData]); // useEffect will be triggered whenever pricingData changes
    useEffect(() => {
      console.log(tarifTypes); // This will log the updated pricingData whenever it changes
       }, [tarifTypes]); //
    const handleTypeSelect = (type) => {
      setSelectedType(type);
    };
 
    const selectedPricing = pricingData.find(({ type }) => type === selectedType);
    if (!selectedPricing ) {
      return <div>Loading  plans...</div>;
    } 
    return (

      <div className="pricing-container">
        <div className="pricing-container">
         <PricingMenu allPricingData={pricingData} onSelect={handleTypeSelect} />
        <PricingPlan type={selectedPricing.type} tarifications={selectedPricing.tarifications} />
      </div>
       
      </div>
    );
  
  };
  
  export default PricingContainer;