import axios from 'axios'
import {ApiConfig, shouldLogApi} from '../data/config'

export default function request(param: any, config: any, isUpload = false, header = {}) {
  const {base_url, endpoint, method, data} = config

  let url = `${ApiConfig.baseUrl}${endpoint}`

  if (base_url) {
    url = `${base_url}${endpoint}`
  }

  console.log(url)

  const params = {
    ...param,
    ...data,
  }

  let token = localStorage.getItem('token')

  let headers = {}
  if (isUpload) {
    headers = {
      ...header,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
  } else {
    headers = {
      ...header,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }

  var axiosConfig: any = {
    method,
    url,
    headers,
    timeout: ApiConfig.timeout * 1000,
  }

  var bodyFormData = new FormData()

  if (isUpload) {
    bodyFormData.append('image', data.image)
    axiosConfig.data = bodyFormData
  } else {
    if (method.toUpperCase() === 'GET') {
      axiosConfig.params = params
    } else {
      axiosConfig.data = params
    }
  }

  if (shouldLogApi) {
    console.log(
      '[request start]\n\n-url: ',
      url,
      '\n\n-method: ',
      method,
      '\n\n-params: ',
      params,
      '\n\n-config: ',
      axiosConfig
    )
  }

  return new Promise((resolve, reject) => {
    axios(axiosConfig)
      .then((response) => {
        if (shouldLogApi) {
          console.log(
            '[response received]\n\n-url: ',
            url,
            '\n\n-method: ',
            method,
            '\n\n-params: ',
            params,
            '\n\n-response: ',
            response
          )
        }

        const body = response.data
        resolve(body)
      })
      .catch((err) => {
        if (shouldLogApi) {
          console.log(
            '[response error]\n\n-url: ',
            url,
            '\n\n-method: ',
            method,
            '\n\n-params: ',
            params,
            '\n\n-response: ',
            err
          )
        }
        if (err?.response?.status === 401) {
          alert('Sesi anda sudah habis, silahkan login ulang')
          localStorage.removeItem('token')
          window.location.reload()
          return
        }

        reject({
          status: err.response && err.response.status ? err.response.status : 999,
          code: 'x999',
          message: err.message,
          error: err,
        })
      })
  })
}
