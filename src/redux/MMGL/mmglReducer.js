import {
    LOAD_MARKETPLACE,
    LOAD_MERCHANT,
    LOAD_GL
} from "./mmglAction";

export default (state = {}, action) => {
    switch (action.type) {
        case LOAD_MARKETPLACE:
            return {...state, marketPlace: action.value };
        case LOAD_MERCHANT:
            return {...state, merchant: action.value };
        case LOAD_GL:
            return {...state, gl: action.value };
        default:
            return state;
    }
};