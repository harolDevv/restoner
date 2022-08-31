import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    platos: []
}
const platosDelDiaReducer = createSlice({
    name: 'platos',
    initialState,
    reducers: {
        getPlatosDeldia : (state,action) =>{
            state.platos = action.payload
        }
    }
})

export const {getPlatosDeldia} = platosDelDiaReducer.actions;
export default platosDelDiaReducer.reducer;