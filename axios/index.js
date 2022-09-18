import axios from 'axios'
import { useSelector } from 'react-redux';




const DEV_URL = 'http://localhost:3000/'
const DEV_VERCEL = 'http://c-carta.restoner-api.fun/'
const apikey =  `asdlKF0234nM0F9n-fpdkf'0234i8f-fdMNFDO98sdfdf-ewfw490erm0weiur03nrfwe`;
const DEV_REGISTRO = `http://c-registro-authenticacion.restoner-api.fun/`
const DEV_RECUPERAR = `http://c-registro-authenticacion.restoner-api.fun/v1/recover`
const DEV_PEDIDO = `http://c-a-pedidos.restoner-api.fun/v3/order/comensales`
export const apiConnection = axios.create({
    baseURL: DEV_VERCEL,
    headers: {
      'apikey' : apikey
    }
  });

export const apiRegistro = axios.create({
    baseURL: DEV_REGISTRO,
    headers: {
      'apikey' : apikey
    }
  });
export const apiRecuperar = axios.create({
    baseURL: DEV_RECUPERAR,
    headers: {
      'apikey' : apikey
    }
  });
export const apiPedido = axios.create({
    baseURL: DEV_PEDIDO,
    headers: {
      'apikey' : apikey
    }
  });