import { AUTH, LOGOUT } from "../constants/actionTypes";

export default function authReducer(state = { authdata: null}, action) {
    switch (action.type) {
        case AUTH:
            console.log('action?.data', action?.data);
            return state
        default:
            return state
    }
}