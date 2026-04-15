import axios from "axios";

const envBaseUrl = import.meta.env.VITE_BASEURL?.trim();
const baseURL = envBaseUrl || null;

if (!baseURL) {
  console.error("VITE_BASEURL is not set. Frontend API calls will fail until it is configured in Vercel.");
} else {
  console.log("Client API Base URL:", `${baseURL}/api/v1`);
}

const API = axios.create({
  baseURL: baseURL ? `${baseURL}/api/v1` : undefined
});

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
