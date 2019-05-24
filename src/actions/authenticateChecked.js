import * as types from "../types/types";

const authenticateChecked = creds => ({
  type: types.AUTHENTICATE_CHECKED,
  creds
});

export default authenticateChecked;
