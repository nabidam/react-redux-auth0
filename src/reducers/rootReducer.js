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
  selectedQueryDashboardItem: "keywords",
  selectedKeyword: "",
  keywords: [
    {
      text: "گرینلند",
      value: 1345
    },
    {
      text: "پمپئو",
      value: 922
    },
    {
      text: "فلورانس",
      value: 876
    },
    {
      text: "تغییر",
      value: 562
    },
    {
      text: "بیکاری",
      value: 561
    },
    {
      text: "آسایش",
      value: 428
    },
    {
      text: "آمریکا",
      value: 386
    },
    {
      text: "اقتصاد",
      value: 209
    },
    {
      text: "رشد",
      value: 87
    }
  ],
  words: [
    {
      text: "دونالد",
      value: 20
    },
    {
      text: "تحریم",
      value: 10
    },
    {
      text: "ظریف",
      value: 10
    },
    {
      text: "مردم",
      value: 13
    },
    {
      text: "آمریکا",
      value: 13
    },
    {
      text: "چین",
      value: 10
    },
    {
      text: "ایران",
      value: 8
    },
    {
      text: "تغییر",
      value: 13
    },
    {
      text: "خرید",
      value: 13
    },
    {
      text: "ما",
      value: 10
    },
    {
      text: "کاخ",
      value: 10
    },
    {
      text: "تعرفه",
      value: 10
    },
    {
      text: "جدید",
      value: 8
    },
    {
      text: "گفت",
      value: 10
    },
    {
      text: "رسانه",
      value: 10
    },
    {
      text: "گرینلند",
      value: 13
    }
  ],
  posts: [
    {
      id: 1,
      username: "morteza",
      name: "مرتضی محمدی",
      post:
        "نصیحت به غرض می‌شنود به نزدیک صاحب دیوان رفتم به سابقه معرفتی که در میان ما بود و صورت حالش بیان",
      emotion: "negative",
      sharable: 1,
      likes: 8240,
      comments: 4339,
      date: "1398/05/21",
      time: "16:42"
    },
    {
      id: 2,
      username: "moradi",
      name: "سارا مرادی",
      post:
        "نصیحت به غرض می‌شنود به نزدیک صاحب دیوان رفتم به سابقه معرفتی که در میان ما بود و صورت حالش بیان",
      emotion: "positive",
      sharable: 1,
      likes: 240,
      comments: 39,
      date: "1398/05/21",
      time: "18:42"
    },
    {
      id: 3,
      username: "sirone",
      name: "سیروان",
      post:
        "نصیحت به غرض می‌شنود به نزدیک صاحب دیوان رفتم به سابقه معرفتی که در میان ما بود و صورت حالش بیان",
      emotion: "positive",
      sharable: 1,
      likes: 82,
      comments: 43,
      date: "1398/05/20",
      time: "19:42"
    },
    {
      id: 4,
      username: "maryqueen",
      name: "مریم قاسم",
      post:
        "نصیحت به غرض می‌شنود به نزدیک صاحب دیوان رفتم به سابقه معرفتی که در میان ما بود و صورت حالش بیان",
      emotion: "positive",
      sharable: 1,
      likes: 248,
      comments: 13,
      date: "1398/05/19",
      time: "20:42"
    },
    {
      id: 5,
      username: "vtalimar",
      name: "وحید علیمردی",
      post:
        "نصیحت به غرض می‌شنود به نزدیک صاحب دیوان رفتم به سابقه معرفتی که در میان ما بود و صورت حالش بیان",
      emotion: "negative",
      sharable: 1,
      likes: 120,
      comments: 19,
      date: "1398/05/19",
      time: "22:02"
    }
  ],
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
