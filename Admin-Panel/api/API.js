import axios from "axios";

const baseURL = import.meta.env.VITE_BASEURL;

if (!baseURL) {
  console.error("❌ VITE_BASEURL is not set!");
} else {
  console.log("✅ Admin API Base URL:", `${baseURL}/api/v1`);
}

const API = axios.create({
  baseURL: `${baseURL}/api/v1`
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