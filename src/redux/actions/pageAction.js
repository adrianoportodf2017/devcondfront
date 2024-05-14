import { 
  saveToLocalStorage, 
  getFromLocalStorage, 
  getAllPages, 
  addPage 
} from "../../api_utils/storageUtils";

export const TYPES = {
  LIST_PAGE_REQUEST_SEND: "LIST_PAGE_REQUEST_SEND",
  LIST_PAGE_REQUEST_ERROR: "LIST_PAGE_REQUEST_ERROR",
  LIST_PAGE_REQUEST_SUCCESS: "LIST_PAGE_REQUEST_SUCCESS",

  CREATE_PAGE_REQUEST: "CREATE_PAGE_REQUEST",
  CREATE_PAGE_ERROR: "CREATE_PAGE_ERROR",
  CREATE_PAGE_SUCCESS: "CREATE_PAGE_SUCCESS",
};

export const pageLoad = () => async (dispatch) => {
  dispatch({ type: TYPES.LIST_PAGE_REQUEST_SEND });
  try {
    const pages = getAllPages();
    dispatch({ type: TYPES.LIST_PAGE_REQUEST_SUCCESS, data: pages });
  } catch (error) {
    dispatch({ type: TYPES.LIST_PAGE_REQUEST_ERROR, error: error });
  }
};

export const createPage = (name) => async (dispatch) => {
  dispatch({ type: TYPES.CREATE_PAGE_REQUEST });
  try {
    const newPage = addPage(name);
    dispatch({ type: TYPES.CREATE_PAGE_SUCCESS, data: newPage });
  } catch (error) {
    dispatch({ type: TYPES.CREATE_PAGE_ERROR, error: error });
  }
};
