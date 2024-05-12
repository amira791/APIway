import { useState, useEffect} from "react";
import API from "../API";
import { toast } from 'react-toastify';
export default function ManipulateVersion() {

  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getAPIversions = (apiId) =>  {
    setLoading(true);
    API.get(`/apiversions/`).then((res) =>
      {
        setVersions(res.data.filter(apiversion => apiversion.api === apiId));
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const updateVersionState = (version, newState) => {
    // Check if the version is current and the new state is Draft or Deprecated
    const isCurrentAndDraftOrDeprecated = version.current && (newState === 'Draft' || newState === 'Deprecated');
    
    // Prepare the data to be sent in the API request
    const requestData = isCurrentAndDraftOrDeprecated ? { state: newState, current: 0 } : { state: newState };

    API.put(`/apiversions/${version.id_version}/`, requestData)
    .then((response) => {
        console.log(response);
        console.log("state updated successfully");
    })
    .catch(error => {
        console.error('Error updating version state:', error);
    });
  };
  const updateCurrentVersion = (version, isCurrent) => {

    API.put(`/apiversions/${version.id_version}/`, {current: isCurrent})
    .then((response) => {
        console.log(response);
        console.log("current version updated successfully");
    })
    .catch(error => {
        console.error('Error updating current version:', error);
    });
  };
  const checkIfVersionExists = async (apiId, num_version) => {
    try {
      const response = await API.get(`/apiversions/?api=${apiId}`);
      const versions = response.data;
      return versions.some((version) => version.num_version === num_version);
    } catch (error) {
      console.error("Error checking if version exists:", error);
      return false;
    }
  };
  const checkIfCurrentVersionExists = async (apiId) => {
    try {
      const response = await API.get(`/apiversions/?api=${apiId}`);
      const Activeversions = response.data.filter((v) => v.state === 'Active');
      console.log("activeVersionscheck",Activeversions);
      const currentVersion = Activeversions.find((version) => version.current == 1);
      console.log("curr",currentVersion);
      return { exists: !!currentVersion, currentVersion };
    } catch (error) {
        console.error("Error checking if current version exists:", error);
        return { exists: false, currentVersion: null };
    }
  };
  /*const addVersion = async (
    formData,
    functionalities,
    baseLinks = [],
    endpoints,
  ) => {

  
    console.log("funct3",functionalities);
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
        console.log("Fids", functionalityIds);
      
         Check if baseLinks list is empty
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
          console.log("CurrentForm:",formData.current)
          if(formData.current == 1){
            console.log("CurrentForm in IF")
            // Check if there's already a current version
            return checkIfCurrentVersionExists(formData.api).then(({ exists, currentVersion }) => {
              console.log("CurrentForm in check")
              // Update the current version to not be current if there is one
              console.log("CurrentFVersionInHook",currentVersion)
              console.log("EXISTS",exists)
              if (exists && currentVersion) {
                console.log("CurrentFVersionInHook",currentVersion.id_version)
                console.log("CurrentForm in IF2")
                return API.patch(`/apiversions/${currentVersion.id_version}/`, { current: 0 }).then(() => {
                  // Continue with adding the new version as current
                  const versionData = {
                    num_version: formData.num_version,
                    state: formData.state,
                    api: formData.api,
                    functions: functionalityIds,
                    base_links: baseLinkIds,
                    current: 1
                  };
                  return API.post(`/apiversions/`, versionData);
                });
              } else {
                // No current version found, add the new version as current
                const versionData = {
                  num_version: formData.num_version,
                  state: formData.state,
                  api: formData.api,
                  functions: functionalityIds,
                  base_links: baseLinkIds,
                  current: 1
                };
                return API.post(`/apiversions/`, versionData);
              }
            });
         }else {
            console.log("CurrentForm in ELSE")
            const versionData = {
              num_version: formData.num_version,
              state: formData.state,
              api: formData.api,
              functions: functionalityIds,
              base_links: baseLinkIds,
              current: formData.state === "Active" ? formData.current : 0
            };
            return API.post(`/apiversions/`, versionData);
         }
        });
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
                  console.log("endpointParam",endpoint.params);
                  if (endpoint.params) {
                    console.log("dkhl if params");
                  
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

  };*/
  const addVersion = async (formData, functionalities, baseLinks, endpoints) => {
  
    const functionalityIds = await postFunctionalities(functionalities);
  
    let baseLinkIds = [];
    
    baseLinkIds = await postBaseLinks(baseLinks);
    
  
    const versionData = await handleCurrentVersion(formData, functionalityIds, baseLinkIds);
  
    const apiversionId = await postVersion(versionData);
  
    await postEndpoints(apiversionId, endpoints);
  
    alert("Endpoints created successfully!");
  };
  
  const postFunctionalities = async (functionalities) => {
    const functionalityResponses = await Promise.all(
      functionalities.map((functName) => API.post(`/functionnalities/`, { functName }))
    );
    return functionalityResponses.map((response) => response.data.id_funct);
  };
  
  const postBaseLinks = async (baseLinks) => {
    const baseLinkResponses = await Promise.all(
      baseLinks.map((url) => API.post(`/baselink/`, { url }))
    );
    return baseLinkResponses.map((response) => response.data.baselink_id);
  };
  
  const handleCurrentVersion = async (formData, functionalityIds, baseLinkIds) => {
    if (formData.current == 1) {
      const { exists, currentVersion } = await checkIfCurrentVersionExists(formData.api);
      if (exists && currentVersion) {
        await API.patch(`/apiversions/${currentVersion.id_version}/`, { current: 0 });
      }
    }
    // Check if baseLinkIds is empty and set base_links accordingly
     const base_links = baseLinkIds.length > 0 ? baseLinkIds : [];
    return {
      num_version: formData.num_version,
      state: formData.state,
      api: formData.api,
      functions: functionalityIds,
      base_links: base_links,
      current: formData.current == 1 ? 1 : 0
    };
  };
  
  const postVersion = async (versionData) => {
    const response = await API.post(`/apiversions/`, versionData);
    if (response.status !== 201) {
      throw new Error("Failed to post API versions data");
    }
    return response.data.id_version;
  };
  
  const postEndpoints = async (apiVersionId, endpoints) => {
    try {
      const endpointPromises = endpoints.map(async (endpoint) => {
        const endpointResponse = await API.post(`/apiendpoints/`, {
          
          title: endpoint.name,
          method: endpoint.method,
          link: endpoint.path,
          version: apiVersionId,
          description: endpoint.description,
          group: endpoint.group,
        });
        const endpointId = endpointResponse.data.id_endpoint;
        console.log("headers2:",endpoint.headers)
        const paramsPromise = createParams(endpointResponse, endpointId, endpoint.params);
        const headersPromise = createHeaders(endpointResponse, endpointId, endpoint.headers);
        console.log("queryParams2:",endpoint.queryParams)
        const queryParamsPromise = createQueryParams(endpointResponse, endpointId, endpoint.queryParams);
        const bodyPromise = createBody(endpointResponse, endpointId, endpoint);
         const responseExamplesPromise = createResponseExamples(endpointResponse, endpointId, endpoint.responseExamples);
        
        const allPromises = [headersPromise, queryParamsPromise, bodyPromise, paramsPromise, responseExamplesPromise];
        
        return executeAllPromises(allPromises);
      });
      return Promise.all(endpointPromises);
    } catch (error) {
      console.error("Error creating endpoints:", error);
      throw error;
    }
  };
  
  const createHeaders = (endpointResponse, endpointId, headers) => {
    console.log("headers:",headers)
    if (headers) {
      const headersData = headers.map((header) => ({
        key: header.key,
        type_id: header.type,
        example_value: header.value,
        required: header.required,
        endpoint: endpointId,
      }));
     return Promise.all(headersData.map((headerData) =>
        API.post(`/apiheaders/`, headerData)
      ));
    }
   return Promise.resolve();
  };
  
  const createQueryParams = (endpointResponse, endpointId, queryParams) => {
    console.log("queryParams:",queryParams)
    if (queryParams) {
      const queryParamsData = queryParams.map((queryParam) => ({
        key: queryParam.key,
        type_id: queryParam.type,
        example_value: queryParam.value,
        endpoint: endpointResponse.data.id_endpoint,
      }));
      return Promise.all(queryParamsData.map((queryParamData) =>
        API.post(`/apiquery/`, queryParamData)
      ));
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
      alert(endpointResponse.data.id_endpoint);
      return Promise.all(paramsData.map((paramData) =>
        API.post(`/endpoint_parameter/`, paramData)
      ));
    }
    return Promise.resolve();
  };
  
  const createResponseExamples = (endpointResponse, endpointId, responseExamples) => {
    if (responseExamples) {
      const responseExamplesData = responseExamples.map((example) => ({
        code_status: example.codeStatus,
        title: example.exampleName,
        body: example.responseBody,
        id_endpoint: endpointResponse.data.id_endpoint,
      }));
      alert(endpointId);
      return Promise.all(responseExamplesData.map((exampleData) =>
        API.post(`/responseexample/`, exampleData)
      ));
    }
    return Promise.resolve();
  };
  
  const executeAllPromises = async (allPromises) => {
    try {
      await Promise.all(allPromises);
      console.log("All promises are resolved.");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  
  return {
    getAPIversions,
    versions,
    updateVersionState,
    updateCurrentVersion,
    addVersion,
    checkIfVersionExists
  };
}
