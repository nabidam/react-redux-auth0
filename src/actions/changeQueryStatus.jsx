import * as types from "../types/types";

const changeQueryStatus = query => ({
  type: types.CHANGE_QUERY_STATUS,
  query
});

export default changeQueryStatus;
