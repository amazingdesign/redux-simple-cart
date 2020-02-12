import makeActionTypes from './makeActionTypes'
import makeActions from './makeActions'
import makeReducer from './makeReducer'

export const instances = []
export const getInstances = () => instances

export const makeCart = (cartName) => {
  const actionTypes = makeActionTypes(cartName)

  const instance = {
    actionTypes: makeActionTypes(cartName),
    actions: makeActions(cartName, actionTypes),
    reducer: makeReducer(cartName, actionTypes),
  }

  instances.push(instance)

  return instance
}

export default makeCart