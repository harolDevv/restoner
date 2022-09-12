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
            console.log(action.payload);
            let itemInCart = state.carrito.find(item => item.idelement === action.payload.idelement)
            console.log(itemInCart);
            itemInCart ?  
            state.carrito = state.carrito.map(item => item.idelement === action.payload.idelement ? {
                ...item, quantity: item.quantity + 1
            }: item)
            : 
            state.carrito = [...state.carrito ,{...action.payload , quantity:1}]
            
        },
        deleteOneProducto : (state, action) => {
            let itemInCartDelete = state.carrito.find(item => item.idelement === action.payload.idelement)
            itemInCartDelete.quantity > 1 ?
            state.carrito = state.carrito.map(item => item.idelement === action.payload.idelement ?{... item ,
            quantity: item.quantity - 1} : item)
            :
            state.carrito = state.carrito.filter(item => item.idelement != action.payload.idelement)
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