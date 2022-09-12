import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    rangosHorarios: []
}
const RangosHorariosReducer = createSlice({
    name: 'RangosHorarios',
    initialState,
    reducers: {
        getRangos : (state,action) =>{
            state.rangosHorarios = action.payload
        },
    }
})

export const {getRangos} = RangosHorariosReducer.actions;
export default RangosHorariosReducer.reducer;