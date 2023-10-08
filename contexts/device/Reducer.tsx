'use client'

const reducer = (globalState: any, action: any) => {
  switch (action.type) {
    case 'SET_VIEW_CHILD':
      return {
        ...globalState,
        viewChild: action.payload
      }
    case 'SET_DEVICE':
      return {
        ...globalState,
        device: action.payload
      }
    case 'SET_DEVICE_CHILDS':
      return {
        ...globalState,
        deviceChilds: action.payload
      }
    default:
      return globalState
  }
}
export default reducer
