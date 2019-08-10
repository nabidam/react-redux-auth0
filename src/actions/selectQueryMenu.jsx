import * as types from "../types/types";

const selectQueryMenu = (id, name) => ({
  type: types.SELECT_QUERY_MENU,
  id,
  name
});

export default selectQueryMenu;
