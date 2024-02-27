import { AUTH_GET_FAILED, AUTH_GET_LOADING, AUTH_GET_SUCCESS } from "../types/AuthTypes";

const initState = {
    isLoading: true,
    isAuthenticated: (localStorage.getItem("email") ?? "").length > 0 && (localStorage.getItem("pass") ?? "").length > 0,
    data: JSON.parse(localStorage.getItem("profile")) ?? "",
    isAdmin: JSON.parse(localStorage.getItem("profile")) ? JSON.parse(localStorage.getItem("profile"))[0].isAdmin : false,
    error: undefined
};
const authDataReducer = (state = initState, action) => {
    switch (action.type) {
        case AUTH_GET_LOADING:
            return { ...state, isLoading: action.payload }

        case AUTH_GET_SUCCESS:
            return { ...state, isLoading: false, isAuthenticated: true, data: action.payload, isAdmin: action.payload[0].isAdmin }

        case AUTH_GET_FAILED:
            return { ...state, isLoading: false, isAuthenticated: false, isAdmin: false, error: "Username or Password is Wrong." }

        default:
            return state;
    }
};

export default authDataReducer;
