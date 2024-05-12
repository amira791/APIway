import React, { useState, useEffect } from "react";
import APIAjout from "../../hooks/APIHook2.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Monetizing = ({Models ,setModels}) => {
  // State to track the selected plan
  const [selectedPlan, setSelectedPlan] = useState({
    Name: "",
    id: "",
  });
  const [selectedModel, setSelectedModel] = useState({
    Name: "",
    index: "",
  });
  const availablePeriods = ["Daily", "Monthly", "Yearly"];
  const [activeFilter, setActiveFilter] = useState("Daily");
  const [modificationOn, setModificationOn] = useState(false);
  const { tarifTypes } = APIAjout();
  const [subscriptionPrice, setSubscriptionPrice] = useState("");
  const [rateLimitEnabled, setRateLimitEnabled] = useState(false);
  const [rateLimit, setRateLimit] = useState("");
  const [changedPeriod, setchangedPeriod] = useState(false);

  const [Model, setModel] = useState({
    Name: "",
    Description: "",
    Period: activeFilter,
    plans: [],
  });
  const [newPlan, setNewPlan] = useState({
    Name: "",
    id: "",
    modelIndex: "",
    ratelimit: 1000,
    quotalimit: "",
    price: "",
    features: "",
  });
  const [editedPlan, setEditedPlan] = useState({
    Name: "",
    id: "",
    modelIndex: "",
  
    ratelimit: "1000",
    quotalimit: "",
    price: "",
    features: "",
  });

  var filteredPeriods = Models? availablePeriods.filter(
    (period) => !Models.some((model) => model.Period === period)
  ):availablePeriods;
  var isAddButtonDisabled = filteredPeriods.length === 0;
  
  const handleModelChange = (key, value) => {
    //alert("done");
    setModel((prevModel) => ({ ...prevModel, [key]: value }));
  };
  const addModel = () => {
    if (!Model.Name || !Model.Description) {
      toast.error("Please fill in all fields before adding the model.");
      return;
    }
  //  //alert(activeFilter);
    handleModelChange("Period", activeFilter);
    setModels((prevModels) => [...prevModels, Model]);
   ////alert(filteredPeriods[0]);
 setActiveFilter(filteredPeriods[0]);
    setModel({ Name: "", Description: "", Period: activeFilter, plans: [] });
    document.getElementById("model-name").value = "";
    document.getElementById("model-description").value = "";
    setchangedPeriod(false);
    console.log(Models);
  };
  const handlePlanChange = (key, value) => {
    setNewPlan((prevPlan) => ({ ...prevPlan, [key]: value }));
  };
  const handlePlanEdit = (key, value) => {
    setEditedPlan((prevPlan) => ({ ...prevPlan, [key]: value }));
  };
  const modifyPlan = (indexModel, planName) => {
    if (
      !editedPlan.Name ||
      !editedPlan.features ||
      !editedPlan.price ||
      !editedPlan.quotalimit ||
      !editedPlan.ratelimit
    ) {
      toast.error("Please fill in all fields before editing the plan.");
      return;
    }
    const model = Models[indexModel];
    if (model && model.plans) {
      // Find the index of the plan with the name planName
      const planIndex = model.plans.findIndex((plan) => plan.Name === planName);

      // Check if the plan exists
      if (planIndex !== -1) {
        // Modify the properties of the plan
        Models[indexModel].plans[planIndex].quotalimit = editedPlan.quotalimit; // Modify quotalimit to "100"
        Models[indexModel].plans[planIndex].price = editedPlan.price; // Modify price to "1000"
        Models[indexModel].plans[planIndex].features = editedPlan.features; // Modify quotalimit to "100"
         Models[indexModel].plans[planIndex].ratelimit = editedPlan.ratelimit; // Modify quotalimit to "100"
        Models[indexModel].plans[planIndex].Recommended =
          editedPlan.Recommended; // Modify price to "1000"
      } else {
        console.log("Plan not found.");
      }
    } else {
      console.log("Model not found or has no plans.");
    }

    setEditedPlan({
      Name: "",
      id: "",
      ratelimit: "",
      quotalimit: "",
     
      price: "",
      features: "",
    });
    
    const rateLimitInput = document.getElementById("rate-limit");
    if (rateLimitInput) {
      document.getElementById("rate-limit").value = "";
    }
    document.getElementById("quota-limit").value = "";
    document.getElementById("sub-price").value = "";
    document.getElementById("features").value = "";
    setModificationOn(false);
    console.log(Models);
  };
  const addPlan = (indexModel) => {
    if (
      !newPlan.Name ||
      !newPlan.features ||
      !newPlan.price ||
      !newPlan.quotalimit
    ) {
      const rateLimitInput = document.getElementById("rate-limit");
      if (rateLimitInput) {
        if (!newPlan.ratelimit) {
          toast.error("Please fill in all fields before adding the plan.");
          return;
        }
      }
      toast.error("Please fill in all fields before adding the plan.");
      return;
    }
  
    setModels((prevModels) => {
      const updatedModels = [...prevModels];
      updatedModels[indexModel].plans.push(newPlan);
      return updatedModels;
    });

    
    setNewPlan({
      Name: "",
      id: "",
      ratelimit: "",
      quotalimit: "",
      price: "",
      features: "",
    });
  
    document.getElementById("rate-limit").value = "";
    document.getElementById("quota-limit").value = "";
    document.getElementById("sub-price").value = "";
    document.getElementById("features").value = "";
    setRateLimit("");
    setSubscriptionPrice("");
    console.log(Models);
  };
  const deletePlan = (indexModel) => {
    if (window.confirm("Do u really want to delete this plan?")) {
      setModificationOn(false);

      Models[indexModel].plans = Models[indexModel].plans.filter((plan) => {
        return !(plan.Name === editedPlan.Name && plan.id === editedPlan.id);
      });

   
      setEditedPlan({
        Name: "",
        id: "",
        ratelimit: "",
        quotalimit: "",
        price: "",
        features: "",
      });
      
      document.getElementById("rate-limit").value = "";
      document.getElementById("quota-limit").value = "";
      document.getElementById("sub-price").value = "";
      document.getElementById("features").value = "";
      setModificationOn(false);
      console.log(Models);
    }
    setModificationOn(false);
  };
  const activateModification = (modifiedPlan) => {
    setModificationOn(true, () => {
      console.log("ModificationOn:", modificationOn); // This will log the updated value
      // Perform other actions that rely on the updated state
    });
    console.log("the modiffiedblan is");
    console.log(modifiedPlan);
    setEditedPlan(modifiedPlan);

    console.log(editedPlan);
  };
  const checkExistence = (index, planName, type, index2) => {
    // Find the model with the given index
    const model = Models[index];

    // Check if the model exists and has plans
    if (model && model.plans) {
      // Find the plan with the given name
      const plan = model.plans.find((plan) => plan.Name === planName);

      // Check if the plan exists
      if (plan) {
        // Access the 'quotalimit' property of the plan
        const quotalimit = plan.quotalimit;
        const quotatype =  Models[plan.modelIndex
        ].Period
console.log(Models[index].Period);
        console.log(quotatype);
        return (
          <a
            href="#"
            data-toggle="modal"
            data-target="#tarif_pop"
            className="tf-button"
            style={{ textDecorationLine: "underline" }}
            onClick={() => {
              activateModification(plan);
            }}
          >
            
            {quotalimit }   <p>
                  {quotatype === "Yearly"
                    ? "/Year"
                    :quotatype === "Monthly"
                    ? "/Month"
                    : "/Day"}
                </p>
          </a>
        );
      } else {
        return (
          <div className="col-ranking product-button" key={index2}>
            <a
              className="tf-button"
              href="#"
              data-toggle="modal"
              data-target="#tarif_pop"
              onClick={() => {
                setNewPlan({
                  Name: type.name,
                  id: type.id_TypeTarif,
                  modelIndex: index,
                });
                setSelectedModel({
                  Name: Models[index].Name,
                  index: index,
                });
              }}
            >
              <span>
                <div className="img">
                  <i className="fal fa-plus"></i>
                </div>
              </span>
            </a>
          </div>
        );
      }
    } else {
      return (
        <div className="col-ranking product-button" key={index2}>
          <a
            className="tf-button"
            href="#"
            data-toggle="modal"
            data-target="#tarif_pop"
            onClick={() => {
              setNewPlan({
                Name: type.name,
                id: type.id_TypeTarif,
                modelIndex: index,
              });
              setSelectedModel({
                Name: Models[index].Name,
                index: index,
              });
            }}
          >
            <span>
              <div className="img">
                <i className="fal fa-plus"></i>
              </div>
            </span>
          </a>
        </div>
      );
    }
    //return Models[index].plans.some((plan) => plan.Name === planName);
  };
  // Function to handle plan selection
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };
  const handleFilterClick = (filterId) => {
    setchangedPeriod(true);
    setActiveFilter(filterId);
    handleModelChange("Period", filterId);
  };
   
   

  const handleSubscriptionPriceChange = (e) => {
    const price = parseFloat(e.target.value);
    setSubscriptionPrice(price);
    // Enable rate limit if subscription price is greater than 0
    setRateLimitEnabled(price > 0);
  };

  const handleRateLimitCheckboxChange = () => {
    // Toggle rate limit input visibility when checkbox is clicked
    setRateLimitEnabled(!rateLimitEnabled);
    if (!rateLimitEnabled) {
      // Reset rate limit input value when hiding it
      setRateLimit("");
    }
  };
  useEffect(() => {
    console.log("ModificationOn:", modificationOn); // This will log the updated value
    // Perform other actions that rely on the updated state
  }, [modificationOn]);
  useEffect(() => {
    console.log("editedPlan:", editedPlan); // This will log the updated value
    // Perform other actions that rely on the updated state
  }, [editedPlan]);

  useEffect(() => {
    var filteredPeriods = availablePeriods.filter(
    (period) => !Models.some((model) => model.Period === period)
      );
     isAddButtonDisabled = filteredPeriods.length === 0;
    ////alert(isAddButtonDisabled);

    setActiveFilter(filteredPeriods[0]);
    
    }, [Models]);
 

  return (
    <div className="tf-container">
      <div className="row">
        <div className="col-md-12">
          <div className="tf-heading style-2 mb40 wow fadeInUp">
            <h4 className="heading">Choose your plans</h4>
          </div>
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
              <h3>Add a new plans model</h3>

              <p className="label-1">Name:</p>
              <input
                type="text"
                id="model-name"
                placeholder="model name"
                onChange={(e) => handleModelChange("Name", e.target.value)}
              />
              <p className="label-1">Description:</p>
              <fieldset className="message">
                <textarea
                  id="model-description"
                  name="message"
                  rows="4"
                  placeholder="Model's description"
                  tabIndex="4"
                  aria-required="true"
                  required=""
                  onChange={(e) =>
                    handleModelChange("Description", e.target.value)
                  }
                ></textarea>
              </fieldset>
              <p className="label-1"><i className="fa-solid fa-hourglass-half"></i> Period:</p>
              <div className="row tf-container">
                <div className="col-md-12">
                  <div className="top-menu">
                    <ul className="filter-menu">
                      {filteredPeriods.map((period) => (
                <li
                  key={period}
                  className={activeFilter === period ? "active" : ""}
                >
                  <a href="#" onClick={() =>{setchangedPeriod(true); handleFilterClick(period)}}>
                    {period}
                  </a>
                </li>
              ))}
                    </ul>
                  </div>
                </div>
              </div>
           <div  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:"15px" }}>
              <a
                href="#"
                className="button-popup"
                data-toggle="modal"
                data-target="#popup_bid_success"
                data-dismiss="modal"

                style={{background:"green",display:"flex",justifyContent:"space-around"}}
                onClick={() => {
                 if (changedPeriod) {  handleModelChange("Period", filteredPeriods[0])};
    
                  addModel();
                }}
              >

               <i className="fa-solid fa-check"></i> Confirm
              </a>
              <a
                href="#"
                className="button-popup"
                data-toggle="modal"
                data-target="#popup_bid_success"
                data-dismiss="modal"
                aria-label="Close"
                style={{background:"red",display:"flex",justifyContent:"space-around"}}
              >
              <i className="fa-solid fa-xmark"></i>
                Cancel
              </a></div>
            </div>
          </div>
        </div>
      </div>
 <ToastContainer />
      <section className="tf-ranking tf-filter">
        <div className="tf-container">
          <div className="table-ranking">
            <div
              className="title-ranking"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: "3%",
              }}
            >
              <div className="col-ranking">#</div>
              <div className="col-ranking">Model's name</div>
              {tarifTypes.map((plan) => (
                <div key={plan.id} className=" col-ranking">
                  <h6 className="title">
                    <a href="#">{plan.name}</a>
                  </h6>
                </div>
              ))}
            </div>
          </div>
          <div className="table-ranking tf-filter-container">
            {Models.map((model, index) => (
              <div
                key={index} // You need to assign a unique key to each mapped element
                className="content-ranking tf-loadmore 3d anime music"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: "3%",
                }}
              >
                <div className="col-ranking">{index + 1}</div>
                <div className="col-ranking">
                
                  {model.Name}
                </div>

                {tarifTypes.map((type, index2) =>
                  checkExistence(index, type.name, type, index2)
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className="modal fade popup"
        id="tarif_pop"
        tabIndex="-1"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body space-y-20 pd-40">
              
                <h3>
                  {modificationOn ? "Edit " : "Add a New "}
                  {modificationOn ? editedPlan.Name : newPlan.Name} Plan
                </h3>
          

         
              <p className="label-1">Quota Limit :</p>
              <p></p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  id="quota-limit"
                  type="number"
                  defaultValue={modificationOn ? editedPlan.quotalimit : ""}
                  placeholder="Quota limit"
                  onChange={(e) => {
                    modificationOn
                      ? handlePlanEdit("quotalimit", e.target.value)
                      : handlePlanChange("quotalimit", e.target.value);
                  }}
                />
                <p>
                  {Models[newPlan.modelIndex]?
                  
                ( Models[newPlan.modelIndex].Period  === "Yearly"
                    ? "/Year"
                    : Models[newPlan.modelIndex].Period === "Monthly"
                    ? "/Month"
                    : "/Day"):("")
                    
                    }
                </p>
              </div>

              <p className="label-1">Subscription Price :</p>
              <p></p>
              <input
                id="sub-price"
                type="number"
                defaultValue={modificationOn ? editedPlan.price : ""}
                placeholder="Price"
                onChange={(e) => {
                  handleSubscriptionPriceChange(e);
                  modificationOn
                    ? handlePlanEdit("price", e.target.value)
                    : handlePlanChange("price", e.target.value);
                }}
              />
              {rateLimitEnabled ? (
                <div>
                  <p className="label-1">Rate Limit:</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <input
                      id="rate-limit"
                      type="number"
                      value={rateLimit}
                      placeholder="Rate limit"
                      onChange={(e) => {
                        modificationOn
                          ? handlePlanEdit("ratelimit", e.target.value)
                          : handlePlanChange("ratelimit", e.target.value);
                        setRateLimit(e.target.value);
                      }}
                    />
                    <p>requests per hour</p>
                  </div>
                </div>
              ) : (
                <>
                  {" "}
                  <p className="label-1">Rate Limit:</p>{" "}
                  <p>
                    Custom rate limit is enabled for paid plans or plans with
                    overages.
                  </p>
                  <a style={{ textDecorationLine: "underline" }}>
                    {" "}
                    1,000 requests per hour
                  </a>
                </>
              )}

              {subscriptionPrice > 0 && (
                <div>
                  <input
                    type="checkbox"
                    id="rate-limit-checkbox"
                    checked={rateLimitEnabled}
                    onChange={handleRateLimitCheckboxChange}
                  />
                  <label htmlFor="rate-limit-checkbox">Enable Rate Limit</label>
                </div>
              )}
              <p className="label-1">Features:</p>
              <fieldset className="message">
                <textarea
                  id="features"
                  name="message"
                  rows="4"
                  placeholder="The plan's features"
                  tabIndex="4"
                  aria-required="true"
                  defaultValue={modificationOn ? editedPlan.features : ""}
                  required=""
                  onChange={(e) => {
                    modificationOn
                      ? handlePlanEdit("features", e.target.value)
                      : handlePlanChange("features", e.target.value);
                  }}
                ></textarea>
              </fieldset>
                <div  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:"15px" }}>
       
              <a
                href="#"
                className="button-popup"
                data-toggle="modal"
                data-target="#tarif_pop_success"
                data-dismiss="modal"
                style={{background:modificationOn ?"blue":"green"}}
                onClick={() => {
                  modificationOn
                    ? modifyPlan(editedPlan.modelIndex, editedPlan.Name)
                    : addPlan(newPlan.modelIndex);
                }}
              >
              {modificationOn ? <><i className="fa-solid fa-pen"></i></>:<i className="fa-solid fa-check"></i>}
                {modificationOn ? "Edit" : "Confirm"}
              </a>
              <button
                type="button"
                className="button-popup"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setModificationOn(false)}
               style={{background:"red",display:"flex",justifyContent:"space-around"}}
              >
              <i className="fa-solid fa-xmark"></i>
                Cancel
              </button>
              {modificationOn && (
                <button
                  type="button"
                  className="button-popup"
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{backgroundColor:"red"}}
                  onClick={() => deletePlan(editedPlan.modelIndex)}
                >
                <i className="fa-solid fa-trash"></i>
                  Delete
                </button>
              )}
                </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "3%",
        }}
      >
        {/*   <button>Add new plans model</button> */}
       {!isAddButtonDisabled? <div className="product-button">
         <a
          href="#"
          data-toggle="modal"
          data-target="#popup_bid"
          className="tf-button"
        
        >
            {" "}
            <span className="icon-btn-product"><i className="fa-solid fa-file-invoice"></i></span> Add new plans model
          </a>
        </div>:""}
      </div>
     
    </div>
  );
};

export default Monetizing;
