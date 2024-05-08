
import React, { useState, useEffect } from 'react';

const ModelCheckbox = ({ model, updateActiveModel, getAPImodels}) => {
  const [isChecked, setIsChecked] = useState(model.is_active);

  useEffect(() => {
    setIsChecked(model.is_active);
  }, [model.is_active]);

  const handleCheckboxChange = async (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    await updateActiveModel(model, checked);
    getAPImodels(model.api);
  };

  return (
    <input
      type="checkbox"
      checked={isChecked}
      title='activate/desactivate model'
      onChange={handleCheckboxChange}
      id={`model-${model.id}`}
    />
  );
};

export default ModelCheckbox;