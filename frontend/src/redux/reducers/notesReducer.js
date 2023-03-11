
import constants from '../../constants/index';

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
    GET_NOTES_RESET,
    UPDATE_NOTE_REQUEST,
    UPDATE_NOTE_SUCCESS,
    UPDATE_NOTE_FAIL,
    DELETE_NOTE_REQUEST,
    DELETE_NOTE_SUCCESS,
    DELETE_NOTE_FAIL,
} = constants;
const initialState = {}

export const createNoteReducer = (state = initialState, action) => {
    const { type, insert, err } = action;
    switch (type) {
        case CREATE_NOTE_REQUEST:
            return { loading: true }
        case CREATE_NOTE_SUCCESS:
            return { loading: false, insert };
        case CREATE_NOTE_FAIL:
            return { loading: false, err };
        case RESET_NOTE:
            return initialState;
        default:
            return state;
    }
};

export const getNotesReducer = (state = initialState, action) => {
    const { type, notes, counts, err } = action;
    switch (type) {
        case GET_NOTES_REQUEST:
            return { loading: true }
        case GET_NOTES_SUCCESS:
            return { loading: false, notes, counts };
        case GET_NOTES_FAIL:
            return { loading: false, err };
        case RESET_NOTE:
            return initialState;
        default:
            return state;
    }
}

export const updateNoteReducer = (state = initialState, action) => {
    const { type, isUpdate, err } = action;
    switch (type) {
        case UPDATE_NOTE_REQUEST:
            return { loading: true }
        case UPDATE_NOTE_SUCCESS:
            return { loading: false, isUpdate };
        case UPDATE_NOTE_FAIL:
            return { loading: false, err };
        case RESET_NOTE:
            return initialState;
        default:
            return state;
    }
}

export const deleteNoteReducer = (state = initialState, action) => {
    const { type, deleted, err } = action;
    switch (type) {
        case DELETE_NOTE_REQUEST:
            return { loading: true }
        case DELETE_NOTE_SUCCESS:
            return { loading: false, deleted };
        case DELETE_NOTE_FAIL:
            return { loading: false, err };
        case RESET_NOTE:
            return initialState;
        default:
            return state;
    }
}

export const getNoteReducer = (state = initialState, action) => {
    const { type, note, err } = action;
    switch (type) {
        case GET_NOTE_REQUEST:
            return { loading: true }
        case GET_NOTE_SUCCESS:
            return { loading: false, note };
        case GET_NOTE_FAIL:
            return { loading: false, err };
        case RESET_NOTE:
            return initialState;
        default:
            return state;
    }
}