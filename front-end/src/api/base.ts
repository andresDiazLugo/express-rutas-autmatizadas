import axios from 'axios'
const BASE_URL = 'http://localhost:3001/api/'

export const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})