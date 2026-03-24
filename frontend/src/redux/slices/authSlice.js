import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null, 
    branding: null,
}

const authSlice = createSlice(
    {
        name: "auth",
        initialState: initialState,
        reducers:{
            setSignupData(state,action){
                state.signupData = action.payload;
            },
            setLoading(state,action){
                state.loading = action.payload;
            },
            setToken(state,action){
                state.token = action.payload;
            },
            setBranding(state, action) {
                state.branding = action.payload;
            }
        }
    
    }
);

export const {setSignupData, setLoading, setToken, setBranding} = authSlice.actions;
export default authSlice.reducer;