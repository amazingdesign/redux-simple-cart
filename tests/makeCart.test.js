import makeCart, { instances, getInstances } from '../src'

const INSTANCE_SHAPE = {
  reducer: expect.any(Function),
  actions: expect.any(Object),
  actionTypes: expect.any(Object),
}

describe('Main functions', () => {
  it('can cerate an instance', () => {
    expect(() => makeCart()).not.toThrow()
  })

  it('can get an instance through instances object', () => {
    expect(instances).toBeInstanceOf(Array)
    expect(instances[0]).toEqual(INSTANCE_SHAPE)
  })

  it('can get an instance through getInstances function', () => {
    expect(getInstances()).toBeInstanceOf(Array)
    expect(getInstances()[0]).toEqual(INSTANCE_SHAPE)
  })

  it('instance should be an object with actions and reducer', () => {
    const [instance] = getInstances()

    expect(instance).toEqual(INSTANCE_SHAPE)
  })

})

describe('Actions', () => {

  it('actions names should be same as actionTypes but lower-case', () => {
    const [instance] = getInstances()

    const { actions, actionTypes } = instance

    const actionTypesLowerCaseJoined = Object.keys(actionTypes).map((name) => name.toLowerCase()).join()
    const actionsJoined = Object.keys(actions).join()

    expect(actionTypesLowerCaseJoined).toBe(actionsJoined)
  })

  it('add should throw when no id is specified', () => {
    const [{ actions }] = getInstances()

    expect(() => actions.add()).toThrow('Must specify item id!')
  })

  it('add should throw when id is not a string', () => {
    const [{ actions }] = getInstances()

    expect(() => actions.add(12)).toThrow('Id must be a string')
  })


  it('add should throw when payload is not an object', () => {
    const [{ actions }] = getInstances()

    expect(() => actions.add('123', [])).toThrow('Payload must be object or undefined!')
  })

  it('remove should throw when no id is specified', () => {
    const [{ actions }] = getInstances()

    expect(() => actions.remove()).toThrow('Must specify item id!')
  })

  it('remove should throw when id is not a string', () => {
    const [{ actions }] = getInstances()

    expect(() => actions.remove(12)).toThrow('Id must be a string')
  })

  it('update should throw when no id is specified', () => {
    const [{ actions }] = getInstances()

    expect(() => actions.update()).toThrow('Must specify item id!')
  })

  it('update should throw when id is not a string', () => {
    const [{ actions }] = getInstances()

    expect(() => actions.update(12)).toThrow('Id must be a string')
  })

  it('update should throw when payload is not an object', () => {
    const [{ actions }] = getInstances()

    expect(() => actions.update('123', [])).toThrow('Payload must be object or undefined!')
  })

})

