import axios from 'axios'

const instance = axios.create({
  baseURL: `${import.meta.env[`VITE_${import.meta.env['VITE_MODE']}_SERVER`]}`,
  // baseURL: 'http://jjolim.com',
  timeout: 10000,

})

export default instance