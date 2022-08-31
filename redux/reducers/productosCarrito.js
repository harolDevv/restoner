import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    carrito: []
}
const productosCarrito = createSlice({
    name: 'productosCarrito',
    initialState,
    reducers: {
        getProductos : (state,action) =>{
            state.carrito = action.payload
        },
        addProducto: (state,action) => {
            state.carrito = [...state.carrito , action.payload]
        },
        deleteOneProducto : (state, action) => {
            state.carrito = state.carrito.find(item => item.id === action.payload)
        },
        deleteProducto : (state, action) => {
            state.carrito = state.carrito.filter(item => item.id != action.payload)
        },
        clearCarrito: (state,action) => {
            state.carrito = []
        }
    }
})

export const {getProductos,addProducto,deleteProducto, clearCarrito,deleteOneProducto} = productosCarrito.actions;
export default productosCarrito.reducer;