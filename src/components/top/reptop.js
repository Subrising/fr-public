import React, { Component } from 'react';
import '../../assets/css/replacementpage.css'

class RepTop extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section class='w-100' style={{ position: 'relative' }}>
                    <div class="w-70 cover modal2" style={{ position: 'relative' }}>
                        <div class="cf imgBg w-100" style={{ background: `url('./redaction.jpg')`, backgroundSize: '100%' }}>
                            <div class="fl pa3 pa4-ns bg-white black-70 measure-narrow f3 w-100">
                                <header class="bb b--black-70 pv4">
                                    <h3 class="f2 fw7 ttu tracked lh-title mt0 mb3 avenir">Facial Replacement</h3>
                                    <h4 class="f3 fw4 lh-title mt0 avenir">What is it and how do I use it?</h4>
                                </header>
                                <section class="pt4 pb4">
                                    <p class="lh-copy measure f4 mt0">
                                        The Facial Replacement Tool allows you to choose between Facial Replacement. and Facial Redaction.
                                        The Facial Redaction feature blurs out your chosen faces and the Facial Replacement feature allows you
                                        to replace the chosen faces with any image you like.
                                        <br />
                                        <br />
                                        The faces you upload can either be the faces that are
                                        blurred/replaced, or it can be reversed and it will blur out/replace every face that is not of the face uploaded.
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

export default RepTop;
