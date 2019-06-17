import * as types from "../types/types";

const addQuery = data => ({
  type: types.ADD_QUERY,
  data
});

export default addQuery;
