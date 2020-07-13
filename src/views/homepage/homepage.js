import React, { Component } from 'react';
import Hero from '../../components/hero/hero';
import Middletext from '../../components/middletext/middletext';
import Descriptions from '../../components/descriptions/descriptions';
import LargeCTA from '../../components/largeCTA/largeCTA';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { route, loadUser, onRouteChange } = this.props
        return (
            <div>
                <Hero
                    onRouteChange={onRouteChange}
                    loadUser={loadUser}
                    route={route} >
                </Hero>
                <div id="uses">
                    <Middletext />
                </div>
                <div id="descriptions">
                    <Descriptions onRouteChange={onRouteChange} />
                </div>
                <LargeCTA onRouteChange={onRouteChange} />
            </div>
        )
    }
}

export default HomePage;

