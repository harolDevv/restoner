import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categoriesBussines: []
}
const categoriesReducer = createSlice({
    name: 'categoriesBussines',
    initialState,
    reducers: {
        getInfoCategories : (state,action) =>{
            state.categoriesBussines = action.payload
        }
    }
})

export const {getInfoCategories} = categoriesReducer.actions;
export default categoriesReducer.reducer;