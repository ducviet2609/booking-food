const productReducer = (
  state = {
    listProduct: {},
    isCreateProductSucces: false,
    loading: false,
    error: false,
    uploading: false,
    updating: false,
    isAddToCartSuccess: false,
    listCart: [],
  },
  action,
) => {
  switch (action.type) {
    // Create Product
    case 'CREATE_PRODUCT_START':
      return { ...state, loading: true, error: false }
    case 'CREATE_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        isCreateProductSucces: true,
        error: false,
      }
    case 'CREATE_PRODUCT_FAIL':
      return { ...state, loading: false, error: true }

    // Get Product
    case 'GET_PRODUCT_START':
      return { ...state, loading: true, error: false }
    case 'GET_PRODUCT_SUCCESS':
      return {
        ...state,
        listProduct: action.data,
        loading: false,
        error: false,
      }
    case 'GET_PRODUCT_FAIL':
      return { ...state, loading: false, error: true }

    // Add product to cart
    case 'ADD_PRODUCT_TO_CART_START':
      return { loading: true, error: false }
    case 'ADD_PRODUCT_TO_CART_SUCCESS':
      return {
        isAddToCartSuccess: true,
        loading: false,
        error: false,
      }
    case 'ADD_PRODUCT_TO_CART_FAIL':
      return { loading: false, error: true }

    // get cart
    case 'GET_CART_BY_USER_START':
      return { loading: true, error: false }
    case 'GET_CART_BY_USER_SUCCESS':
      return {
        listCart: action.data,
        loading: false,
        error: false,
      }
    case 'GET_CART_BY_USER_FAIL':
      return { loading: false, error: true }

    // Clear
    case 'CLEAR_STATE_PRODUCT':
      return {
        isCreateProductSucces: false,
        isAddToCartSuccess: false,
      }

    default:
      return state
  }
}

export default productReducer
