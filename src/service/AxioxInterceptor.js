import axios from 'axios';

const instance = axios.create({
    baseURL: `http://localhost:3000/bitbucket/`
})

instance.interceptors.request.use((config) => {
    const initialConfig = config;
    const credentials = localStorage.getItem("credentials");
    const authAddedConfig = {
        ...initialConfig,
        headers: { Authorization: `Basic ${credentials}` }
    }
    console.log(authAddedConfig);
    
    return authAddedConfig;
})

export default instance;