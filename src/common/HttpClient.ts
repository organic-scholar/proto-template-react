import axios from 'axios';


export let httpClient = axios.create({
    baseURL: location.origin + '/api/v1'
});

httpClient.interceptors.request.use((config)=>
{
    config.headers['Authorization'] = localStorage.getItem('id_token');
    return config;
});



