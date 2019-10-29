import * as types from "../types/types";

const changeAddQuery = data => ({
  type: types.CHANGE_ADD_QUERY,
  data
});

export default changeAddQuery;
