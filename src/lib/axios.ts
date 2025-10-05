import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "http://localhost:3000/api" : "/api";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});
