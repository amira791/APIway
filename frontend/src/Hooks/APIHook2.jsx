// Define the custom hook in hooks/useUnite

import API from "../API";
import { useState, useEffect } from "react";
import PlansAjout from "./MonetizationHook";

export default function APIAjout() {
  /*  const addNewAPI2 = async (
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
          //alert(Models);
          Models.forEach((model) => {
            //alert("foreachh");
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
             /*  .then((response) => response.json()) 
              .then((response) => {
                // Step 2: Retrieve Model ID
                const modelId = response.data.id_model;
             //alert("doneee");
             //alert(modelId);
                // Step 3: Add Plans
                model.plans.forEach((plan) => {
                  API.post(`/tarifications/`, {
                      price: plan.price,
                      features: plan.features,
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
                   /*  .then((response) => response.json()) 
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
                state: "Alpha",
                api: apiId,
                functions: functionalityIds,
                base_links: baseLinkIds,
              };
              //alert("done1");
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
              group:endpoint.group
               }).then((endpointResponse) => {
              //alert("done2");
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
                //  //alert(param.name +" "+param.type+" "+param.required)
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
        //alert("Endpoints created successfully!");
      })
      .catch((error) => {
        console.error("Error:", error); // Handle error
      });
  }; */

  /*************************************************************************** */
  const addNewAPI = async (
    formData,
    functionalities,
    baseLinks,
    endpoints,
    Models
  ) => {
    try {
      let apiId = await createAPI(formData);
      await createModels(apiId, Models);
      let functionalityIds = await createFunctionnalities(functionalities);
      let baseLinkIds = await createBaseLinks(baseLinks);
      let apiversionId = await createAPIVersions(
        apiId,
        functionalityIds,
        baseLinkIds
      );
      await createEndpoints(apiversionId, endpoints);
      alert("API created successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error creating API:", error);
      // Handle error
    }
  };

  const createAPI = async (formData) => {
    if (formData.categoryId === null) {
      const categoryId = await createCategory(formData.category);
      formData.categoryId = categoryId;
    }
    const response = await API.post(
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
    );
    if (response.status !== 201) {
      throw new Error("Failed to create API");
    }
    return response.data.id_api;
  };

  const createCategory = async (categoryLabel) => {
    try {
      const response = await API.post(`/apicategories/`, {
        label: categoryLabel,
      });
      return response.data.id_category;
    } catch (error) {
      console.error("Error creating new category:", error);
      throw error;
    }
  };

  const createModels = async (apiId, models) => {
    try {
      // Logic to create models
      for (const model of models) {
        const modelResponse = await API.post(
          `/pricing_model/`,
          {
            name: model.Name,
            period: model.Period,
            description: model.Description,
            api: apiId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const modelId = modelResponse.data.id_model;
        for (const plan of model.plans) {
          await API.post(
            `/tarifications/`,
            {
              price: plan.price,
              recommended: false,
              features: plan.features,
              quota_limit: plan.quotalimit,
              rate_limit: plan.ratelimit || 1000,
              type: plan.id,
              pricingModel: modelId,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((planData) => {
              console.log(
                `Plan "${plan.Name}" added with ID ${planData.data.id_tarif}`
              );
            })
            .catch((error) => console.error("Error adding plan:", error));
        }
      }
    } catch (error) {
      console.error("Error creating models:", error);
      throw error;
    }
  };

  const createFunctionnalities = async (functionnalities) => {
    try {
      const functionalityResponses = await Promise.all(
        functionnalities.map(async (functName) => {
          const response = await API.post(`/functionnalities/`, { functName });
          return response.data.id_funct;
        })
      );
      return functionalityResponses;
    } catch (error) {
      console.error("Error creating functionnalities:", error);
      throw error;
    }
  };

  const createBaseLinks = async (baseLinks) => {
    try {
      const baseLinkResponses = await Promise.all(
        baseLinks.map(async (url) => {
          const response = await API.post(`/baselink/`, { url });
          return response.data.baselink_id;
        })
      );
      return baseLinkResponses;
    } catch (error) {
      console.error("Error creating base links:", error);
      throw error;
    }
  };
  const createAPIVersions = async (apiId, functionalityIds, baseLinkIds) => {
    // Check if baseLinkIds is empty and set base_links accordingly
    const base_links = baseLinkIds.length > 0 ? baseLinkIds : [];
    try {
      const apiVersionsData = {
        num_version: "1",
        state: "Active",
        api: apiId,
        functions: functionalityIds,
        base_links: base_links,
      };
      const response = await API.post(`/apiversions/`, apiVersionsData);
      return response.data.id_version;
    } catch (error) {
      console.error("Error creating API versions:", error);
      throw error;
    }
  };
  const createEndpoints = async (apiVersionId, endpoints) => {
    try {
      const endpointPromises = endpoints.map(async (endpoint) => {
        const endpointResponse = await API.post(`/apiendpoints/`, {
          title: endpoint.name,
          method: endpoint.method,
          path: endpoint.path,
          version: apiVersionId,
          description: endpoint.description,
          group: endpoint.group,
        });
        const endpointId = endpointResponse.data.id_endpoint;

        const paramsPromise = createParams(
          endpointResponse,
          endpointId,
          endpoint.params
        );
        const headersPromise = createHeaders(
          endpointResponse,
          endpointId,
          endpoint.headers
        );
        const queryParamsPromise = createQueryParams(
          endpointResponse,
          endpointId,
          endpoint.queryParams
        );
        const bodyPromise = createBody(endpointResponse, endpointId, endpoint);
        const responseExamplesPromise = createResponseExamples(
          endpointResponse,
          endpointId,
          endpoint.responseExamples
        );

        const allPromises = [
          headersPromise,
          queryParamsPromise,
          bodyPromise,
          paramsPromise,
          responseExamplesPromise,
        ];

        return executeAllPromises(allPromises);
      });
      return Promise.all(endpointPromises);
    } catch (error) {
      console.error("Error creating endpoints:", error);
      throw error;
    }
  };

  const createHeaders = (endpointResponse, endpointId, headers) => {
    if (headers) {
      const headersData = headers.map((header) => ({
        key: header.key,
        example_value: header.value,
        required: header.required,
        endpoint: endpointId,
      }));
      return Promise.all(
        headersData.map((headerData) => API.post(`/apiheaders/`, headerData))
      );
    }
    return Promise.resolve();
  };

  const createQueryParams = (endpointResponse, endpointId, queryParams) => {
    if (queryParams) {
      const queryParamsData = queryParams.map((queryParam) => ({
        key: queryParam.key,
        type_id: queryParam.type,
        example_value: queryParam.value,
        required:queryParam.required,
        endpoint: endpointResponse.data.id_endpoint,
      }));
      return Promise.all(
        queryParamsData.map((queryParamData) =>
          API.post(`/apiquery/`, queryParamData)
        )
      );
    }
    return Promise.resolve();
  };

  const createBody = (endpointResponse, endpointId, endpoint) => {
    let body = endpoint.body;

    if (body && body.payloadName && body.payloadValue && body.bodyExample) {
      const bodyDataToSend = {
        media_type: body.mediaType,
        payload_name: body.payloadName,
        payload_description: body.payloadValue,
        body_example: body.bodyExample,
        endpoint: endpointId,
      };
      console.log("Body data to send:", bodyDataToSend); // Check if bodyDataToSend is constructed correctly

      return API.post(`/apiendpointbody/`, bodyDataToSend);
    }
    return Promise.resolve();
  };

  const createParams = (endpointResponse, endpointId, params) => {
    if (params) {
      const paramsData = params.map((param) => ({
        id_endpoint: endpointResponse.data.id_endpoint,
        name: param.name,
        type_id: param.type,
        example_value: param.value,
        required: param.required,
        deleted: false,
      }));
      //alert(endpointResponse.data.id_endpoint);
      return Promise.all(
        paramsData.map((paramData) =>
          API.post(`/endpoint_parameter/`, paramData)
        )
      );
    }
    return Promise.resolve();
  };

  const createResponseExamples = (
    endpointResponse,
    endpointId,
    responseExamples
  ) => {
    if (responseExamples) {
      const responseExamplesData = responseExamples.map((example) => ({
        code_status: example.codeStatus,
        title: example.exampleName,
        body: example.responseBody,
        id_endpoint: endpointResponse.data.id_endpoint,
      }));
      //alert(endpointId);
      return Promise.all(
        responseExamplesData.map((exampleData) =>
          API.post(`/responseexample/`, exampleData)
        )
      );
    }
    return Promise.resolve();
  };

  const executeAllPromises = (allPromises) => {
    return Promise.all(allPromises)
      .then(() => {
        console.log("All promises are resolved.");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };
  const fetchAPIDetailsById = async (id) => {
    try {
      const response = await API.get(`/apis/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  const fetchAPICategorysById = async (id) => {
    try {
      const response = await API.get(`/apicategories/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  const fetchAPIProviderById = async (id) => {
    try {
      const response = await API.get(`/fournisseurs/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  const fetchAllAPIVersionsById = async (id) => {
    try {
      const response = await API.get("/apiversions/");
      const allApiVersions = response.data;

      // Filter API versions by the provided API ID
      const apiVersionsByApiId = allApiVersions.filter(
        (apiVersion) => apiVersion.api == id && apiVersion.state !== "Draft"
      );

      return apiVersionsByApiId;
    } catch (error) {
      console.error("Error fetching API versions by API ID:", error);
      throw error;
    }
  };
  const fetchAPIVersionsInfoById = async (id) => {
    try {
      const response = await API.get(`/apiversions/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  const fetchAPIEndpointsByVersion = async (versionId) => {
    try {
      // Make the API call to fetch endpoints
      const response = await API.get("/apiendpoints/");

      // Check if the response is valid and contains data
      if (response && response.data) {
        //alert(versionId);
        // Filter endpoints by versionId
        const endpointsByVersionId = response.data.filter(
          (endpoint) => endpoint.version == versionId
        );

        // Log filtered endpoints for debugging
        console.log("Filtered endpoints:", endpointsByVersionId);

        return endpointsByVersionId;
      } else {
        // Log error if response is invalid or empty
        console.error("Empty or invalid response:", response);
        return [];
      }
    } catch (error) {
      // Handle API call errors
      console.error("Error fetching API endpoints:", error);
      throw error.response ? error.response.data : error.message;
    }
  };
  const fetchAllFunctionalitiesById = async (functionIds) => {
    try {
      if (functionIds) {
        // Fetch all functionalities
        const promises = functionIds.map((id) =>
          API.get(`/functionnalities/${id}/`)
        );

        // Wait for all promises to resolve
        const responses = await Promise.all(promises);

        // Extract the data from each response
        const functionalities = responses.map((response) => response.data);

        return functionalities;
      } else {
        return "No functionalities provieded";
      }
    } catch (error) {
      console.error("Error fetching functionalities:", error);
      throw error;
    }
  };

  const fetchAPIHeadersByEndpointId = async (endpointId) => {
    try {
      const response = await API.get(`/apiheaders/`);
      const allHeaders = response.data;
      const headersByEndpointId = allHeaders.filter(
        (header) => header.endpoint === endpointId
      );
      console.log("Fetched headers by endpointId:", headersByEndpointId);
      return headersByEndpointId;
    } catch (error) {
      console.error("Error fetching API headers:", error);
      throw error.response ? error.response.data : error.message;
    }
  };

  const fetchAPIQueryParamsByEndpointId = async (endpointId) => {
    try {
      const response = await API.get(`/apiquery/`);
      const allQueryParams = response.data;
      const queryParamsByEndpointId = allQueryParams.filter(
        (queryParam) => queryParam.endpoint === endpointId
      );
      console.log(
        "Fetched query parameters by endpointId:",
        queryParamsByEndpointId
      );
      return queryParamsByEndpointId;
    } catch (error) {
      console.error("Error fetching API query parameters:", error);
      throw error.response ? error.response.data : error.message;
    }
  };

  const fetchAPIEndpointBodyByEndpointId = async (endpointId) => {
    try {
      const response = await API.get(`/apiendpointbody/`);
      const allEndpointBodies = response.data;
      const endpointBodyByEndpointId = allEndpointBodies.find(
        (endpointBody) => endpointBody.endpoint == endpointId
      );
      console.log(
        "Fetched endpoint body by endpointId:",
        endpointBodyByEndpointId
      );
      return endpointBodyByEndpointId;
    } catch (error) {
      console.error("Error fetching API endpoint body:", error);
      throw error.response ? error.response.data : error.message;
    }
  };

  const fetchAPIResponseExamplesByEndpointId = async (endpointId) => {
    try {
      const response = await API.get(`/responseexample/`);
      const allResponseExamples = response.data;
      const responseExamplesByEndpointId = allResponseExamples.filter(
        (responseExample) => responseExample.id_endpoint === endpointId
      );
      console.log(
        "Fetched response examples by endpointId:",
        responseExamplesByEndpointId
      );
      return responseExamplesByEndpointId;
    } catch (error) {
      console.error("Error fetching API response examples:", error);
      throw error.response ? error.response.data : error.message;
    }
  };

  const fetchEndpointParametersByEndpointId = async (endpointId) => {
    try {
      const response = await API.get(`/endpoint_parameter/`);
      const allEndpointParameters = response.data;
      const endpointParametersByEndpointId = allEndpointParameters.filter(
        (parameter) => parameter.id_endpoint === endpointId
      );
      console.log(
        "Fetched endpoint parameters by endpointId:",
        endpointParametersByEndpointId
      );
      return endpointParametersByEndpointId;
    } catch (error) {
      console.error("Error fetching endpoint parameters:", error);
      throw error.response ? error.response.data : error.message;
    }
  };

  const fetchAPIModelsById = async (id) => {
    try {
      // Make the API call to fetch endpoints
      const response = await API.get("/pricing_model/");

      // Check if the response is valid and contains data
      if (response && response.data) {
        //alert(versionId);
        // Filter endpoints by versionId
        const modelsByApiId = response.data.filter(
          (model) => model.api == id && model.is_active == true
        );

        // Log filtered endpoints for debugging
        console.log("Filtered models:", modelsByApiId);
        return modelsByApiId;
      } else {
        // Log error if response is invalid or empty
        console.error("Empty or invalid response:", response);
        return [];
      }
    } catch (error) {
      // Handle API call errors
      console.error("Error fetching API endpoints:", error);
      throw error.response ? error.response.data : error.message;
    }
  };
  const fetchAPITarifByModelId = async () => {
    try {
      // Make the API call to fetch endpoints
      const response = await API.get("/tarifications/");

      // Check if the response is valid and contains data
      if (response && response.data) {
        return response.data;
      } else {
        // Log error if response is invalid or empty
        console.error("Empty or invalid response:", response);
        return [];
      }
    } catch (error) {
      // Handle API call errors
      console.error("Error fetching API endpoints:", error);
      throw error.response ? error.response.data : error.message;
    }
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
  return {
    addNewAPI,
    getTarifType,
    fetchAPIDetailsById,
    fetchAPICategorysById,
    fetchAPIProviderById,
    fetchAllAPIVersionsById,
    fetchAPIEndpointsByVersion,
    fetchAPIHeadersByEndpointId,
    fetchAPIQueryParamsByEndpointId,
    fetchAPIEndpointBodyByEndpointId,
    fetchAPIResponseExamplesByEndpointId,
    fetchEndpointParametersByEndpointId,
    fetchAPIModelsById,
    fetchAPITarifByModelId,
    fetchAllFunctionalitiesById,
    fetchAPIVersionsInfoById,
    tarifTypes,
  };
}
