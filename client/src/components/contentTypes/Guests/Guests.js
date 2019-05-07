import React from 'react'
import './Guests.css'

const Guests = (props) => {
    return (
        <div className="Container">
            <div className="Title">
                <h2>{props.data.title}</h2>
            </div>
            <div className="GuestList">
                {props.guests.map((guest, i) => {
                    return (
                        <div className="Guest" key={i}>
                            <div className="GuestName">{guest.name}</div>
                            <div className="GuestStatus">{guest.status}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Guests