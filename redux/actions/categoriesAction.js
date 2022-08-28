import axios from "axios";
import { apiConnection } from "../../axios";
import {getInfoCategories} from '../reducers/categoriesReducer'



export const getInfoCategoriesAction = (idBussiness,date) => async (dispatch) => {
    try {
        console.log('se ejecuto la accion');
        const { data } = await apiConnection.get(`http://c-carta.restoner-api.fun/v1/web/business/data/${idBussiness}/menu/${date}/categories`)
        dispatch(getInfoCategories(data))
    } catch (error) {
        console.log(error);
    }
}