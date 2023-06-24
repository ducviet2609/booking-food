import axios from 'axios'

const API = axios.create({ baseURL: `http://localhost:5000` })

export const createProduct = (data) => API.post('/product/create-product', data)
export const updateProduct = (data) => API.post('/product/update-product', data)
export const deleteProduct = (data) => API.post('/product/delete-product', data)
export const getProduct = (data) =>
  API.post(`/product/search?page=${data.page}&&size=${data.size}`, data)
export const addProductToCart = (data) => API.post(`/product/add-to-cart`, data)
export const deleteProductOnCart = (data) =>
  API.post(`/product/delete-on-cart`, data)
export const getCartByUser = (id) => API.get(`/user/get-cart/${id}`)
export const orderProduct = (data) => API.post(`/product/order`, data)
export const getListOrder = (data) =>
  API.post(`/product/get-list-order?page=${data.page}&&size=${data.size}`, data)
export const getListOrderById = (data) =>
  API.post(
    `/product/get-list-order/${data.userId}?page=${data.page}&&size=${data.size}`,
    data,
  )
export const approveOrder = (data) => API.post(`/product/approve-order`, data)
