[![Test Coverage](https://api.codeclimate.com/v1/badges/7e9de950cc2b8274a0ea/test_coverage)](https://codeclimate.com/github/amazingdesign/redux-simple-cart/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/7e9de950cc2b8274a0ea/maintainability)](https://codeclimate.com/github/amazingdesign/redux-simple-cart/maintainability)

# redux-simple-cart

## Installation

`npm i redux-simple-cart`

It has only one peer dependency - `"redux": "4.x"` ofc ;)

## Usage

Just import default function from the package and call it with name of cart. You can initialize multiple cart in one project.

```javascript
import { makeCart } from 'redux-simple-cart'

const mainReducer = combineReducers({
  cart: makeCart('cart').reducer,
})
```

`makeCart` function returns an in shape listed in below pseudo-code

```javascript
{
  reducer, // a redux reducer function
  actions: { // actions creator functions
    add: (id, payload) => { ... }, // add an item, id should be string and payload is optional object
    remove: (id) => { ... }, // removes item from store by id
    update: (id, payload) => { ... }, // update item in store by payload
    clear: () => { ... }, // clear all items
  },
  actionTypes: { // action types
    ADD,
    REMOVE,
    UPDATE,
    CLEAR,
  },
}
```

You can always get an instance(s) of cart by `getInstances`

```javascript
import { getInstances } from 'redux-simple-cart'

const [instance] = getInstances()
```

So to add an item you should:

You can always get an instance(s) of cart by `getInstances`

```javascript
import { getInstances } from 'redux-simple-cart'
import { store } from './store'

const [ instance ] = getInstances()

store.dispatch(instance.actions.add('123', { price: 100, quantity: 1 }))
```

Store shape is:

```javascript
{
  cart: {
    items: []
  }
}
```
