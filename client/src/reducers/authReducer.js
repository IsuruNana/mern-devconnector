import * as types from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action) {
    switch(action.type){
        case types.GET_ERRORS:
            return{
                ...initialState,
                user: action.payload
            }
        default:
            return state;
    }
}