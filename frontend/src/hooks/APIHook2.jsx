// Define the custom hook in hooks/useUnite

import API from "../API";
import { useState, useEffect } from "react";
import PlansAjout from "./MonetizationHook";

export default function APIAjout() {

  /*************************************************************************** */
  const addNewAPI = async (
    formData,
    functionalities,
    endpoints,
    Models
  ) => {
    try {
      let apiId = await createAPI(formData);
      await createModels(apiId, Models);
      let functionalityIds = await createFunctionnalities(functionalities);
      let apiversionId = await createAPIVersions(
        apiId,
        functionalityIds
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


  const createAPIVersions = async (apiId, functionalityIds) => {
       try {
      const apiVersionsData = {
        num_version: "1",
        state: "Active",
        api: apiId,
        functions: functionalityIds,
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
  const executeAPI = async (website, endpoint,method,headers,queryparams,body,pathParams,selectedEndpoint) => {
    try {
        const response = await API.post(
            `/api/execute/${encodeURIComponent(website)}/${encodeURIComponent(endpoint)}/`,
            {
                headers:headers|| {},  // Add any necessary headers
                params:queryparams|| {},   // Add any necessary params
                body:body || null  ,  // Add any necessary body
                path_params: pathParams || {},// Add path params here
                method: method,
                selectedEndpoint:selectedEndpoint
            }, {
              headers: {
                "Content-Type": "application/json",             
              },
            }
        );
        const data = response.data;
      /*   console.log(data);
        console.log(data.result.body);
        console.log(data.result.status_code); */
        // Make sure to have a state setter or handler to process the result
       
        return data.result;
    } catch (error) {
        console.error("Error executing API:", error);
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
    executeAPI,
  /*   executeAPI, */
    tarifTypes,
  };
}
