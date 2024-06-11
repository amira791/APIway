// Define the custom hook in hooks/useUnite
import API from "../API";
import { useState } from "react";

export default function PlansAjout() {
  const addApiModels = (apiId, Models) => {
    // Iterate over the Models array
    Models.forEach((model) => {
      // Step 1: Add Model Information
      API.post(
        `/pricing_model/`,
        {
          name: model.Name,
          period: model.Period,
          description: model.Description,
          api: apiId, // Include api_id
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
       /*  .then((response) => response.json()) */
        .then((response) => {
          // Step 2: Retrieve Model ID
          const modelId = response.data.id_model;
       //alert("doneee");
       //alert(modelId);
          // Step 3: Add Plans
          model.plans.forEach((plan) => {
            API.post(`/tarifications/`, {
                price: plan.price,
                recommended: false,
                features: plan.features,
                quota_limit: plan.quotalimit,
                
                type: plan.id,
                pricingModel: modelId,
           
            },{
              headers: {
                "Content-Type": "application/json",
              },
            }
          
          )
             /*  .then((response) => response.json()) */
              .then((planData) => {
                console.log(
                  `Plan "${plan.Name}" added with ID ${planData.data.id_tarif}`
                );
              })
              .catch((error) =>
                console.error("Error adding plan:", error)
              );
          });
        })
        .catch((error) => console.error("Error adding model:", error));
    });
  };

  return {
    addApiModels,
  };
}
