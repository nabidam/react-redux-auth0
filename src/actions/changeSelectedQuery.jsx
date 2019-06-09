import * as types from "../types/types";

const changeSelectedQuery = queryId => ({
  type: types.CHANGE_SELCETED_QUERY,
  queryId
});

export default changeSelectedQuery;
