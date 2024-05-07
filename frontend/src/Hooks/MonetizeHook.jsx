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
    const getModelTraifications= (id_model) =>  {
        setLoading(true);
        API.get(`/tarifications/`).then((res) => {
            setTarif(res.data.filter(tarification => tarification.pricingModel === id_model));
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
    return {
        checkExistingModel,
        getAPImodels,
        pricingModels,
        tarif,
        getModelTraifications
    };
}