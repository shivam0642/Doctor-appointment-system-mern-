import axios from "axios";

const API = axios.create({baseURL:import.meta.env.VITE_BASEURL});

API.interceptors.request.use( async (config)=>{
    try {
       const localData = await localStorage.getItem("appData");
       const appData = JSON.parse(localData);
         if(appData){
            config.headers.Authorization = `Bearer ${appData?.token}`
         }
    } catch (error) {
        console.log(error);
    }

    return config;
},
    (error)=>   {
        return Promise.reject(error);
    } 
)

export default API;