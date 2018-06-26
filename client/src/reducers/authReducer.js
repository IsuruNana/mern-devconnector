import isEmpty from '../validation/is-empty';

import * as types from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action) {
    switch(action.type){
        case types.GET_ERRORS:
            return{
                ...state,
                user: action.payload
            }
        case types.SET_CURRENT_USER:
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}