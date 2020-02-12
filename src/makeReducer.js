export const makeReducer = (cartName, actionTypes) => {
  const initialState = {
    items: [],
  }

  return (state = initialState, action = {}) => {
    const actionItem = Object.entries(action).reduce(
      (r, [key, val]) => (key === 'type' ? r : { ...r, [key]: val }),
      {}
    )

    switch (action.type) {
      case actionTypes.ADD:
        return {
          ...state,
          items: state.items.concat(actionItem),
        }
      case actionTypes.UPDATE:
        return {
          ...state,
          items: state.items.map(
            (item) => item.id === actionItem.id ? { ...item, ...actionItem } : item
          ),
        }
      case actionTypes.CLEAR:
        return {
          ...state,
          items: [],
        }
      case actionTypes.REMOVE:
        return {
          ...state,
          items: state.items.filter((item) => item.id !== actionItem.id),
        }
      default:
        return state
    }
  }
}

export default makeReducer