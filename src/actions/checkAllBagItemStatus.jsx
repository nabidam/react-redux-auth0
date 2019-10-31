import * as types from "../types/types";

const checkAllBagItemStatus = status => ({
  type: types.CHECK_ALL_BAG_ITEM_STATUS,
  status
});

export default checkAllBagItemStatus;
