import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import profileReducer from "./slices/profileSlice";
import courseReducer from './slices/courseSlice'
import viewReducer from "./slices/viewCourseSlice";
import notesReducer from './slices/notesSlice'

 const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    profile: profileReducer,
    course: courseReducer,
    viewCourse: viewReducer,
    notes: notesReducer
});

export default rootReducer;