import auth0 from "auth0-js";
import * as types from "../types/types";

const auth = new auth0.WebAuth({
  domain: "dev-hukqki79.auth0.com",
  clientID: "ps5bPqDsjz7LcnR3WO7xG6mSQpHPs2tB",
  redirectUri: "http://localhost:3000/callback",
  audience: "https://dev-hukqki79.auth0.com/api/v2/",
  responseType: "token id_token",
  scope: "openid"
});

const initState = {
  isAuthenticated: false,
  access_token: null,
  id_token: null,
  expires_at: null,
  isDrawerOpen: false,
  selectedQueryDashboardItem: "dashboard",
  latestQueries: [
    {
      id: 1,
      name: "ترامپ",
      username: "user1",
      created_at: "۵ ساعت پیش",
      date: new Date(2019, 1, 2)
    },
    {
      id: 2,
      name: "نیکزی",
      username: "user1",
      created_at: "۸ ساعت پیش",
      date: new Date(2018, 1, 2)
    },
    {
      id: 3,
      name: "کاله",
      username: "user1",
      created_at: "۱ روز پیش",
      date: new Date(2017, 1, 2)
    },
    {
      id: 4,
      name: "کافه لمیز",
      username: "user1",
      created_at: "۱ روز پیش",
      date: new Date(2016, 1, 2)
    },
    {
      id: 5,
      name: "۱۴۰۰",
      username: "user1",
      created_at: "۵ روز پیش",
      date: new Date(2015, 1, 2)
    },
    {
      id: 6,
      name: "نفتکش",
      username: "user1",
      created_at: "۸ روز پیش",
      date: new Date(2014, 1, 2)
    }
  ],
  lastQueryId: 6,
  selectedQuery: 1,
  selectedQueryMenu: null,
  auth
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {isAuthenticated: !state.isAuthenticated};
    case types.LOGIN_REQUEST:
      auth.authorize();
      break;
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        access_token: action.access_token,
        id_token: action.id_token,
        expires_at: action.expires_at
      };
    case types.LOGOUT_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        access_token: null,
        id_token: null,
        expires_at: null
      };
    case types.AUTHENTICATE_CHECKED:
      return {
        ...state,
        isAuthenticated: true,
        access_token: action.access_token,
        id_token: action.id_token,
        expires_at: action.expires_at
      };
    case types.TRIGGER_DRAWER:
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen
      };
    case types.ADD_QUERY:
      var now = new Date();
      var id = state.lastQueryId + 1;
      return {
        ...state,
        lastQueryId: id,
        latestQueries: [
          ...state.latestQueries,
          {
            id,
            name: action.data.name,
            username: action.data.username,
            created_at: "لحظاتی پیش",
            date: now
          }
        ]
      };
    case types.CHANGE_SELCETED_QUERY:
      return {
        ...state,
        selectedQuery: action.queryId
      };
    case types.SELECT_QUERY_MENU:
      return {
        ...state,
        selectedQuery: action.id,
        selectedQueryMenu: {
          id: action.id,
          name: action.name
        }
      };
    case types.CHANGE_SNACKBAR_STATUS:
      return {
        ...state,
        isSnackbarOpen: action.data.open,
        snackbarMessage: action.data.msg
      };
    case types.SELECT_QUERY_DASHBOARD_LIST_ITEM:
      return {
        ...state,
        selectedQueryDashboardItem: action.item
      };
    default:
      return state;
  }
};

export default rootReducer;
