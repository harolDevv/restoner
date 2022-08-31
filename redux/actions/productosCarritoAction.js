import axios from "axios";
import { apiConnection } from "../../axios";
import { addProducto, clearCarrito, deleteOneProducto, deleteProducto, getProductos } from "../reducers/productosCarrito";




export const addToCart = (plato) => async (dispatch) => {
    try {
        dispatch(addProducto(plato))
    } catch (error) {
        console.log(error);
    }
}
export const deleteFromCart = (id, all = false) => async (dispatch) => {
    try {
        if(all === true){
            dispatch(deleteProducto(id))
        }
        dispatch(deleteOneProducto(id))
    } catch (error) {
        console.log(error);
    }
}
export const clearCart = () => async (dispatch) => {
    try {
        dispatch(clearCarrito())
    } catch (error) {
        console.log(error);
    }
}
// export const addToCart = (uniquename) => async (dispatch) => {
//     try {
//         const { data } = await apiConnection.get(`http://c-carta.restoner-api.fun/v1/web/business/data/${uniquename}/information `)
//         dispatch(getInfo(data))
//     } catch (error) {
//         console.log(error);
//     }
// }