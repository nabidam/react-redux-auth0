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
    isDrawerOpen: false,
    latestQueries: [
        {
            id: 1,
            username: 'user1',
            date: new Date(2019, 1, 2)
        },
        {
            id: 2,
            username: 'user2',
            date: new Date(2020, 10, 20)
        },
        {
            id: 3,
            username: 'user3',
            date: new Date(2018, 11, 24)
        },
        {
            id: 4,
            username: 'user4',
            date: new Date()
        },
    ],
    lastQueryId: 4,
    selectedQuery: 3,
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
                ...state,
                isAuthenticated: action.isAuthenticated,
                access_token: action.access_token,
                id_token: action.id_token,
                expires_at: action.expires_at,
            };
        case "LOGOUT_REQUEST":
            return {
                ...state,
                isAuthenticated: false,
                access_token: null,
                id_token: null,
                expires_at: null
            };
        case "AUTHENTICATE_CHECKED":
            return {
                ...state,
                isAuthenticated: true,
                access_token: action.access_token,
                id_token: action.id_token,
                expires_at: action.expires_at
            };
        case "TRIGGER_DRAWER":
            return {
                ...state,
                isDrawerOpen: !state.isDrawerOpen
            };
        case "ADD_QUERY":
            var now = new Date();
            var id = state.lastQueryId + 1;
            return {
                ...state,
                lastQueryId: id,
                latestQueries: [
                    ...state.latestQueries,
                    {
                        id,
                        username: action.username,
                        date: now
                    }
                ]
            };
        case "CHANGE_SELCETED_QUERY":
            return {
                ...state,
                selectedQuery: action.queryId
            };
        default:
            return state;
    }
};

export default rootReducer;
