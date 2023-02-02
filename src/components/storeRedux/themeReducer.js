import { createSlice } from "@reduxjs/toolkit";


const initialThemeSlice={
    theme:'light'
};

const themeSlice=createSlice({
    name:'Theme',
    initialState:initialThemeSlice,
    reducers:{
        themeChangeHandler(state){
            state.theme=!state.theme
        }
    }
});

export const themeAction=themeSlice.actions;
export default themeSlice.reducer