import React, { Component } from 'react'
import Chat from './container/Chat'
import Login from './container/Login/index.js'
import Register from './container/Register/index.js'
import Rooms from './container/Rooms/index.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/chat/:room" component={Chat} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/rooms" component={Rooms} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
