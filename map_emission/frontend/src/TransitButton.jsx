import React from 'react';
import "./TransitButton.css"

const TransitButton = ({src = '/images/car.png', isActive = false, onClick = () => {}}) => {
    return (
        <button
            className={`transit-button ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            <img src={src} alt="Transit Icon"/>
        </button>
    );
};

export default TransitButton;