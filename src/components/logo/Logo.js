import React from 'react';
import Tilt from 'react-tilt';
import dzglife from './logo_transparent.png'
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0 center' style={{ position: 'relative' }}>
            <Tilt className="Tilt br2 shadow-2" options={{ max: 45 }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner"> <img src={dzglife} alt='logo'/></div>
            </Tilt>
        </div>
    );
}

export default Logo;
