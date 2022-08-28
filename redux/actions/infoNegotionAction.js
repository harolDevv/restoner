import axios from "axios";
import { apiConnection } from "../../axios";
import { getInfo } from "../reducers/infoNegocioReducer";



export const getInfoNegotion = (uniquename) => async (dispatch) => {
    try {
        const { data } = await apiConnection.get(`http://c-carta.restoner-api.fun/v1/web/business/data/${uniquename}/information `)
        dispatch(getInfo(data))
    } catch (error) {
        console.log(error);
    }
}