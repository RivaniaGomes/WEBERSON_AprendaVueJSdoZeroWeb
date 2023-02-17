import axios from "axios";
import utilStorage from '../utils/storage';
const api = axios.create({
    baseURL:'http://localhost:3000'
});

api.interceptors.request.use((config) => {
    let token = utilStorage.obterTokenNaStorage();
    config.headers.Authorization = token;
    return config;
})

export default api;