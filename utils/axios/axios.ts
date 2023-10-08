import axios from 'axios'

export const clientNetworkInventoryAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NETWORKINVENTORY_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NETWORKINVENTORY_TOKEN}`
    //'ngrok-skip-browser-warning': true
  },
  withCredentials: true
})

clientNetworkInventoryAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true
      return clientNetworkInventoryAxios(prevRequest)
    }
    return Promise.reject(error)
  }
)

export const serverNetworkInventoryAxios = axios.create({
  baseURL: process.env.NETWORKINVENTORY_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NETWORKINVENTORY_TOKEN}`,
    'ngrok-skip-browser-warning': true
  },
  withCredentials: true
})
