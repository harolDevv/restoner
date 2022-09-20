import axios from "axios";
import Swal from "sweetalert2";
import { apiConnection, apiRegistro } from "../../axios";
import { closeSesion, getDireccionesUsuario, getInfoUsuario } from "../reducers/usuarioReducer";
import { changeMostrar } from '../../redux/reducers/modalAlertReducer';



export const getAllInfoUser = (objIngresar, rememberMe) => async (dispatch) => {
    try {
        const {data} = await apiRegistro.post(`http://c-registro-authenticacion.restoner-api.fun/v1/login ` , objIngresar)
        dispatch(getInfoUsuario(data))
        if(rememberMe){
            localStorage.setItem('login' , JSON.stringify(data))
        }
        Swal.fire({
            icon:'success',
            title: 'Bienvenido',
            showConfirmButton: false,
            timer: 1700,
            text: 'Ingresaste a tu cuenta :,)',
          })
          dispatch(changeMostrar(false))
    } catch (error) {
        Swal.fire({
            icon:'error',
            title: 'Contraseña y/o numero incorrectos',
            showConfirmButton: false,
            timer: 1700,
            text: ':,(',
            iconColor: '#ff0d4a'
          })
    }
}
export const CerrarSesion = () => async (dispatch) => {
    try {
        Swal.fire({
            icon:'warning',
            title: 'Sesión Cerrada',
            showConfirmButton: false,
            timer: 1900,
            text: 'Nos vemos pronto <3',
            iconColor: '#ff0d4a'
          })
        return dispatch(closeSesion())
    } catch (error) {
    }
}
export const GetAllDirecciones = (token) => async (dispatch) => {
    const config = {
        headers: { 
            Authorization: `${token}`,
        }
    };
    try {
        const { data } = await axios.get(
            `http://c-registro-authenticacion.restoner-api.fun/v1/comensal/address`
            , config)
        dispatch(getDireccionesUsuario(data))
    } catch (error) {
    }
}

