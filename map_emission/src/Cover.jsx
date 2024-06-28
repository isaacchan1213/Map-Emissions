import React from 'react'
import './cover.css'
import App from './App.jsx'

function Cover() {
    return (
        <div className='main'>
            <div className='search-bar'>
                <div className='title'>
                    <h1>Map your emissions now.</h1>
                </div>
                <div className='user-interface'>
                    <div className='starting'>
                        <label htmlFor="starting">Starting Destination</label>
                        <input type="search" id="search"/>
                    </div>
                    <div className='end'>
                        <label htmlFor="end">End Destination</label>
                        <input type="search" id="end"/>
                    </div>
                </div>
            </div>
            <div className='map'>
                <App />
            </div>
        </div>
    )
}

export default Cover