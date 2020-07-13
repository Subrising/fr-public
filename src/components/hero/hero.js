import React, { Component } from 'react';
import SignIn from '../SignIn/SignIn';
import Register from '../Register/Register'
import Logo from '../logo/Logo'
import './hero.css'

class Hero extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onRouteChange, loadUser, route } = this.props;
        return (
            <div class="z100 hero">
                <div class="cover bg-left bg-center-l" style={{ backgroundImage: `url('./BP-Test.jpg')`, position: 'relative' }}>
                    <div class="pa5 pb5 pb6-m pb7-l bg-black-50 h-100" style={{ position: 'relative' }}>
                        <div class="tc-l mt5 ph3 center" style={{ position: 'relative' }}>
                            {route === 'signin'
                                ? <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
                                : (route === 'register'
                                    ? <Register loadUser={loadUser} onRouteChange={onRouteChange} />
                                    :
                                    <div style={{ position: 'relative' }}>
                                        <Logo />
                                        <h1 class="pa3 f2 f1-l fw2 white-90 mb0 lh-title">Welcome to Re-Do</h1>
                                        <h2 class="fw1 f3 white-80 mt3 mb4">The Future of Facial Recogniton Redaction and Replacement</h2>
                                        <a class="f6 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3" href="#uses">Why use it?</a>
                                        <span class="dib v-mid ph3 white-70 mb3">or</span>
                                        <a class="f6 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3" href="#descriptions">See Examples</a>
                                    </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Hero;
