import axios from "axios";
import { apiConnection } from "../../axios";
import { getRangos } from "../reducers/RangosHorariosReducer";


export const getAllRangos = (idbusiness , fecha) => async (dispatch) => {
    try {
        const { data } = await apiConnection.get(`http://c-carta.restoner-api.fun/v1/web/business/data/${idbusiness}/menu/${fecha}/scheduleranges`)
        dispatch(getRangos(data))
    } catch (error) {
        console.log(error);
    }
}
