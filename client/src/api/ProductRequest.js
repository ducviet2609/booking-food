import axios from 'axios'

const API = axios.create({ baseURL: `http://localhost:5000` })

export const createProduct = (data) => API.post('/product/create-product', data)
