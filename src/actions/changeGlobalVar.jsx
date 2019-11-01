import * as types from "../types/types";

const changeGlobalVar = data => ({
  type: types.CHANGE_GLOBAL_VAR,
  data
});

export default changeGlobalVar;
