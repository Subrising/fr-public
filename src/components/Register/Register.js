import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: ""
        }
    }

    regEmail = (event) => {
        this.setState({ email: event.target.value });
    }

    regPW = (event) => {
        this.setState({ password: event.target.value });
    }

    regName = (event) => {
        this.setState({ name: event.target.value });
    }

    // Calls Re-Do's API and passes the given inputs from the user to create a new user in the database
    registerUser = () => {
        fetch('https://blooming-escarpment-18824.herokuapp.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(user => {
                console.log(user);
                if (user.id) {
                    this.props.onRouteChange('signin');
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className='h-30 br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center vertical-center bg-white o-50'>
                <div className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register New Account</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="username">Name</label>
                                <input onChange={this.regName}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="username"
                                    id="username"
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.regEmail}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.regPW}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="button"
                                value="Register"
                                onClick={this.registerUser}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <a href="#0" onClick={() => onRouteChange('signin')} className="f6 link dim black db">Back</a>
                        </div>
                    </form>
                </div>
            </article>
        );
    }
}


export default Register;
