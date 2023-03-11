import constants from '../../constants/index'

const {
    USER_LOGIN_REQUEST, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET
} = constants;
const initialState = {}

export const userLoginReducer = (state = initialState, action) => {
    const { type, user, err } = (action || {});

    switch (type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, user }
        case USER_LOGIN_FAIL:
            return { loading: false, err }
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
}

export const userRegisterReducer = (state = initialState, action) => {
    const { type, user, err } = (action || {});
    switch (type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, user }
        case USER_REGISTER_FAIL:
            return { loading: false, err }
        default:
            return state;
    }
}

export const userUpdatePropfileReducer = (state = initialState, action) => {
    const { type, user, err, success = true } = (action || {});
    switch (type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, user, success }
        case USER_UPDATE_FAIL:
            return { loading: false, err }
        case USER_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}