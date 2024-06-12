import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css"; // Import Swagger UI CSS
import API from "../../API";

const generateSwaggerSpec = async (formData, functionalities, endpoints) => {
  const swaggerSpec = {
    openapi: "3.1.0",
    info: {
      title: formData.apiName,
      version: "2.0.0",
    },
    servers: [
      {
        url: formData.website,
      },
    ],
    paths: {},
    components: {
      schemas: {},
    },
  };

  // Function to fetch type names from the backend
  const getTypeName = async (typeId) => {
    try {
      const response = await API.get(`/types_param/${typeId}/`);
      return response.data.name;
    } catch (error) {
      console.error(`Error fetching type name for typeId ${typeId}:`, error);
      return "unknown"; // Default value if fetching fails
    }
  };

  // Process each endpoint asynchronously
  await Promise.all(endpoints.map(async (endpoint) => {
    const methodLowerCase = endpoint.method.toLowerCase();

    if (!swaggerSpec.paths[endpoint.path]) {
      swaggerSpec.paths[endpoint.path] = {};
    }

    const pathItem = {
      summary: endpoint.name,
      description: endpoint.description,
      operationId: endpoint.name,
      parameters: [],
      responses: {},
    };

    // Add headers to the parameters array
    if (endpoint.headers && endpoint.headers.length > 0) {
      endpoint.headers.forEach((header) => {
        pathItem.parameters.push({
          in: "header",
          name: header.key,
          required: header.required || false,
          schema: {
            type: "string",
            example: header.value,
          },
        });
      });
    }
   // Add path parameters to the parameters array
    if (endpoint.params && endpoint.params.length > 0) {
      await Promise.all(endpoint.params.map(async (param) => {
        try {
          const typeName = await getTypeName(param.type);
          console.log("TYPENAME", typeName);
          
          pathItem.parameters.push({
            in: "path",
            name: param.name,
            required: param.required,
            schema: {
              type: typeName,
              example: param.value,
            },
          });
        } catch (error) {
          console.error(`Error fetching type name for parameter ${param.name}:`, error);
        }
      }));
    }
    /* Process path parameters
    const pathParams = endpoint.params || [];
    await Promise.all(pathParams.map(async (param) => {
      let paramName = param.name;
      paramName = `{${paramName}}`;

      try {
        const typeName = await getTypeName(param.type);
        let parameterInfo = `${paramName}`;
        if (param.required) {
          parameterInfo += ' (required)';
        }
        parameterInfo += `: ${typeName}`;
        if (param.value) {
          parameterInfo += `, Example: ${param.value}`;
        }
        pathItem.parameters.push({
          description: parameterInfo,
        });
      } catch (error) {
        console.error(`Error fetching type name for parameter ${param.name}:`, error);
      }
    }));*/

    // Add request body if method is POST, PUT, or PATCH
    if (['post', 'put', 'patch'].includes(methodLowerCase) && endpoint.body) {
      pathItem.requestBody = {
        content: {
          [endpoint.body.mediaType]: {
            schema: {
              type: "object",
              properties: {
                [endpoint.body.payloadName]: {
                  type: "string",
                  description: endpoint.body.payloadValue,
                },
              },
              example: endpoint.body.bodyExample,
            },
          },
        },
      };
    }

    // Add responses from the responseExamples array
    if (endpoint.responseExamples && endpoint.responseExamples.length > 0) {
      endpoint.responseExamples.forEach((example) => {
        pathItem.responses[example.codeStatus] = {
          description: example.exampleName,
          content: {
            'application/json': {
              schema: {
                type: "object",
                example: example.responseBody,
              },
            },
          },
        };
      });
    } else {
      // Default responses if no examples provided
      pathItem.responses['200'] = {
        description: "Success",
        content: {
          'application/json': {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Successful response",
                },
              },
            },
          },
        },
      };
      pathItem.responses['400'] = {
        description: "Bad Request",
        content: {
          'application/json': {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Bad request",
                },
              },
            },
          },
        },
      };
      pathItem.responses['401'] = {
        description: "Unauthorized",
        content: {
          'application/json': {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Unauthorized",
                },
              },
            },
          },
        },
      };
      pathItem.responses['404'] = {
        description: "Not Found",
        content: {
          'application/json': {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Resource not found",
                },
              },
            },
          },
        },
      };
      pathItem.responses['500'] = {
        description: "Internal Server Error",
        content: {
          'application/json': {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Internal server error",
                },
              },
            },
          },
        },
      };
    }

    // Assign the path item to the corresponding path and method
    swaggerSpec.paths[endpoint.path][methodLowerCase] = pathItem;
  }));

  // Process functionalities
  functionalities.forEach((functionality) => {
    swaggerSpec.components.schemas[functionality.name] = functionality.schema;
  });

  return swaggerSpec;
};

export default generateSwaggerSpec;
