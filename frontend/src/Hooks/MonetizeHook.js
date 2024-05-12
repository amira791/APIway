import { useState, useEffect} from "react";
import API from "../API";


export default function ManipulateMonetize() {
    const [pricingModels, setpricingModels] = useState([]);
    const [tarif, setTarif] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const getAPImodels = (apiId) =>  {
        setLoading(true);
        API.get(`/pricing_model/`).then((res) => {
            setpricingModels(res.data.filter(pricing_model => pricing_model.api === apiId));
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
    };
    const getModelTraifications= () =>  {
        setLoading(true);
        API.get(`/tarifications/`).then((res) => {
            setTarif(res.data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
    };
    const checkExistingModel = async (apiId, period) => {
        try {
          const existingModelResponse = await API.get(`/pricing_model/?api=${apiId}&period=${period}`);
          return existingModelResponse.data;
        } catch (error) {
          console.error("Error checking existing model:", error);
          throw error;
        }
    };

    const updateActiveModel = async (model, isChecked) => {
        try {
         console.log("chekchk",isChecked);
         if(model.id_model != null){
            console.log("if1");
            if (isChecked) {
                console.log("dkhlt if");
                // Check if there is another active model with the same period
                const allModels = await API.get('/pricing_model/');
                const activeModels = allModels.data.filter((pricing_model => pricing_model.api === model.api && pricing_model.period === model.period && pricing_model.id_model !== model.id_model && pricing_model.is_active === true));
                console.log("activemodels",activeModels);
        
                // If there is an active model with the same period, deactivate it
                if (activeModels.length > 0 ) {
                await API.put(`/pricing_model/${activeModels[0].id_model}/`, {
                    is_active: 0,
                });
                }
            }
        
            API.put(`/pricing_model/${model.id_model}/`, {is_active: isChecked})
            .then((response) => {
                console.log(response);
                console.log("active model updated successfully");
            })
            .catch(error => {
                console.error('Error updating active model:', error);
            });
         }else if(model.id!=null){
            console.log("if2");
            if (isChecked) {
                console.log("dkhlt if");
                // Check if there is another active model with the same period
                const allModels = await API.get('/pricing_model/');
                const activeModels = allModels.data.filter((pricing_model => pricing_model.api === model.api && pricing_model.period === model.period && pricing_model.id_model !== model.id && pricing_model.is_active === true));
                console.log("activemodels",activeModels);
        
                // If there is an active model with the same period, deactivate it
                if (activeModels.length > 0 ) {
                await API.put(`/pricing_model/${activeModels[0].id}/`, {
                    is_active: 0,
                });
                }
            }
        
            API.put(`/pricing_model/${model.id}/`, {is_active: isChecked})
            .then((response) => {
                console.log(response);
                console.log("active model updated successfully");
            })
            .catch(error => {
                console.error('Error updating active model:', error);
            });
         }
      
          
        } catch (error) {
          console.error('Error updating active model:', error);
          throw error;
        }
    };
      
       
    
    return {
        checkExistingModel,
        getAPImodels,
        pricingModels,
        tarif,
        getModelTraifications,
        updateActiveModel
    };
}