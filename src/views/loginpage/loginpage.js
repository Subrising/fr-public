import React, { Component } from 'react';
import SignIn from '../../components/SignIn/SignIn'
import Register from '../../components/Register/Register'
import '../../../src/assets/css/loginpage.css'

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { route, loadUser, onRouteChange, signedIn } = this.props
        return (
            <div class="w-100 cover center" style={{ backgroundImage: `url('./BP-Test.jpg')`, position: 'relative' }} >
                <div class="pa5 pb5 pb6-m pb7-l bg-black-50 w-100 h-100 center">
                    {route === 'signin' ?
                        <SignIn route={route} loadUser={loadUser} onRouteChange={onRouteChange} signedIn={signedIn} />
                        : <Register route={route} loadUser={loadUser} onRouteChange={onRouteChange} signedIn={signedIn} />
                    }
                </div>
            </div>
        )
    }
}

export default LoginPage;

