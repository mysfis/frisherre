import axios from 'axios'
import { useAuth } from 'context/auth'

function client(method, endpoint, {data, ...customConfig} = {}) {
    
    const headers = {
      ...customConfig.headers,
      'content-type': 'application/json'
    }

    const token = localStorage.getItem('token')

    if (token) {
      headers.Authorization = `Token ${token}`
    }

    const config = {
      method: method,
      url: endpoint,
      ...customConfig,
      headers,
    }
    if (data) {
      config.data = data
    }

    console.log(config)
  
    return axios(config)
  }
  
  export default client