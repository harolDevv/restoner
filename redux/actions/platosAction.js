import axios from "axios";
import { apiConnection } from "../../axios";
import { getPlatosDeldia } from "../reducers/platosReducer";




export const getPlatosDelDiaAction = (idBusiness, date, elements) => async (dispatch) => {
    try {
        const { data } = await apiConnection.get(`http://c-carta.restoner-api.fun/v1/web/business/data/${idBusiness}/menu/${date}/elements/${elements}`)
        dispatch(getPlatosDeldia(data))
    } catch (error) {
        console.log(error);
    }
}