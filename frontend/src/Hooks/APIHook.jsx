// Define the custom hook in hooks/useUnite
import { useState, useEffect} from "react";
import API from "../API";
import PlansAjout from "./MonetizationHook";

export default function APIAjout() {


  const addNewAPI = async (
    formData,
    functionalities,
    baseLinks,
    endpoints,
    Models
  ) => {
    let apiId;

    const { addApiModels } = PlansAjout();
    if (formData.categoryId === null) {
      // Create a new category
      try {
        const response = await API.post(`/apicategories/`, {
          label: formData.category, // Assuming the new category label is stored in formData.category.label
        });
        formData.categoryId = response.data.id_category; // Assuming the newly created category ID is returned in response.data.id
      } catch (error) {
        console.error("Error creating new category:", error);
        // Handle error
        return; // Exit the function if there's an error creating the category
      }
    }
    API.post(
      `/apis/`,
      {
        api_name: formData.apiName,
        description: formData.description,
        terms_of_use: formData.termOfUse,
        logo: formData.logo,
        visibility: formData.visibility,
        provider: formData.providerId,
        category: formData.categoryId,
        website: formData.website,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((response) => {
        if (response.status === 201) {
          apiId = response.data.id_api;
          alert(Models);
          Models.forEach((model) => {
            alert("foreachh");
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
             alert("doneee");
             alert(modelId);
                // Step 3: Add Plans
                model.plans.forEach((plan) => {
                  API.post(`/tarifications/`, {
                      price: plan.price,
                      recommended: false,
                      features: plan.features,
                      quota_type: plan.quotatype,
                      quota_limit: plan.quotalimit,
                      rate_limit: plan.ratelimit || null,
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
          // Check if functionalities list is empty
          if (functionalities.length === 0) {
            throw new Error("Functionality list must not be empty");
          }

          // Step 2: Post each functionality data individually
          return Promise.all(
            functionalities.map((functName) =>
              API.post(`/functionnalities/`, { functName })
            )
          ).then((functionalityResponses) => {
            // Get IDs of all posted functionalities
            const functionalityIds = functionalityResponses.map(
              (response) => response.data.id_funct
            );

            // Check if baseLinks list is empty
            if (baseLinks.length === 0) {
              throw new Error("Base links list must not be empty");
            }

            // Step 3: Post each base link data individually
            return Promise.all(
              baseLinks.map((url) => API.post(`/baselink/`, { url }))
            ).then((baseLinkResponses) => {
              // Get IDs of all posted base links
              const baseLinkIds = baseLinkResponses.map(
                (response) => response.data.baselink_id
              );

              // Step 4: Post API versions data with the API ID, functionality IDs, and base link IDs
              const apiVersionsData = {
                num_version: 1,
                state: "Active",
                api: apiId,
                functions: functionalityIds,
                base_links: baseLinkIds,
                current: 1
              };
              alert("done1");
              return API.post(`/apiversions/`, apiVersionsData);
            });
          });
        } else {
          throw new Error("Failed to post API data");
        }
      })
      .then((response) => {
        if (response.status === 201) {
          const apiversionId = response.data.id_version;
          // Post each endpoint data individually
          const endpointPromises = endpoints.map((endpoint) => {
            return API.post(`/apiendpoints/`, {
              title: endpoint.name,
              method: endpoint.method,
              link: endpoint.path,
              version: apiversionId, // You need to set the version here
              description: endpoint.description,
            }).then((endpointResponse) => {
              alert("done2");
              if (endpointResponse.status === 201) {
                const endpointId = endpointResponse.data.id_endpoint; // Save the ID of the newly created API endpoint
                if (endpoint.headers) {
                  const headersData = endpoint.headers.map((header) => ({
                    key: header.key,
                    type_id: header.type,
                    example_value: header.value,
                    required: header.required,
                    endpoint: endpointId,
                  }));
                  var headersPromises = headersData.map((headerData) =>
                    API.post(`/apiheaders/`, headerData)
                  );
                }

                if (endpoint.queryParams) {
                  const queryParamsData = endpoint.queryParams.map(
                    (queryParam) => ({
                      key: queryParam.key,
                      type_id: queryParam.type,
                      example_value: queryParam.example_value,
                      endpoint: endpointId,
                    })
                  );
                  var queryParamsPromises = queryParamsData.map(
                    (queryParamData) => API.post(`/apiquery/`, queryParamData)
                  );
                }

                if (
                  endpoint.body.payload_name &&
                  endpoint.body.payloadValue &&
                  endpoint.body.payloadValue.bodyExample
                ) {
                  const bodyData = endpoint.body;
                  const bodyDataToSend = {
                    media_type: bodyData.mediaType,
                    payload_name: bodyData.payloadName,
                    payload_description: bodyData.payloadValue,
                    body_example: bodyData.bodyExample,
                    endpoint: endpointId,
                  };
                  var bodyPromise = API.post(
                    `/apiendpointbody/`,
                    bodyDataToSend
                  );
                }

                if (endpoint.params) {
                //  alert(param.name +" "+param.type+" "+param.required)
                  const paramsData = endpoint.params.map((param) => ({
                    id_endpoint: endpointId,
                    name: param.name,
                    type_id: param.type,
                    example_value:param.value,
                    required: param.required,
                    deleted: false,
                  }));
                  var paramsPromises = paramsData.map((paramData) =>
                    API.post(`/endpoint_parameter/`, paramData)
                  );
                }
                if (endpoint.responseExamples) {
                  const responseExamplesData = endpoint.responseExamples.map((example) => ({
                    code_status:example.codeStatus,
                    title: example.exampleName,
                    body: example.responseBody,
                    id_endpoint: endpointId,
                  }));
                
                  // Create an array of promises for posting response examples
                  var responseExamplesPromises = responseExamplesData.map((exampleData) =>
                    API.post(`/responseexample/`, exampleData)
                  );}
                // Filter out promises based on conditions
                const allPromises = [
                  ...(headersPromises ? headersPromises : []),
                  ...(queryParamsPromises ? queryParamsPromises : []),
                  ...(bodyPromise ? [bodyPromise] : []),
                  ...(paramsPromises ? paramsPromises : []),
                  ...(responseExamplesPromises ? responseExamplesPromises : []),
                ];

                // Execute all promises
                return Promise.all(allPromises)
                  .then(() => {
                    // Do something after all promises are resolved
                    console.log("All promises are resolved.");
                    // Additional actions here
                  })
                  .catch((error) => {
                    // Handle errors if any of the promises fail
                    console.error("An error occurred:", error);
                    // Additional error handling here
                  });
              } else {
                throw new Error("Failed to post API endpoint data");
              }
            });
          });

          return Promise.all(endpointPromises);
        } else {
          throw new Error("Failed to post API versions data");
        }
      })
      .then((responses) => {
        // Handle successful creation of endpoints
        alert("Endpoints created successfully!");
      })
      .catch((error) => {
        console.error("Error:", error); // Handle error
      });
  };
  const [tarifTypes, setTarifTypes] = useState([]);

  const getTarifType = () => {
    API.get(`/types_tarif/`)
      .then((res) => {
        console.log(res.data);
        setTarifTypes(res.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getTarifType();
  }, []);

  const updateAPI = (apiId, formData) => {
    const requestData = new FormData();
    requestData.append('description', formData.description);
    requestData.append('website', formData.website);
    requestData.append('terms_of_use', formData.termOfUse);
    requestData.append('category', formData.categoryId);
    requestData.append('visibility', formData.visibility);
    if (formData.logo instanceof File) {
      requestData.append('logo', formData.logo);
    }

    API.put(`/apis/${apiId}/`, requestData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    .then((response) => {
        console.log(response);
        console.log("API updated successfully");
    })
    .catch((error) => {
        console.log(error);
        console.log("Failed to update API");
    });
};

  
  return {
    addNewAPI,
    updateAPI,
    getTarifType,
    tarifTypes,
  };
}
