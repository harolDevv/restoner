import axios from 'axios'

const DEV_URL = 'http://localhost:3000/'
const apikey =  `asdlKF0234nM0F9n-fpdkf'0234i8f-fdMNFDO98sdfdf-ewfw490erm0weiur03nrfwe`;

export const apiConnection = axios.create({
    baseURL: DEV_URL,
    headers: {
      'apikey' : apikey
    }
  });