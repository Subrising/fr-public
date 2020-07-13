import React, { Component } from 'react';
import './navigation.css'

class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    deleteConfirm = (deleteUser, onRouteChange) => {
        const confirm = window.confirm("Are you sure you want to delete your account?")
        if (confirm) {
            deleteUser()
            onRouteChange('signout')
        } else {
            return
        }
    }

    render() {
        const { onRouteChange, deleteUser, signedIn } = this.props;
        return (
            <div class="bg-black w-100 ph3 pv3 pv4 ph4 ph5" style={{ position: 'relative', top: '0' }}>
                <nav class="f6 fw6 ttu tracked" style={{ position: 'relative' }}>
                    <div class="f6 fw6 ttu tracked" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'left' }}>
                            <a class="f6 fw4 hover-white no-underline white-70 dn dib pv2 ph3" onClick={() => onRouteChange('home')} >Home</a>
                            <a class="f6 fw4 hover-white no-underline white-70 dn dib pv2 ph3" onClick={() => onRouteChange('recognition')} >Facial Recognition</a>
                            <a class="f6 fw4 hover-white no-underline white-70 dn dib pv2 ph3" onClick={() => onRouteChange('replacement')} >Facial Replacement</a>
                        </div>
                        <div style={{ display: 'right' }}>
                            {!(signedIn) ?
                                <div style={{ display: 'inline-block', position: 'relative' }}>
                                    <a onClick={() => onRouteChange('signin')} className='f6 fw4 hover-white no-underline white-70 dn dib pv2 ph3'>Sign In</a>
                                    <a onClick={() => onRouteChange('register')} className='f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba'>Register</a>
                                </div>
                                :
                                <div style={{ display: 'inline-block', position: 'relative' }}>
                                    <a onClick={() => onRouteChange('signout')} className='f6 fw4 hover-white no-underline white-70 dn dib pv2 ph3'>Sign Out</a>
                                    <a onClick={() => { this.deleteConfirm(deleteUser, onRouteChange) }} className='f6 fw4 hover-white no-underline white-70 dn dib pv2 ph3'>Delete Account</a>
                                </div>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navigation;