describe('Reducer', () => {

  it('should return initial state when no prev state is passed', () => {
    const [{ reducer }] = getInstances()

    expect(reducer()).toEqual({ items: [] })
  })

  it('should not change state when unknown action is passed', () => {
    const [{ reducer }] = getInstances()

    const state = {}

    expect(reducer(state, { type: 'UNKNOWN' })).toBe(state)
  })

  it('should add item to store', () => {
    const [{ reducer, actions }] = getInstances()

    const item = { id: '123', price: 100, quantity: 1 }
    const action = actions.add(item.id, item)

    expect(reducer(undefined, action)).toEqual({ items: [item] })
  })

  it('should add multiple items to store in order', () => {
    const [{ reducer, actions }] = getInstances()

    const item1 = { id: '123', price: 100, quantity: 1 }
    const item2 = { id: '321', price: 200, quantity: 2 }
    const action1 = actions.add(item1.id, item1)
    const action2 = actions.add(item2.id, item2)

    const stateAfterAction1 = reducer(undefined, action1)
    const stateAfterAction2 = reducer(stateAfterAction1, action2)

    expect(stateAfterAction1).toEqual({ items: [item1] })
    expect(stateAfterAction2).toEqual({ items: [item1, item2] })
  })

  it('should remove selected item', () => {
    const [{ reducer, actions }] = getInstances()

    const item1 = { id: '123', price: 100, quantity: 1 }
    const item2 = { id: '321', price: 200, quantity: 2 }
    const item3 = { id: '231', price: 300, quantity: 3 }
    const addAction1 = actions.add(item1.id, item1)
    const addAction2 = actions.add(item2.id, item2)
    const addAction3 = actions.add(item3.id, item3)
    const removeAction = actions.remove(item2.id)

    const stateAfterAction1 = reducer(undefined, addAction1)
    const stateAfterAction2 = reducer(stateAfterAction1, addAction2)
    const stateAfterAction3 = reducer(stateAfterAction2, addAction3)
    const stateAfterAction4 = reducer(stateAfterAction3, removeAction)

    expect(stateAfterAction4).toEqual({ items: [item1, item3] })
  })

  it('should clear all item', () => {
    const [{ reducer, actions }] = getInstances()

    const item1 = { id: '123', price: 100, quantity: 1 }
    const item2 = { id: '321', price: 200, quantity: 2 }
    const item3 = { id: '231', price: 300, quantity: 3 }
    const addAction1 = actions.add(item1.id, item1)
    const addAction2 = actions.add(item2.id, item2)
    const addAction3 = actions.add(item3.id, item3)
    const clearAction = actions.clear()

    const stateAfterAction1 = reducer(undefined, addAction1)
    const stateAfterAction2 = reducer(stateAfterAction1, addAction2)
    const stateAfterAction3 = reducer(stateAfterAction2, addAction3)
    const stateAfterAction4 = reducer(stateAfterAction3, clearAction)

    expect(stateAfterAction4).toEqual({ items: [] })
  })

  it('should update selected items item', () => {
    const [{ reducer, actions }] = getInstances()

    const item1 = { id: '123', price: 100, quantity: 1 }
    const item2 = { id: '321', price: 200, quantity: 2 }
    const newQuantity = { quantity: 4 }
    const item3 = { id: '231', price: 300, quantity: 3 }
    const addAction1 = actions.add(item1.id, item1)
    const addAction2 = actions.add(item2.id, item2)
    const addAction3 = actions.add(item3.id, item3)
    const updateAction = actions.update(item2.id, newQuantity)

    const stateAfterAction1 = reducer(undefined, addAction1)
    const stateAfterAction2 = reducer(stateAfterAction1, addAction2)
    const stateAfterAction3 = reducer(stateAfterAction2, addAction3)
    const stateAfterAction4 = reducer(stateAfterAction3, updateAction)

    expect(stateAfterAction4).toEqual({ items: [item1, { ...item2, ...newQuantity }, item3] })
  })

  it('multiple add same id should update quantity and update rest properties', () => {
    const [{ reducer, actions }] = getInstances()

    const item1 = { id: '123', price: 100, quantity: 1 }
    const item2 = { id: '321', price: 200, quantity: 2 }
    const item3 = { id: '123', price: 300, quantity: 1 }
    const item4 = { id: '123', price: 300, quantity: 4 }
    const addAction1 = actions.add(item1.id, item1)
    const addAction2 = actions.add(item2.id, item2)
    const addAction3 = actions.add(item3.id, item3)
    const addAction4 = actions.add(item4.id, item4)

    const stateAfterAction1 = reducer(undefined, addAction1)
    const stateAfterAction2 = reducer(stateAfterAction1, addAction2)
    const stateAfterAction3 = reducer(stateAfterAction2, addAction3)
    const stateAfterAction4 = reducer(stateAfterAction3, addAction4)

    expect(stateAfterAction4).toEqual({ items: [{ ...item4, quantity: 6 }, item2] })
  })

  it('multiple add same id should update quantity and update rest properties - v2', () => {
    const [{ reducer, actions }] = getInstances()

    const item1 = { id: '123', price: 100 }
    const item2 = { id: '321', price: 200, quantity: 2 }
    const item3 = { id: '123', price: 300 }
    const item4 = { id: '123', price: 300 }
    const addAction1 = actions.add(item1.id, item1)
    const addAction2 = actions.add(item2.id, item2)
    const addAction3 = actions.add(item3.id, item3)
    const addAction4 = actions.add(item4.id, item4)

    const stateAfterAction1 = reducer(undefined, addAction1)
    const stateAfterAction2 = reducer(stateAfterAction1, addAction2)
    const stateAfterAction3 = reducer(stateAfterAction2, addAction3)
    const stateAfterAction4 = reducer(stateAfterAction3, addAction4)

    expect(stateAfterAction4).toEqual({ items: [{ ...item4, quantity: 3 }, item2] })
  })

  it('multiple add same id should update quantity and update rest properties - v3', () => {
    const [{ reducer, actions }] = getInstances()

    const item1 = { id: '123', price: 100 }
    const item2 = { id: '321', price: 200, quantity: 2 }
    const item3 = { id: '123', price: 300, quantity: 1 }
    const item4 = { id: '123', price: 300, quantity: 1 }
    const addAction1 = actions.add(item1.id, item1)
    const addAction2 = actions.add(item2.id, item2)
    const addAction3 = actions.add(item3.id, item3)
    const addAction4 = actions.add(item4.id, item4)

    const stateAfterAction1 = reducer(undefined, addAction1)
    const stateAfterAction2 = reducer(stateAfterAction1, addAction2)
    const stateAfterAction3 = reducer(stateAfterAction2, addAction3)
    const stateAfterAction4 = reducer(stateAfterAction3, addAction4)

    expect(stateAfterAction4).toEqual({ items: [{ ...item4, quantity: 3 }, item2] })
  })

  it('multiple add same id should update quantity and update rest properties - v4', () => {
    const [{ reducer, actions }] = getInstances()

    const item1 = { id: '123', price: 100, quantity: 2 }
    const item2 = { id: '321', price: 200, quantity: 2 }
    const item3 = { id: '123', price: 300 }
    const item4 = { id: '123', price: 300 }
    const addAction1 = actions.add(item1.id, item1)
    const addAction2 = actions.add(item2.id, item2)
    const addAction3 = actions.add(item3.id, item3)
    const addAction4 = actions.add(item4.id, item4)

    const stateAfterAction1 = reducer(undefined, addAction1)
    const stateAfterAction2 = reducer(stateAfterAction1, addAction2)
    const stateAfterAction3 = reducer(stateAfterAction2, addAction3)
    const stateAfterAction4 = reducer(stateAfterAction3, addAction4)

    expect(stateAfterAction4).toEqual({ items: [{ ...item4, quantity: 4 }, item2] })
  })

})
