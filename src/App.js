import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import 'react-tabs/style/react-tabs.css';
import Footer from './components/footer/footer'
import LoginPage from './views/loginpage/loginpage'
import RecognitionPage from './views/recognitionpage/recognitionpage';
import ReplacementPage from './views/replacementpage/replacementpage';
import HomePage from './views/homepage/homepage';

const initialState = {
  route: 'signin',
  signedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: ''
  },
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'default',
      signedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''
      },
    }
  }

  // Loads and set the user data after a successful login
  loadUser = (user) => {
    this.clearState()
    this.setState({
      signedIn: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    })
  }

  clearState = () => {
    this.setState(initialState)
  }

  resetDetails = () => {
    this.setState({
      signedIn: false,
    })
  }

  // Sets the current route which is used for page changing
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.clearState()
    }
    this.setState({ route: route })
  }

  // Calls the Re-Do API to delete the current user from the database
  deleteUser = () => {
    console.log("Deleting User ID = ", this.state.user)
    fetch("https://blooming-escarpment-18824.herokuapp.com/deleteuser", {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: this.state.user,
      })
    })
      .then(response => response.json())
  }

  render() {
    const { signedIn, route, user } = this.state
    return (
      <div className="App">
        <Navigation
          onRouteChange={this.onRouteChange}
          signedIn={signedIn}
          deleteUser={this.deleteUser}
        />
        {route === 'signin' || route === 'register' ?
          <LoginPage
            route={route}
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
            signedIn={this.signedIn} />
          : route === 'recognition' ?
            <RecognitionPage onRouteChange={this.onRouteChange}
              user={user}
              signedIn={signedIn}
            />
            : route === 'replacement' ?
              <ReplacementPage onRouteChange={this.onRouteChange}
                user={user}
                signedIn={signedIn} />
              :
              <div>
                <HomePage
                  onRouteChange={this.onRouteChange}
                  loadUser={this.loadUser}
                  route={route} >
                </HomePage>
              </div>
        }
        <Footer />
      </div>
    );
  }
}

export default App;
