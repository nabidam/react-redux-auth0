import * as types from "../types/types";

const editableProject = id => ({
  type: types.EDITABLE_PROJECT,
  id
});

export default editableProject;
