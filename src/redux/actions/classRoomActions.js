import { CLASS_LIST_FAILED, CLASS_LIST_LOADING, CLASS_LIST_SUCCESS } from "../types/ClassroomTypes"
import axios from "axios";

export const getClassList = () => {
    return async (dispatch) => {
        dispatch({
            type: CLASS_LIST_LOADING,
            payload: true
        })
        try {
            const res = await axios.get(`http://localhost:3000/classroom`);
            dispatch({
                type: CLASS_LIST_SUCCESS,
                payload: res
            })
        }
        catch (err) {
            dispatch({
                type: CLASS_LIST_FAILED,
                payload: err
            })
        }
    }
}

export const editClassList = (data) => {
    return async (dispatch) => {
        await axios.put(`http://localhost:3000/classroom/${data[0].id}`, data[0]);
        dispatch(getClassList())
    }
}

export const addNotification = (data) => {
    return async (dispatch) => {
        await axios.put(`http://localhost:3000/classroom/${data.id}`, data);
        dispatch(getClassList())
    }
}

export const deleteNotification = (id, data) => {
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:3000/classroom/${id}`);
        dispatch(addNotification({ ...res.data, 'notification': res.data.notification.filter(el => el.title !== data.title && el.description !== data.description && el.date !== data.date) }))
    }
}
