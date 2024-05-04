import React, { useState } from "react";
//import { generateApiDocumentation } from "./apiaryService"; // Assume this is a service to interact with Apiary

const APIdoc = () => {
  /*const [blueprintCode, setBlueprintCode] = useState("");
  const [documentationUrl, setDocumentationUrl] = useState("");

  const handleGenerateDocumentation = async () => {
    try {
      // Call a service function to generate documentation with Apiary
      const documentationUrl = await generateApiDocumentation(blueprintCode);
      setDocumentationUrl(documentationUrl);
    } catch (error) {
      console.error("Error generating documentation:", error);
    }
  };*/

  return (
    <div>
      <textarea
       // value={blueprintCode}
       // onChange={(e) => setBlueprintCode(e.target.value)}
        placeholder="Paste or write Blueprint code here"
        rows={10}
        cols={50}
      />
      <button>Generate Documentation</button>
{/*       {documentationUrl && (
        <iframe src={documentationUrl} title="API Documentation" width="100%" height="600px" />
      )} */}
    </div>
  );
};

export default APIdoc;
