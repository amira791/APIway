import React, { useState } from "react";
import ManipulateTypes from "../../../hooks/EndpointHook";

const TransformationTable = ({ data, params, onAddRow, onChange, onDelete }) => {
  const [newRow, setNewRow] = useState({
    action: "",
    key: "",
    scope: "",
    plans: "",
  });
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [editedRowIndex, setEditedRowIndex] = useState(null);

  const handleInputChange = (key, value) => {
    setNewRow(prevState => ({ ...prevState, [key]: value }));
  };

  const handleConfirmRow = () => {
    console.log(newRow.action+' '+newRow.key+' '+newRow.plans+' '+newRow.scope)
    if (!newRow.action || !newRow.key || !newRow.plans||!newRow.scope) {
      alert("Please fill in all fields before adding the row.");
      return;
    }
    onAddRow(newRow);
    setNewRow({  action: "",
    key: "",
    scope: "",
    plans: "",});
    setIsAddingRow(false);
  };

  const handleCancelRow = () => {
    setIsAddingRow(false);
    setNewRow({ action: "",
    key: "",
    scope: "",
    plans: "",});
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
    setEditedRowIndex(null);
  };

  const handleDeleteRow = (index) => {
    onDelete(index);
  };
  const { types } = ManipulateTypes();
  return (
    <div>
      {isAddingRow ? (
        <button onClick={() => setIsAddingRow(true)}>Add Row</button>
      ) : (
        <p></p>
      )}
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
                 
                      <input
                        type="text"
                        value={info[key]}
                        onChange={(e) => handleEditInputChange(key, e.target.value)}
                      />
                 
                  </td>
                ))}
                <td>
                  <button className="confirmation-btn" onClick={handleEditConfirm}>Confirm</button>
                </td>
              </tr>
            ) : (
              <tr key={rowIndex}>
                {Object.keys(info).map((key, colIndex) => (
                  <td key={colIndex}>
                    
                  
                       <> {info[key]}
</>                   
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
                <select name="Action"  value={newRow.action}
                onChange={(e) => handleInputChange("action", e.target.value)}>
                    <option value="ADD">ADD</option>
                    <option value="REMOVE">REMOVE</option>
                    <option value="REMAP">REMAP</option>
                </select>
            
            </td>
        <td>  <input
                type="text"
                value={newRow.key}
                onChange={(e) => handleInputChange("key", e.target.value)}
              /></td>
            <td>
            <select name="scope"  value={newRow.scope}
                onChange={(e) => handleInputChange("scope", e.target.value)}>
                    <option value="scope1">scope1</option>
                    <option value="scope2">scope2</option>
                    <option value="scope3">scope3</option>
                </select>
            </td>
            <td>
            <select name="plans"  value={newRow.plans}
                onChange={(e) => handleInputChange("plans", e.target.value)}>
                    <option value="Plan1">Plan1</option>
                    <option value="Plan2">Plan2</option>
                    <option value="Plan3">Plan3</option>
                </select>
            </td>
            <td>
              <button className="confirmation-btn" onClick={handleConfirmRow}>Confirm</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransformationTable;
