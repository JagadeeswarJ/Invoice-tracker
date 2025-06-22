import axios from "axios"


export const UserToken = "user-token" 
export const api = axios.create({
    baseURL: import.meta.env.DEV
        ? "http://localhost:3000"
        : "https://invoice-tracker-server.onrender.com",
});

api.interceptors.request.use()
api.interceptors.response.use()