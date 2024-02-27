import { CLASS_LIST_EDIT, CLASS_LIST_FAILED, CLASS_LIST_LOADING, CLASS_LIST_SUCCESS } from "../types/ClassroomTypes";

const initState = {
    isLoading: true,
    data: {},
    classes: [],
    err: false
};
const classListReducer = (state = initState, action) => {
    switch (action.type) {
        case CLASS_LIST_LOADING:
            return { ...state, isLoading: action.payload }

        case CLASS_LIST_SUCCESS:
            return { ...state, isLoading: false, data: action.payload, classes: action.payload.data }

        case CLASS_LIST_FAILED:
            return { ...state, isLoading: false, err: action.payload }

        default:
            return state;
    }
};

export default classListReducer;
