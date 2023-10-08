'use client'

const reducer = (globalState: any, action: any) => {
  switch (action.type) {
    case 'SET_ANALYZE_SHAPES_RESULT':
      return {
        ...globalState,
        analyzeShapesResult: action.payload
      }
    case 'SET_NEW_POLYGONS':
      return {
        ...globalState,
        newPolygons: action.payload
      }
    case 'SET_NEW_DEVICES':
      return {
        ...globalState,
        newDevices: action.payload
      }
    case 'SET_NEW_DEVICE_SUGGESTIONS':
      return {
        ...globalState,
        newDeviceSuggestions: action.payload
      }
    case 'SET_DEVICE_TYPE_SUGGESTIONS':
      return {
        ...globalState,
        deviceTypesSuggestions: action.payload
      }
    default:
      return globalState
  }
}
export default reducer
