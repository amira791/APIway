// Define the custom hook in hooks/useUnite
import API from "../API";
import { useState } from "react";

export default function PlansAjout() {
  const addApiModels = (idApi, Models) => {
    // Iterate over the Models array
    Models.forEach((model) => {
      // Step 1: Add Model Information
      API.post(
        `pricing_model/`,
        {
          name: model.Name,
          period: model.Period,
          description: model.Description,
          api_id: idApi, // Include api_id
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((modelData) => {
          // Step 2: Retrieve Model ID
          const modelId = modelData.id;

          // Step 3: Add Plans
          model.plans.forEach((plan) => {
            fetch("tarifications/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                price: plan.price,
                recommended: false,
                features: plan.features,
                quota_type: plan.quotatype,
                quota_limit: plan.quotalimit,
                rate_limit: plan.ratelimit || null,
                type_id: plan.id,
                pricingModel_id: modelId,
              }),
            })
              .then((response) => response.json())
              .then((planData) => {
                console.log(`Plan "${plan.Name}" added with ID ${planData.id}`);
              })
              .catch((error) => console.error("Error adding plan:", error));
          });
        })
        .catch((error) => console.error("Error adding model:", error));
    });
  };

  return {
    addApiModels,
  };
}
