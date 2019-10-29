import * as types from "../types/types";

const deleteQuery = query => ({
  type: types.DELETE_QUERY,
  query
});

export default deleteQuery;
