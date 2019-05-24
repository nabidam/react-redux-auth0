import auth0 from "auth0-js";

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
  auth
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {isAuthenticated: !state.isAuthenticated};
    case "LOGIN_REQUEST":
      auth.authorize();
      break;
    case "LOGIN_SUCCESS":
      return {
        isAuthenticated: action.isAuthenticated,
        access_token: action.access_token,
        id_token: action.id_token,
        expires_at: action.expires_at,
        auth: state.auth
      };
    case "LOGOUT_REQUEST":
      return {
        isAuthenticated: false,
        access_token: null,
        id_token: null,
        expires_at: null,
        auth: state.auth
      };
    case "AUTHENTICATE_CHECKED":
      return {
        isAuthenticated: true,
        access_token: action.access_token,
        id_token: action.id_token,
        expires_at: action.expires_at,
        auth: state.auth
      };
    default:
      return state;
  }
};

export default rootReducer;
