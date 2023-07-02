import * as ProductApi from '../api/ProductRequest'

//create product
export const createProduct = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'CREATE_PRODUCT_START' })
  try {
    const { data } = await ProductApi.createProduct(dataRequest)
    dispatch({ type: 'CREATE_PRODUCT_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'CREATE_PRODUCT_FAIL' })
    console.log(error)
  }
}

// update product
export const updateProduct = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'UPDATE_PRODUCT_START' })
  try {
    const { data } = await ProductApi.updateProduct(dataRequest)
    dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'UPDATE_PRODUCT_FAIL' })
    console.log(error)
  }
}

//delete product
export const deleteProduct = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'DELETE_PRODUCT_START' })
  try {
    const { data } = await ProductApi.deleteProduct(dataRequest)
    dispatch({ type: 'DELETE_PRODUCT_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'DELETE_PRODUCT_FAIL' })
    console.log(error)
  }
}

// get product
export const getProduct = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'GET_PRODUCT_START' })
  try {
    const { data } = await ProductApi.getProduct(dataRequest)
    dispatch({ type: 'GET_PRODUCT_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'GET_PRODUCT_FAIL' })
    console.log(error)
  }
}

//add to cart
export const addProductToCart = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'ADD_PRODUCT_TO_CART_START' })
  try {
    const { data } = await ProductApi.addProductToCart(dataRequest)
    dispatch({ type: 'ADD_PRODUCT_TO_CART_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'ADD_PRODUCT_TO_CART_FAIL' })
    console.log(error)
  }
}

// delete from cart
export const deleteProductOnCart = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'DELETE_PRODUCT_ON_CART_START' })
  try {
    const { data } = await ProductApi.deleteProductOnCart(dataRequest)
    dispatch({ type: 'DELETE_PRODUCT_ON_CART_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'DELETE_PRODUCT_ON_CART_FAIL' })
    console.log(error)
  }
}

// get cart by user
export const getCartByUser = (id) => async (dispatch) => {
  dispatch({ type: 'GET_CART_BY_USER_START' })
  try {
    const { data } = await ProductApi.getCartByUser(id)
    dispatch({ type: 'GET_CART_BY_USER_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'GET_CART_BY_USER_FAIL' })
    console.log(error)
  }
}

// oder sản phẩm
export const orderProduct = (id) => async (dispatch) => {
  dispatch({ type: 'ORDER_PRODUCT_START' })
  try {
    const { data } = await ProductApi.orderProduct(id)
    dispatch({ type: 'ORDER_PRODUCT_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'ORDER_PRODUCT_FAIL' })
    console.log(error)
  }
}

// get danh sách order
export const getListOrder = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'GET_LIST_ORDER_START' })
  try {
    const { data } = await ProductApi.getListOrder(dataRequest)
    dispatch({ type: 'GET_LIST_ORDER_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'GET_LIST_ORDER_FAIL' })
    console.log(error)
  }
}

// get order cho by ID
export const getListOrderById = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'GET_LIST_ORDER_BY_ID_START' })
  try {
    const { data } = await ProductApi.getListOrderById(dataRequest)
    dispatch({ type: 'GET_LIST_ORDER_BY_ID_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'GET_LIST_ORDER_BY_ID_FAIL' })
    console.log(error)
  }
}

// xác nhận order
export const approveOrder = (dataRequest) => async (dispatch) => {
  dispatch({ type: 'APPROVE_ORDER_START' })
  try {
    const { data } = await ProductApi.approveOrder(dataRequest)
    dispatch({ type: 'APPROVE_ORDER_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'APPROVE_ORDER_FAIL' })
    console.log(error)
  }
}

//clear state
export const clearStateProduct = () => (dispatch) =>
  dispatch({ type: 'CLEAR_STATE_PRODUCT' })
