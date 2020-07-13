import React, { Component } from 'react';
import '../../assets/css/recognitionpage.css'

class Top extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section class='w-100' style={{ position: 'relative' }}>
                    <div class="w-80 cover modal2" style={{ position: 'relative' }}>
                        <div class="cf imgBg w-100 vertical-center2" style={{ background: `url('./recognition.gif')`, backgroundSize: '100%' }}>
                            <div class="fl pa4 pa4-ns bg-white black-70 measure-narrow f3 w-100">
                                <header class="bb b--black-70 pv4">
                                    <h3 class="f2 fw7 ttu tracked lh-title mt0 mb3 avenir">Facial Recognition</h3>
                                    <h4 class="f3 fw4 lh-title mt0 avenir">What is it and how do I use it?</h4>
                                </header>
                                <section class="pt3 pb4">
                                    <p class="lh-copy measure f4 mt0">
                                        The Facial Recognition Tool allows you to choose a person to recognise (or if you have an account
                                        and are signed in it allows you to store faces to our database and recognised all stored faces).
                                        <br />
                                        <br />
                                        A recognition image will then be uploaded and all detected faces that are known will be shown with
                                        their displayed tag. If the face is unknown it will be labeled as such. If signed in, you are able to
                                        upload multiple photos of the same person to increase recognition accuracy.
        </p>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Top;
