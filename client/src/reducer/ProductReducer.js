const productReducer = (
  state = {
    listProduct: {},
    isCreateProductSucces: false,
    loading: false,
    error: false,
    uploading: false,
    updating: false,
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

    // Get Post
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

    // Delete Post
    case 'DELETE_POST_START':
      return { ...state, error: false }
    case 'DELETE_POST_SUCCESS':
      return {
        ...state,
        error: false,
        posts: [...state.posts.filter((post) => post._id !== action.data)],
      }
    case 'DELETE_POST_FAIL':
      return { ...state, error: true }

    // Update Post
    case 'UPDATE_POST_START':
      return { ...state, updating: true, error: false }
    case 'UPDATE_POST_SUCCESS':
      return {
        ...state,
        updating: false,
        error: true,
        posts: [
          action.data,
          ...state.posts.filter((post) => post._id !== action.data._id),
        ],
      }
    case 'UPDATE_POST_FAIL':
      return { ...state, updating: false, error: true }

    // Clear
    case 'CLEAR_STATE_PRODUCT':
      return {
        isCreateProductSucces: false,
      }

    default:
      return state
  }
}

export default productReducer
