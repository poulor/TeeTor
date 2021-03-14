import {SET_MENTOR, SET_MENTEE} from "../actions/types"

const changeSidebarTypeReducer = (state = "mentee", action) => {
    switch(action.type) {
        case SET_MENTOR:
            return 'mentor';
        case SET_MENTEE:
            return 'mentee';
        default:
            return state;
    }
}

export default changeSidebarTypeReducer;