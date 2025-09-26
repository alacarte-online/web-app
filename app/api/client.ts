import axios from "axios";

export const apiClient = axios.create({
    baseURL: "https://api.alacarteonline.co.uk",
    timeout: 5000,
})