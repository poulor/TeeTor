import {SET_MENTOR, SET_MENTEE} from "./types"

export const changeMentor = () => {
    return {
        type: SET_MENTOR
    };
}

export const changeMentee = () => {
    return {
        type: SET_MENTEE
    };
} 