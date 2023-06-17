import * as ProductApi from "../api/ProductRequest";

export const createProduct = (dataRequest) => async (dispatch) => {
  dispatch({ type: "CREATE_PRODUCT_START" });
  try {
    const { data } = await ProductApi.createProduct(dataRequest);
    dispatch({ type: "CREATE_PRODUCT_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "CREATE_PRODUCT_FAIL" });
    console.log(error);
  }
};
