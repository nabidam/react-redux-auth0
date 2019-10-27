import * as types from "../types/types";

const editableQuery = id => ({
  type: types.EDITABLE_QUERY,
  id
});

export default editableQuery;
