import * as types from "../types/types";

const changeSnackbarStatus = data => ({
  type: types.CHANGE_SNACKBAR_STATUS,
  data
});

export default changeSnackbarStatus;
