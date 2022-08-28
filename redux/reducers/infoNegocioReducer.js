import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    infoNegocio: []
}
const infoNegocioRestoner = createSlice({
    name: 'infoNegocio',
    initialState,
    reducers: {
        getInfo : (state,action) =>{
            state.infoNegocio = action.payload
        }
    }
})

export const {getInfo} = infoNegocioRestoner.actions;
export default infoNegocioRestoner.reducer;