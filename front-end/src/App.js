import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import Navigation from './Navigation'
import Tweets from './components/Tweets'
import Profile from './components/Profile'
import Home from './components/Home'
import HomePage from './components/HomePage'
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null
    }
    
  }

  render() {

    return (
    
      <div className="App">
        <Router>
        <Navigation />
        <Switch>
          <PrivateRoute exact path="/" component={HomePage}/>
          <Route exact path="/login" component={Home}/>
        </Switch>
      </Router>

        
      </div>
      
      
    )

  }

  
}

export default App;
