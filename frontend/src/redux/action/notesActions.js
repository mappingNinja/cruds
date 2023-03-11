import axios from 'axios';

import constants from '../../constants/index'

const {
    CREATE_NOTE_REQUEST,
    CREATE_NOTE_SUCCESS,
    CREATE_NOTE_FAIL,
    RESET_NOTE,
    GET_NOTES_REQUEST,
    GET_NOTES_SUCCESS,
    GET_NOTES_FAIL,
    GET_NOTE_REQUEST,
    GET_NOTE_SUCCESS,
    GET_NOTE_FAIL,
    UPDATE_NOTE_REQUEST,
    UPDATE_NOTE_SUCCESS,
    UPDATE_NOTE_FAIL,
    DELETE_NOTE_REQUEST,
    DELETE_NOTE_SUCCESS,
    DELETE_NOTE_FAIL,
} = constants;
const { REACT_APP_BACKEND_URL } = process.env;

export const createNote = (data, history) => async (dispatch, getState) => {
    const { userLogin: { user } } = getState();
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        }
    }
    dispatch({ type: CREATE_NOTE_REQUEST });
    await axios.post(`${REACT_APP_BACKEND_URL}/notes`, data, config).then((res) => {
        const { err, insert } = (res.data || {})
        if (err) {
            return dispatch({ type: CREATE_NOTE_FAIL, err })
        }
        dispatch({ type: CREATE_NOTE_SUCCESS, insert });
        return history('/notes');
    })
}

export const resetNote = () => async (dispatch) => {
    dispatch({ type: RESET_NOTE })
}

export const getNotes = (data) => async (dispatch, getState) => {
    const { userLogin: { user } } = getState();

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        }
    }
    dispatch({ type: GET_NOTES_REQUEST });
    await axios.post(`${REACT_APP_BACKEND_URL}/notes`, data, config).then((res) => {
        const { err, notes, counts } = (res.data || {})
        if (err) {
            return dispatch({ type: GET_NOTES_FAIL, err })
        }
        return dispatch({ type: GET_NOTES_SUCCESS, notes, counts });
    })
}

export const updateNotes = (data, fetchNote) => async (dispatch, getState) => {
    const { userLogin: { user } } = getState();

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        }
    }

    dispatch({ type: UPDATE_NOTE_REQUEST });

    await axios.post(`${REACT_APP_BACKEND_URL}/notes`, data, config).then((res) => {
        const { err, isUpdate } = (res.data || {});
        if (err) {
            return dispatch({ type: UPDATE_NOTE_FAIL, err });
        }
        dispatch({ type: UPDATE_NOTE_SUCCESS, isUpdate });
        return fetchNote();
    })

}

export const deleteNote = (data) => async (dispatch, getState) => {
    const { userLogin: { user } } = getState();
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        }
    }
    dispatch({ type: DELETE_NOTE_REQUEST });
    await axios.post(`${REACT_APP_BACKEND_URL}/notes`, data, config).then((res) => {
        const { err, deleted } = (res.data || {})
        if (err) {
            return dispatch({ type: DELETE_NOTE_FAIL, err })
        }
        dispatch({ type: DELETE_NOTE_SUCCESS, deleted });
        getNotes({ method: 'notes', submethod: 'get' })

    })
}

export const getNote = (data) => async (dispatch, getState) => {
    const { userLogin: { user } } = getState();
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
        }
    }
    dispatch({ type: GET_NOTE_REQUEST });
    await axios.post(`${REACT_APP_BACKEND_URL}/notes`, data, config).then((res) => {
        const { err, note } = (res.data || {})
        if (err) {
            return dispatch({ type: GET_NOTE_FAIL, err })
        }
        return dispatch({ type: GET_NOTE_SUCCESS, note });
    })
}