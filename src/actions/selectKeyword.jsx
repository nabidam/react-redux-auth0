import * as types from "../types/types";

const selectKeyword = word => ({
  type: types.SELECT_KEYWORD,
  word
});

export default selectKeyword;
