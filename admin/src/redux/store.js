import { createStore, applyMiddleware } from 'redux'
// import {createStore} from '../lib/my-redux'

import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers'
import thunk from 'redux-thunk'
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
// export default createStore(reducer)
