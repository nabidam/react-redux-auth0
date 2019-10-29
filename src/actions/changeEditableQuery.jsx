import * as types from "../types/types";

const changeEditableQuery = data => ({
  type: types.CHANGE_EDITABLE_QUERY,
  data
});

export default changeEditableQuery;
