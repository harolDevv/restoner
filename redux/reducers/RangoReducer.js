import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    RangoEntrega: [],
    RangoEntregaUserAddress: [],
    circleRanges: []
}
const RangoEntregaReducer = createSlice({
    name: 'EstoyEnElRango',
    initialState,
    reducers: { 
        getRange : (state,action) =>{
            state.RangoEntrega = action.payload
        },
        getRangeUser : (state,action) =>{
            state.RangoEntregaUserAddress = action.payload
        },
        getCircleRanges : (state,action) =>{
            state.circleRanges = action.payload
        }
    }
})

export const {getRange , getRangeUser,getCircleRanges} = RangoEntregaReducer.actions;
export default RangoEntregaReducer.reducer;