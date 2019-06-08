import * as types from "../types/types";

const addQuery = username => ({
  type: types.ADD_QUERY,
  username
});

export default addQuery;
