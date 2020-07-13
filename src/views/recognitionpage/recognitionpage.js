import React, { Component } from 'react';
import Top from '../../components/top/top'
import '../../../src/assets/css/recognitionpage.css'
import RecogHero from '../../components/hero/recogHero';
import CTA from '../../components/cta/cta'
import Title from '../../components/title/title'
import FaceRecognition from '../../components/facerecognition/facerecognition'

class RecognitionPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { signedIn, user } = this.props
        return (
            <div>
                <div style={{ position: 'relative' }}>
                    <div style={{ position: 'relative' }}>
                        <RecogHero user={user} />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <CTA />
                    </div>
                    <div id="recogTop" style={{ position: 'relative' }}>
                        <Top />
                    </div>
                    <div id="recogTool" style={{ backgroundImage: `url('./fr-main.jpg')` }}>
                        <div style={{ position: 'relative' }}>
                            <Title />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <FaceRecognition user={user} signedIn={signedIn} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecognitionPage;
