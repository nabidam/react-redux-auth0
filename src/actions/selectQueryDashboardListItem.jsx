import * as types from "../types/types";

const selectQueryDashboardListItem = item => ({
  type: types.SELECT_QUERY_DASHBOARD_LIST_ITEM,
  item
});

export default selectQueryDashboardListItem;
