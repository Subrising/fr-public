import React, { Component } from 'react';
import RepTop from '../../components/top/reptop'
import '../../../src/assets/css/replacementpage.css'
import ReplaceHero from '../../components/hero/replaceHero';
import RepCTA from '../../components/cta/repcta'
import RepTitle from '../../components/title/reptitle'
import FaceReplacement from '../../components/facereplacement/facereplacement'

class ReplacementPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { signedIn, user } = this.props
        return (
            <div>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'relative' }}>
                        <ReplaceHero user={user} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <RepCTA />
                    </div>
                    <div id="repTop" style={{ position: 'relative' }}>
                        <RepTop />
                    </div>
                    <div id="replaceTool" style={{ backgroundImage: `url('./fr-main.jpg')` }}>
                        <div style={{ position: 'relative' }}>
                            <RepTitle />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <FaceReplacement user={user} signedIn={signedIn} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReplacementPage;
