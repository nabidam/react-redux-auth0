import * as types from "../types/types";

const cancelCreate = page => ({
  type: types.CANCEL_CREATE,
  page
});

export default cancelCreate;
