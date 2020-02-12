export const instances = []
export const getInstances = () => instances

export const makeCart = (cartName) => {
  const instance = {}

  instances.push(instance)

  return instance
}

export default makeCart