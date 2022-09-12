import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    usuario: [],
    direccionesUsuario:[]

}
const UsuarioReducer = createSlice({
    name: 'Usuario',
    initialState,
    reducers: {
        getInfoUsuario : (state,action) =>{
            state.usuario = action.payload
        },
        closeSesion : (state,action) =>{
            state.usuario = []
        },
        getDireccionesUsuario: (state,action) => {
            state.direccionesUsuario = action.payload
        }
    }
})

export const {getInfoUsuario , closeSesion, getDireccionesUsuario} = UsuarioReducer.actions;
export default UsuarioReducer.reducer;