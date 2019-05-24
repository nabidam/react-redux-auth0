import * as types from "../types/types";

const loginSuccess = authResult => ({
  type: types.LOGIN_SUCCESS,
  authResult,
  isAuthenticated: true
});

export default loginSuccess;
