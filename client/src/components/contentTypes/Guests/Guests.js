import React from 'react'
import './Guests.css'

const Guests = (props) => {
    return (
        <div className="Container">
            <h3>{props.data.title}</h3>
            <div className="GuestList">
                {props.guests.map((guest, i) => {
                    return (
                        <div key={i}>
                            {guest.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Guests