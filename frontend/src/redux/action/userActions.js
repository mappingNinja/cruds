import axios from 'axios';

import constants from '../../constants/index'

const { REACT_APP_BACKEND_URL } = process.env;
const {
    USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET
} = constants;

export const login = (data) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST });

    await axios.post(REACT_APP_BACKEND_URL, data).then((res) => {
        const { err } = (res.data || {});
        if (err) {
            return dispatch({ type: USER_LOGIN_FAIL, err })
        }

        localStorage.setItem('user', JSON.stringify(res.data));
        return dispatch({ type: USER_LOGIN_SUCCESS, user: res.data })
    })
}

export const register = (payload) => async (dispatch) => {
    const { password, confirmPassword } = payload;
    dispatch({ type: USER_REGISTER_REQUEST });
    if (password !== confirmPassword) {
        return dispatch({ type: USER_REGISTER_FAIL, err: 'Passwords are not match' });
    }

    await axios.post(REACT_APP_BACKEND_URL, payload).then((res) => {
        const { err } = (res?.data || {});
        if (err) {
            return dispatch({ type: USER_REGISTER_FAIL, err })
        }
        localStorage.setItem('user', JSON.stringify(res.data));
        dispatch({ type: USER_REGISTER_SUCCESS, user: res.data });
        dispatch({ type: USER_LOGIN_SUCCESS, user: res.data });
        return false;
    })
}

export const updateProfile = (payload) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST });

    const { userLogin: { user } } = getState();
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        }
    }

    await axios.post(REACT_APP_BACKEND_URL, payload, config).then((res) => {
        const { err } = (res?.data || {});
        if (err) {
            return dispatch({ type: USER_UPDATE_FAIL, err });
        }
        localStorage.setItem('user', JSON.stringify(res.data));
        dispatch({ type: USER_UPDATE_SUCCESS, user: res.data });
        dispatch({ type: USER_LOGIN_SUCCESS, user: res.data });
        return false;
    })
}


export const logout = () => async (dispatch) => {
    localStorage.removeItem('user');
    return dispatch({ type: USER_LOGOUT })
}

export const resetUserField = async (dispatch) => {
    return dispatch({ type: USER_UPDATE_RESET })
}