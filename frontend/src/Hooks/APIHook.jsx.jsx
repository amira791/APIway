// Define the custom hook in hooks/useUnite

import API from "../API";

export default function APIAjout() {
  const addNewAPI = (formData, functionalities, baseLinks, endpoints) => {
    let apiId;

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
          // API data posted successfully
          const apiId = response.data.id_api; // Save the ID of the newly created API

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
              externalDocURL: endpoint.externalDocUrl,
              externalDocDescription: endpoint.externalDocDescription,

            }).then((endpointResponse) => {
              alert("done2");
              if (endpointResponse.status === 201) {
                const endpointId = endpointResponse.data.id_endpoint; // Save the ID of the newly created API endpoint

                // Create headers
                const headersData = endpoint.headers.map((header) => ({
                  key: header.key,
                  type_id: header.type,
                  example_value: header.value,
                  required: header.required,
                  endpoint: endpointId,
                }));
                const headersPromises = headersData.map((headerData) =>
                  API.post(`/apiheaders/`, headerData)
                );
                alert("done3");
                // Create query parameters
                const queryParamsData = endpoint.queryParams.map(
                  (queryParam) => ({
                    key: queryParam.key,
                    type_id: queryParam.type,
                    example_value: queryParam.example_value,
                    endpoint: endpointId,
                  })
                );
                const queryParamsPromises = queryParamsData.map(
                  (queryParamData) => API.post(`/apiquery/`, queryParamData)
                );
                alert("done4");
                // Create endpoint body
                const bodyData = endpoint.body;
                const bodyDataToSend = {
                  media_type: bodyData.mediaType,
                  payload_name: bodyData.payloadName,
                  payload_description: bodyData.payloadValue,
                  body_example: bodyData.bodyExample,
                  endpoint: endpointId,
                };
                const bodyPromise = API.post(
                  `/apiendpointbody/`,
                  bodyDataToSend
                );
                alert("done5");
                // Create endpoint parameters
                const paramsData = endpoint.params.map((param) => ({
                  id_endpoint: endpointId,
                  name: param.name,
                  type_id: param.type,
                  required: param.required,
                  deleted: false,
                }));
                const paramsPromises = paramsData.map((paramData) =>
                  API.post(`/endpoint_parameter/`, paramData)
                );
                alert("done6");
                // Execute all promises
                return Promise.all([
                  ...headersPromises,
                  ...queryParamsPromises,
                  bodyPromise,
                  ...paramsPromises,
                ]);
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

  return {
    addNewAPI,
  };
}
