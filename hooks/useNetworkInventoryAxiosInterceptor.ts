import { clientNetworkInventoryAxios } from '@/utils/axios/axios'
import { useEffect } from 'react'

const useNetworkInventoryAxiosInterceptor = () => {
  const auth = true
  useEffect(() => {
    const responseIntercept =
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

    return () => {
      clientNetworkInventoryAxios.interceptors.response.eject(responseIntercept)
    }
  }, [auth])

  return clientNetworkInventoryAxios
}

export default useNetworkInventoryAxiosInterceptor
