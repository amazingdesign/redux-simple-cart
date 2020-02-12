const checkId = (id) => {
  if (!id) throw new Error('Must specify item id!')
  if (typeof id !== 'string') throw new Error('Id must be a string')
}

const makeAction = (actionTypes, type) => {
  switch (type) {
    case actionTypes.CLEAR:
      return () => ({ type })
    case actionTypes.REMOVE:
      return (id) => {
        checkId(id)
        return { type, id }
      }
    default:
      return (id, payload = {}) => {
        checkId(id)
        if (
          typeof payload !== 'object' ||
          Array.isArray(payload)
        ) throw new Error('Payload must be object or undefined!')
        return { type, id, ...payload }
      }
  }
}

export const makeActions = (cartName, actionTypes) => {
  const actions = Object.entries(actionTypes).reduce(
    (r, [typeName, type]) => {
      return {
        ...r,
        [typeName.toLowerCase()]: makeAction(actionTypes, type),
      }
    },
    {}
  )

  return actions
}

export default makeActions