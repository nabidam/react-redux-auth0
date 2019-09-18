import * as types from "../types/types";

const selectPage = page => ({
  type: types.SELECT_PAGE,
  page
});

export default selectPage;
