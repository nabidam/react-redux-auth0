import * as types from "../types/types";

const selectQuery = id => ({
  type: types.SELECT_QUERY,
  id
});

export default selectQuery;
