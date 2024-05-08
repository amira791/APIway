import React, { useState } from "react";
import ManipulateTypes from "../../../../src/Hooks/EndpointHook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ParamsTable = ({ data, params, onAddRow, onChange, onDelete, activeTab }) => {
  const [newRow, setNewRow] = useState({
    key: "",
    type: "",
    value: "",
    required: false,
  });
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [editedRowIndex, setEditedRowIndex] = useState(null);

  const handleInputChange = (key, value) => {
    setNewRow(prevState => ({ ...prevState, [key]: value }));
  };

  const handleConfirmRow = () => {
    if (!newRow.key || !newRow.type || !newRow.value) {
      toast.error("Please fill in all fields before adding the row.");
      return;
    }
    onAddRow(newRow);
    setNewRow({ key: "", type: "", value: "", required: false });
    setIsAddingRow(false);
  };

  const handleCancelRow = () => {
    setIsAddingRow(false);
    setNewRow({ key: "", type: "", value: "", required: false });
  };

  const handleEditRow = (index) => {
    setEditedRowIndex(index);
  };

  const handleEditInputChange = (key, value) => {
    const updatedData = [...data];
    updatedData[editedRowIndex][key] = value;
    onChange(updatedData);
  };

  const handleEditConfirm = () => {
    console.log(activeTab);
    setEditedRowIndex(null);
  };

  const handleDeleteRow = (index) => {
    onDelete(index);
  };
  const { types } = ManipulateTypes();
  return (
    <div>
      <table>
        <thead>
          <tr>
            {params.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((info, rowIndex) =>
            rowIndex === editedRowIndex ? (
              <tr key={rowIndex}>
                {Object.keys(info).map((key, colIndex) => (
                  <td key={colIndex}>
                    {key === 'key' && activeTab === 'headers' ? (
                      <select
                        value={info[key]}
                        onChange={(e) => handleEditInputChange(key, e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="Accept">Accept</option>
                        <option value="Accept-Charset">Accept-Charset</option>
                        <option value="Accept-Encoding">Accept-Encoding</option>
                        <option value="Accept-Language">Accept-Language</option>
                        <option value="Authorization">Authorization</option>
                        <option value="Cache-Control">Cache-Control</option>
                        <option value="Connection">Connection</option>
                        <option value="Content-Length">Content-Length</option>
                        <option value="Content-Type">Content-Type</option>
                        <option value="Cookie">Cookie</option>
                        <option value="Date">Date</option>
                        <option value="Host">Host</option>
                        <option value="If-Match">If-Match</option>
                        <option value="If-None-Match">If-None-Match</option>
                        <option value="Origin">Origin</option>
                        <option value="Pragma">Pragma</option>
                        <option value="Referer">Referer</option>
                        <option value="User-Agent">User-Agent</option>
                      </select>
                    ) : (
                      <input
                        type={key === 'required' ? "checkbox" : "text"}
                        value={info[key]}
                        checked={key === 'required' ? info[key] : undefined}
                        onChange={(e) => handleEditInputChange(key, e.target.type === 'checkbox' ? e.target.checked : e.target.value)}
                      />
                    )}
                  </td>
                ))}
                <td>
                <ToastContainer />
                  <button className="confirmation-btn" onClick={handleEditConfirm}>Confirm</button>
                </td>
              </tr>
            ) : (
              <tr key={rowIndex}>
                {Object.keys(info).map((key, colIndex) => (
                  <td key={colIndex}>
                    {key === 'key' && activeTab === 'headers' ? (
                      <select
                        value={info[key]}
                        onChange={(e) => handleEditInputChange(key, e.target.value)}
                        disabled={editedRowIndex === null}
                      >
                        <option value="">Select...</option>
                        <option value="Accept">Accept</option>
                        <option value="Accept-Charset">Accept-Charset</option>
                        <option value="Accept-Encoding">Accept-Encoding</option>
                        <option value="Accept-Language">Accept-Language</option>
                        <option value="Authorization">Authorization</option>
                        <option value="Cache-Control">Cache-Control</option>
                        <option value="Connection">Connection</option>
                        <option value="Content-Length">Content-Length</option>
                        <option value="Content-Type">Content-Type</option>
                        <option value="Cookie">Cookie</option>
                        <option value="Date">Date</option>
                        <option value="Host">Host</option>
                        <option value="If-Match">If-Match</option>
                        <option value="If-None-Match">If-None-Match</option>
                        <option value="Origin">Origin</option>
                        <option value="Pragma">Pragma</option>
                        <option value="Referer">Referer</option>
                        <option value="User-Agent">User-Agent</option>
                      </select>
                    ) : (
                      <>{info[key]}</>
                    )}
                  </td>
                ))}
                <td>
                  {editedRowIndex === null && <button onClick={() => handleEditRow(rowIndex)}>Edit</button>}
                  <button onClick={() => handleDeleteRow(rowIndex)}>Delete</button>
                </td>
              </tr>
            )
          )}
          <tr>
            
            <td>
            {activeTab === 'headers' ? (
                      <select
                        
                        onChange={(e) => handleInputChange("key", e.target.value)}
                      
                      >
                        <option value="">Select...</option>
                        <option value="Accept">Accept</option>
                        <option value="Accept-Charset">Accept-Charset</option>
                        <option value="Accept-Encoding">Accept-Encoding</option>
                        <option value="Accept-Language">Accept-Language</option>
                        <option value="Authorization">Authorization</option>
                        <option value="Cache-Control">Cache-Control</option>
                        <option value="Connection">Connection</option>
                        <option value="Content-Length">Content-Length</option>
                        <option value="Content-Type">Content-Type</option>
                        <option value="Cookie">Cookie</option>
                        <option value="Date">Date</option>
                        <option value="Host">Host</option>
                        <option value="If-Match">If-Match</option>
                        <option value="If-None-Match">If-None-Match</option>
                        <option value="Origin">Origin</option>
                        <option value="Pragma">Pragma</option>
                        <option value="Referer">Referer</option>
                        <option value="User-Agent">User-Agent</option>
                      </select>):(
              <input
                type="text"
                value={newRow.key}
                onChange={(e) => handleInputChange("key", e.target.value)}
              />)}
            </td>
            <td>
              <select
                value={newRow.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
              >
                <option value="">Select type</option>
                {types.map((type) => (
                                <option
                                  key={type.id_TypeParam}
                                  value={type.id_TypeParam}
                                >
                                  {type.name}
                                </option>
                              ))}
              </select>
            </td>
            <td>
              <input
                type="text"
                value={newRow.value}
                onChange={(e) => handleInputChange("value", e.target.value)}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={newRow.required}
                onChange={(e) => handleInputChange("required", e.target.checked)}
              />
              {newRow.required}
            </td>
            <td>
              <button className="confirmation-btn"  onClick={handleConfirmRow}>Confirm</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ParamsTable;
