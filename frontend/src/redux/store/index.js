import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { createNoteReducer, deleteNoteReducer, getNoteReducer, getNotesReducer, updateNoteReducer } from '../reducers/notesReducer';
import { userLoginReducer, userRegisterReducer, userUpdatePropfileReducer } from '../reducers/userReducer';

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    updateProfile: userUpdatePropfileReducer,
    createNote: createNoteReducer,
    getNotes: getNotesReducer,
    updateNote: updateNoteReducer,
    deleteNote: deleteNoteReducer,
    getNote: getNoteReducer,
})

const user = JSON.parse(localStorage.getItem('user'));
const initialState = { userLogin: { user } };

const middlewares = [thunk];

const middleware = composeWithDevTools(applyMiddleware(...middlewares))

const store = createStore(
    reducer,
    initialState,
    middleware
);

export default store;