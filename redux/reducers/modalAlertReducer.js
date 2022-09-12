import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    mostrarModal: false
}
const MostrarModalReducer = createSlice({
    name: 'mostrarModal',
    initialState,
    reducers: {
        changeMostrar: (state,action) =>{
            state.mostrarModal = action.payload
        }
    }
})

export const {changeMostrar} = MostrarModalReducer.actions;
export default MostrarModalReducer.reducer;