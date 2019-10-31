import * as types from "../types/types";

const changeBagItemStatus = item => ({
  type: types.CHANGE_BAG_ITEM_STATUS,
  item
});

export default changeBagItemStatus;
