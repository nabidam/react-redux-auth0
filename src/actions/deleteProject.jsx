import * as types from "../types/types";

const deleteProject = project => ({
  type: types.DELETE_PROJECT,
  project
});

export default deleteProject;
