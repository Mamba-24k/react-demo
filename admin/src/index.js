import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import './assets/css/reset.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'

// import { Provider } from './lib/my-react-redux'
// import Counter from './components/counter'
// import ConnectCounter from './containers/connectCounter'

import store from './redux/store'
ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <Counter store={store}/> */}
    <Provider store={store}>
      <App />
    </Provider>
    ,
   </BrowserRouter>,
  //  </React.StrictMode>,
  document.getElementById('root')
);
// store.subscribe(() => {
//   ReactDOM.render(
//     // <React.StrictMode>
//     <BrowserRouter>
//       <Counter store={store}/>,
//      </BrowserRouter>,
//     //  </React.StrictMode>,
//     document.getElementById('root')
//   );
// })


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
