import React, { Component } from 'react';


// This component is used a 2 column, 3 row information tool that describes Re-Do's features along with linking them to the specific tools
class Descriptions extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { onRouteChange } = this.props
        return (
            <div className='bg-white'>
                <section style={{height: '30rem'}} class="bg-white false bb b--black-10 flex flex-column flex-row-l items-stretch justify-stretch w-80 center" data-reactid="411">
                    <div class="bg-white flex w-50-l items-center content-start justify-center-ns justify-start false" data-reactid="412">
                        <span class="pa6-l ph4-m pv2 ph3 w-60-m w-50" data-reactid="413">
                            <h3 class="f3-ns f4 fw5-ns fw6 mb3 fw5 lh-title black" data-reactid="414">
                                <span data-reactid="415">Recognise any<b data-reactid="418"><i data-reactid="419"> person!</i></b></span>
                            </h3>
                            <p class="f5 lh-copy mt0 black" data-reactid="420">
                                <span data-reactid="421">Our Facial Recognition tool allows you to search by an uploaded photo or if signed in, by all uploaded photos.
                                Searched individuals will be recognised and displayed in just seconds!
                            </span>
                                <br />
                                <a class="mt3 f6 no-underline grow dib bg-blue white ba b--blue ph3 pv2 mb3" onClick={() => { onRouteChange('recognition') }}>Go to Facial Recognition!</a>
                            </p>
                        </span>
                    </div>
                    <div class="bg-black-90 flex w-50-l  items-center justify-center pa5-l pa4 false" data-reactid="428">
                        <div class="w-100 overflow-hidden shadow-2 br1" data-reactid="429">
                            <img class="mw6 luminous" alt="showing the status page of urlbox.io" src="./recognition.gif" />
                        </div>
                    </div>
                </section>
                <section style={{ height: '30rem' }} class="false bb b--black-10 flex flex-column flex-row-l items-stretch justify-stretch w-80 center" data-reactid="411">
                    <div class="bg-black-90 flex w-50-l  items-center justify-center pa5-l pa4 false" data-reactid="428">
                        <div class="w-100 overflow-hidden shadow-2 br1" data-reactid="429">
                            <img class="mw6 luminous" alt="showing the status page of urlbox.io" src="./redaction.jpg" />
                        </div>
                    </div>
                    <div class="bg-white flex w-50-l items-center content-start justify-center-ns justify-start false" data-reactid="412">
                        <span class="pa6-l ph4-m pv2 ph3 w-60-m w-50" data-reactid="413">
                            <h3 class="f3-ns f4 fw5-ns fw6 mb3 fw5 lh-title black" data-reactid="414">
                                <span data-reactid="415">Keep your <b data-reactid="418"><i data-reactid="419"> privacy!</i></b></span>
                            </h3>
                            <p class="f5 lh-copy mt0 black" data-reactid="420">
                                <span data-reactid="421">Using the redaction ability of our Facial Replacement tool you can blur and keep hidden any
                                person you wish allowing full privacy in all of your photos!
                            </span>
                                <br />
                                <a class="mt3 f6 no-underline grow dib bg-blue white ba b--blue ph3 pv2 mb3" onClick={() => { onRouteChange('replacement') }}>Go to Facial Redaction!</a>
                            </p>
                        </span>
                    </div>
                </section>
                <section style={{ height: '30rem' }} class="false bb b--black-10 flex flex-column flex-row-l items-stretch justify-stretch w-80 center" data-reactid="411">
                    <div class="bg-white flex w-50-l items-center content-start justify-center-ns justify-start false" data-reactid="412">
                        <span class="pa6-l ph4-m pv2 ph3 w-60-m w-50" data-reactid="413">
                            <h3 class="f3-ns f4 fw5-ns fw6 mb3 fw5 lh-title black" data-reactid="414">
                                <span data-reactid="415">Replace any <b data-reactid="418"><i data-reactid="419"> face!</i></b></span>
                            </h3>
                            <p class="f5 lh-copy mt0 black" data-reactid="420">
                                <span data-reactid="421">The replacement ability of our Facial Replacement tool allows you to truly have fun with your
                                photos, allowing you replace any face with any image of your liking! So have fun removing your friends, exes or anything you like!
                            </span>
                                <br />
                                <a class="mt3 f6 no-underline grow dib bg-blue white ba b--blue ph3 pv2 mb3" onClick={() => { onRouteChange('replacement') }}>Go to Facial Replacement!</a>
                            </p>
                        </span>
                    </div>
                    <div class="bg-black-90 flex w-50-l  items-center justify-center pa5-l pa4 false" data-reactid="428">
                        <div class="w-100 overflow-hidden shadow-2 br1" data-reactid="429">
                            <img class="mw6 luminous" alt="showing the status page of urlbox.io" src="./example.jpg" />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Descriptions;
