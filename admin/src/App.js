import React from 'react';
import { Route, Switch } from 'react-router-dom'

// import './App.css';
import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'
import Timer from './pages/timer';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/timer' component={Timer} />
        <Route path='/' component={Admin} />
      </Switch>
    </div>
  );
}

export default App;
