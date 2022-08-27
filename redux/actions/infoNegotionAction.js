import axios from "axios";
import { apiConnection } from "../../axios";
import { getInfo } from "../reducers/infoNegocioReducer";



export const getInfoNegotion = (uniquename) => async (dispatch) => {
    try {
        console.log('se ejecuto la accion');
        const { data } = await apiConnection.get(`http://c-carta.restoner-api.fun/v1/web/business/data/${uniquename}/information `)
        console.log('data',data);
        dispatch(getInfo(data))
    } catch (error) {
        console.log(error);
    }
}