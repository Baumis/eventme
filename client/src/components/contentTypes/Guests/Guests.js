import React from 'react'
import './Guests.css'
import GuestList from '../../GuestList.js/GuestList';

const Guests = (props) => {
    return (
        <div className="GuestsContainer">
            <div className="Title">
                <h2>{props.data.title}</h2>
            </div>
            <GuestList
                guests={props.guests}
                background={'transparent'}
                color={'black'}
                mod={false}
            />
        </div>
    )
}

export default Guests