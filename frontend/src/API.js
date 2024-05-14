import axios from 'axios';

export default axios.create({
    baseURL: "http://127.0.0.1:8000/api_mapi/",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
})


const payementApiClient = axios.create({
    baseURL: "http://localhost:8000/Consumer/",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export { payementApiClient };