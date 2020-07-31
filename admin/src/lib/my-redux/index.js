export function createStore(reducer) {
  let state = reducer(undefined, { type: '@redux' })
  let listeners = []
  function getState() {
    return state
  }
  function dispatch(action) {
    const newState = reducer(state, action)
    state = newState
    listeners.forEach(listener => listener())
  }
  function subscribe(listener) {
    listeners.push(listener)
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}
export function combineReducers(reducers) {
  console.log(reducers, Object.keys(reducers))
  return (state = {}, action) => {
    const totalState = Object.keys(reducers).reduce((preState, key) => {
      preState[key] = reducers[key](state[key], action)
      return preState
    }, {})
    console.log(totalState)
    return totalState
  }
}