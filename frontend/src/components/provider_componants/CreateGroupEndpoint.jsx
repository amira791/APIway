import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { Button, Input, Checkbox, Switch, Radio, Select, Tabs } from "antd";
import ManipulateTypes from "../../../src/Hooks/EndpointHook";
import ParamsTable from "./CommunComponants/paramTable";
import TransformationTable from "./CommunComponants/trandformationsTable";

const { Option } = Select;

const { TabPane } = Tabs;

const AddGroupForm = ({ onSave }) => {
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
   
    const handleSubmit = () => {
      const formData = {
        name: groupName,
        description: groupDescription,
       
      };
      onSave(formData);
      setGroupName("");
      setGroupDescription("");
      
    };
  
    return (
      <div>
        <h2>Add Group</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="groupName"
            placeholder="Name your group"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <section className="description-md-section section-with-md">
        <div className="sub-section">
          <label>
            <span className="capitalize is-required">Description</span>
          </label>
          <br />
          <div>
            <div className="sc-fTNIDv enJrlk">
              <div>
                <fieldset class="message">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Description"
                    tabindex="4"
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    aria-required="true"
                    required=""
                  ></textarea>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </section>
 
        <button onClick={handleSubmit}>Add Group</button>
      </div>
    );
  };
  
export default AddGroupForm;