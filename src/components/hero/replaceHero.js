import React, { Component } from 'react';
import 'react-tabs/style/react-tabs.css';
import './hero.css'

class ReplaceHero extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        return (
            <div class="z100 hero">
                <div class="cover bg-left bg-center-l" style={{ backgroundImage: `url('./example.jpg')` }}>
                    <div class="pa5 pb5 pb6-m pb7-l bg-black-50 h-100">
                        <div class="tc-l mt4 mt5-m mt6-l ph3 center">
                            <div class='pa3 dib center vertical-center'><h1 class="pa3 f2 f1-l fw2 white-90 mb0 lh-title">Facial Replacement</h1>
                                <h2 class="fw1 f3 white-80 mt3 mb4">Welcome, {user.name} to the Facial Replacement Feature</h2>
                                <a class="f6 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3" href="#repTop">How to use</a>
                                <span class="dib v-mid ph3 white-70 mb3">or</span>
                                <a class="f6 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3" href="#replaceTool">Start now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReplaceHero;
