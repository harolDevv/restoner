import axios from "axios";
import { apiConnection } from "../../axios";
import { getPosts } from "../reducers/PostReducer";




export const getInformationPosts = (idBusiness , limit) => async (dispatch) => {
    try {
        const { data } = await apiConnection.get(`http://c-carta.restoner-api.fun/v1/web/business/data/${idBusiness}/post/${limit}`)
        dispatch(getPosts(data))
    } catch (error) {
        console.log(error);
    }
}