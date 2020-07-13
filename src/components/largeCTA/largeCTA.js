import React, { Component } from 'react';
import './largeCTA.css'

class LargeCTA extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { onRouteChange } = this.props
        return (
            <div class='center' style={{ position: 'relative' }}>
                <article class="ph3 ph5-ns tc br2 pv5 bg-lightest-blue black w-100" style={{ position: 'relative' }}>
                    <h1 class="fw6 f3 f2-ns lh-title mt0 mb3" style={{ position: 'relative' }}>
                        Sign up and get access to all our features!
                    </h1>
                    <h2 class="fw2 f4 lh-copy mt0 mb3" style={{ position: 'relative' }}>
                        Registering an account will allow you to utilise the full power of our recognition tool.
                    </h2>
                    <p class="fw1 f5 mt0 mb3" style={{ position: 'relative' }}>
                        You can add multiple photos for each person increasing the accuracy of recognising them in your images.
                    </p>
                    <div>
                        <a class="mt3 ma3 f6 no-underline grow dib bg-blue white ba b--blue ph3 pv2 mb3"
                            onClick={() => { onRouteChange('signin') }} style={{ position: 'relative' }}>
                            Sign In
                        </a>
                        <a class="mt3 ma3 f6 no-underline grow dib bg-blue white ba b--blue ph3 pv2 mb3"
                            onClick={() => { onRouteChange('register') }} style={{ position: 'relative' }}>
                            Register
                        </a>
                    </div>
                </article>
            </div>
        )
    }
}

export default LargeCTA;
