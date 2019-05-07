import React from 'react'
import './Guests.css'

const Guests = (props) => {
    return (
        <div className="Container">
            <h2>{props.data.title}</h2>
            <div className="GuestList">
                {props.guests.map((guest, i) => {
                    return (
                        <div className="Guest" key={i}>
                            <div>{guest.name}</div>
                            <div>{guest.status}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Guests