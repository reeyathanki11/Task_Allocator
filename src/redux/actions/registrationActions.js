import axios from "axios";
import { AUTH_GET_FAILED, AUTH_GET_LOADING, AUTH_GET_SUCCESS } from "../types/AuthTypes";
export const signInAction = (data, nav) => {
  return async (dispatch) => {

    dispatch({
      type: AUTH_GET_LOADING,
      payload: true
    })
    try {
      const res = await axios.get("http://localhost:3000/profile");
      const temp = res.data.filter(el => el.email === data.email && el.pass === data.pass)
      if (temp.length) {
        dispatch({
          type: AUTH_GET_SUCCESS,
          payload: temp
        })
        localStorage.setItem("email", data.email)
        localStorage.setItem("pass", data.pass)
        localStorage.setItem("profile", JSON.stringify(temp))
        nav("/home")
      }
      else {
        dispatch({
          type: AUTH_GET_FAILED,
          payload: "Wrong Password."
        })
      }
    }
    catch (err) {
      dispatch({
        type: AUTH_GET_FAILED,
        payload: "Something went wrong"
      })
    }
  };
};


export const getUserData = (id) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_GET_LOADING,
      payload: true
    })
    const res = await axios.get(`http://localhost:3000/profile/${id}`);
    dispatch({
      type: AUTH_GET_SUCCESS,
      payload: [res.data]
    })
  }
}


export const logout = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch({
      type: AUTH_GET_FAILED,
      payload: false
    })
  }
}