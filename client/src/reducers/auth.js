import { AUTH, LOGOUT } from "../constants/actionTypes";

export default function authReducer(state = { authdata: null}, action) {
    switch (action.type) {
        case AUTH:
            console.log('action?.data', action?.data);
            localStorage.setItem('profile', JSON.stringify({... action?.data}));    // El 1º valor es key, el 2º value
            return { ...state, authData: action?.data};
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null}
        default:
            return state
    }
} 