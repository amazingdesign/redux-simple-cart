import defaultImport from '../src'

describe('Example test', () => {
  it('should import default ant it should be a function!', () => {
    expect(() => defaultImport()).not.toThrow()
  })
})