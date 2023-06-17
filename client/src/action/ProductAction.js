import * as ProductApi from '../api/ProductRequest'

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

export const clearStateProduct = () => async (dispatch) =>
  dispatch({ type: 'CLEAR_STATE_PRODUCT' })
