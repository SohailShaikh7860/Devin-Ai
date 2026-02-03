import axios from 'axios'

const DEFAULT_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8001'

const axiosInstance = axios.create({
    baseURL: DEFAULT_BASE,
    withCredentials: true, // Send cookies with requests
})

export default axiosInstance