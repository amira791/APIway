import React, { useState, useEffect } from "react";
import APIAjout from "../../Hooks/APIHook.jsx";

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

  const [activeFilter, setActiveFilter] = useState("Daily");
/*   const [Models, setModels] = useState(Models); // Define Models state and setModels function

 */
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
    Recommended: false,
    ratelimit: "1000",
    quotalimit: "",
    quotatype: activeFilter,
    price: "",
    features: "",
  });
  const [editedPlan, setEditedPlan] = useState({
    Name: "",
    id: "",
    modelIndex: "",
    Recommended: false,
    ratelimit: "1000",
    quotalimit: "",
    quotatype: activeFilter,
    price: "",
    features: "",
  });
  const [modificationOn, setModificationOn] = useState(false);
  const { tarifTypes } = APIAjout();
  const handleModelChange = (key, value) => {
    setModel((prevModel) => ({ ...prevModel, [key]: value }));
  };
  const addModel = () => {
    if (!Model.Name || !Model.Description) {
      alert("Please fill in all fields before adding the model.");
      return;
    }
    setModels((prevModels) => [...prevModels, Model]);

    setActiveFilter("Daily");
    setModel({ Name: "", Description: "", Period: activeFilter, plans: [] });
    document.getElementById("model-name").value = "";
    document.getElementById("model-description").value = "";
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
      alert("Please fill in all fields before editing the plan.");
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
        Models[indexModel].plans[planIndex].quotatype = editedPlan.quotatype; // Modify price to "1000"
        Models[indexModel].plans[planIndex].ratelimit = editedPlan.ratelimit; // Modify quotalimit to "100"
        Models[indexModel].plans[planIndex].Recommended =
          editedPlan.Recommended; // Modify price to "1000"
      } else {
        console.log("Plan not found.");
      }
    } else {
      console.log("Model not found or has no plans.");
    }

    setActiveFilter("Daily");
    setEditedPlan({
      Name: "",
      id: "",
      Recommended: false,
      ratelimit: "",
      quotalimit: "",
      quotatype: activeFilter,
      price: "",
      features: "",
    });
    document.getElementById("switch3").checked = false;
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
          alert("Please fill in all fields before adding the plan.");
          return;
        }
      }
      alert("Please fill in all fields before adding the plan.");
      return;
    }
     if(!newPlan.quotatype)
     {
      newPlan.quotatype="Daily";
     }
    setModels((prevModels) => {
      const updatedModels = [...prevModels];
      updatedModels[indexModel].plans.push(newPlan);
      return updatedModels;
    });

    setActiveFilter("Daily");
    setNewPlan({
      Name: "",
      id: "",
      Recommended: false,
      ratelimit: "",
      quotalimit: "",
      quotatype: activeFilter,
      price: "",
      features: "",
    });
    document.getElementById("switch3").checked = false;
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

      setActiveFilter("Daily");
      setEditedPlan({
        Name: "",
        id: "",
        Recommended: false,
        ratelimit: "",
        quotalimit: "",
        quotatype: activeFilter,
        price: "",
        features: "",
      });
      document.getElementById("switch3").checked = false;
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
    setActiveFilter(modifiedPlan.quotatype);
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
        const quotatype =plan.quotatype;
        console.log(quotatype);
        return (
          <a
            href="#"
            data-toggle="modal"
            data-target="#tarif_pop"
            class="tf-button"
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
          <div class="col-ranking product-button" key={index2}>
            <a
              class="tf-button"
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
                <div class="img">
                  <i class="fal fa-plus"></i>
                </div>
              </span>
            </a>
          </div>
        );
      }
    } else {
      return (
        <div class="col-ranking product-button" key={index2}>
          <a
            class="tf-button"
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
              <div class="img">
                <i class="fal fa-plus"></i>
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
    setActiveFilter(filterId);
    handleModelChange("Period", filterId);
  };
  const handlePlanFilterClick = (PlanfilterId) => {
    setActiveFilter(PlanfilterId);
    modificationOn
      ? handlePlanEdit("quotatype", PlanfilterId)
      : handlePlanChange("quotatype", PlanfilterId);
  };
  useEffect(() => {
    console.log("ModificationOn:", modificationOn); // This will log the updated value
    // Perform other actions that rely on the updated state
  }, [modificationOn]);
  useEffect(() => {
    console.log("editedPlan:", editedPlan); // This will log the updated value
    // Perform other actions that rely on the updated state
  }, [editedPlan]);

  const [subscriptionPrice, setSubscriptionPrice] = useState("");
  const [rateLimitEnabled, setRateLimitEnabled] = useState(false);
  const [rateLimit, setRateLimit] = useState("");

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
        class="modal fade popup"
        id="popup_bid"
        tabindex="-1"
        aria-modal="true"
        role="dialog"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body space-y-20 pd-40">
              <h3>Add a new plans model</h3>

              <p class="label-1">Name:</p>
              <input
                type="text"
                id="model-name"
                placeholder="model name"
                onChange={(e) => handleModelChange("Name", e.target.value)}
              />
              <p class="label-1">Description:</p>
              <fieldset class="message">
                <textarea
                  id="model-description"
                  name="message"
                  rows="4"
                  placeholder="Model's description"
                  tabindex="4"
                  aria-required="true"
                  required=""
                  onChange={(e) =>
                    handleModelChange("Description", e.target.value)
                  }
                ></textarea>
              </fieldset>
              <p class="label-1"><i class="fa-solid fa-hourglass-half"></i> Period:</p>
              <div class="row tf-container">
                <div class="col-md-12">
                  <div class="top-menu">
                    <ul className="filter-menu">
                      <li className={activeFilter === "Daily" ? "active" : ""}>
                        <a href="#" onClick={() => handleFilterClick("Daily")}>
                          Daily
                        </a>
                      </li>
                      <li
                        className={activeFilter === "Monthly" ? "active" : ""}
                      >
                        <a
                          href="#"
                          onClick={() => handleFilterClick("Monthly")}
                        >
                          Monthly
                        </a>
                      </li>
                      <li className={activeFilter === "Yearly" ? "active" : ""}>
                        <a href="#" onClick={() => handleFilterClick("Yearly")}>
                          Yearly
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
           <div  style={{display:"flex",alignItems:"center",justifyContent:"flex-end",gap:"15px" }}>
              <a
                href="#"
                class="button-popup"
                data-toggle="modal"
                data-target="#popup_bid_success"
                data-dismiss="modal"

                style={{background:"green",display:"flex",justifyContent:"space-around"}}
                onClick={() => {
                  addModel();
                }}
              >
               <i class="fa-solid fa-check"></i> Confirm
              </a>
              <a
                href="#"
                class="button-popup"
                data-toggle="modal"
                data-target="#popup_bid_success"
                data-dismiss="modal"
                aria-label="Close"
                style={{background:"red",display:"flex",justifyContent:"space-around"}}
              >
              <i class="fa-solid fa-xmark"></i>
                Cancel
              </a></div>
            </div>
          </div>
        </div>
      </div>

      <section class="tf-ranking tf-filter">
        <div class="tf-container">
          <div class="table-ranking">
            <div
              class="title-ranking"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginTop: "3%",
              }}
            >
              <div class="col-ranking">#</div>
              <div class="col-ranking">Model's name</div>
              {tarifTypes.map((plan) => (
                <div key={plan.id} className=" col-ranking">
                  <h6 className="title">
                    <a href="#">{plan.name}</a>
                  </h6>
                </div>
              ))}
            </div>
          </div>
          <div class="table-ranking tf-filter-container">
            {Models.map((model, index) => (
              <div
                key={index} // You need to assign a unique key to each mapped element
                class="content-ranking tf-loadmore 3d anime music"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  marginTop: "3%",
                }}
              >
                <div class="col-ranking">{index + 1}</div>
                <div class="col-ranking">
                
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
        class="modal fade popup"
        id="tarif_pop"
        tabindex="-1"
        aria-modal="true"
        role="dialog"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body space-y-20 pd-40">
              <h3>
                <h3>
                  {modificationOn ? "Edit " : "Add a New "}
                  {modificationOn ? editedPlan.Name : newPlan.Name} Plan
                </h3>
              </h3>

              <p class="label-1">
                Recommended badge:{" "}
                <div class="button-toggle">
                  <input
                    type="checkbox"
                    id="switch3"
                    checked={modificationOn ? editedPlan.Recommended : false}
                    onChange={(e) => {
                      modificationOn
                        ? handlePlanEdit("recommended", e.target.checked)
                        : handlePlanChange("recommended", e.target.checked);
                    }}
                  />
                  <label for="switch3"></label>
                </div>
              </p>
              <p>
                Will have a badge in Hub as “Recommended”. Only one plan might
                have recommended status simultaneously.
              </p>

              <p class="label-1">Quota type:</p>
              <div class="row tf-container">
                <div class="col-md-12">
                  <div class="top-menu">
                    <ul className="filter-menu">
                      <li className={activeFilter === "Daily" ? "active" : ""}>
                        <a
                          href="#"
                          onClick={() => handlePlanFilterClick("Daily")}
                        >
                          Daily
                        </a>
                      </li>

                      {Models[
                        modificationOn
                          ? editedPlan.modelIndex
                          : newPlan.modelIndex
                      ] && (
                        <React.Fragment>
                          {(Models[
                            modificationOn
                              ? editedPlan.modelIndex
                              : newPlan.modelIndex
                          ].Period === "Monthly" ||
                            Models[
                              modificationOn
                                ? editedPlan.modelIndex
                                : newPlan.modelIndex
                            ].Period === "Yearly") && (
                            <li
                              className={
                                activeFilter === "Monthly" ? "active" : ""
                              }
                            >
                              <a
                                href="#"
                                onClick={() => handlePlanFilterClick("Monthly")}
                              >
                                Monthly
                              </a>
                            </li>
                          )}
                          {Models[
                            modificationOn
                              ? editedPlan.modelIndex
                              : newPlan.modelIndex
                          ].Period === "Yearly" && (
                            <li
                              className={
                                activeFilter === "Yearly" ? "active" : ""
                              }
                            >
                              <a
                                href="#"
                                onClick={() => handlePlanFilterClick("Yearly")}
                              >
                                Yearly
                              </a>
                            </li>
                          )}
                        </React.Fragment>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <p class="label-1">Quota Limit :</p>
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
                  {activeFilter === "Yearly"
                    ? "/Year"
                    : activeFilter === "Monthly"
                    ? "/Month"
                    : "/Day"}
                </p>
              </div>

              <p class="label-1">Subscription Price :</p>
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
              <p class="label-1">Features:</p>
              <fieldset class="message">
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
                class="button-popup"
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
              {modificationOn ? <><i class="fa-solid fa-pen"></i></>:<i class="fa-solid fa-check"></i>}
                {modificationOn ? "Edit" : "Confirm"}
              </a>
              <button
                type="button"
                class="button-popup"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setModificationOn(false)}
               style={{background:"red",display:"flex",justifyContent:"space-around"}}
              >
              <i class="fa-solid fa-xmark"></i>
                Cancel
              </button>
              {modificationOn && (
                <button
                  type="button"
                  class="button-popup"
                  data-dismiss="modal"
                  aria-label="Close"
                  style={{backgroundColor:"red"}}
                  onClick={() => deletePlan(editedPlan.modelIndex)}
                >
                <i class="fa-solid fa-trash"></i>
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
        <div class="product-button">
          <a
            href="#"
            data-toggle="modal"
            data-target="#popup_bid"
            class="tf-button"
          >
            {" "}
            <span class="icon-btn-product"><i class="fa-solid fa-file-invoice"></i></span> Add new plans model
          </a>
        </div>
      </div>
      {/* selectedPlan && (
        <div>
          <h4>Selected Plan: {selectedPlan.}</h4>
          <p>Price: ${selectedPlan.price} / month</p>
          {/* You can display more details about the selected plan here *}
        </div>
      ) */}
    </div>
  );
};

export default Monetizing;