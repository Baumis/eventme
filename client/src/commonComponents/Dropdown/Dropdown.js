import React, { useState } from 'react'
import './Dropdown.css'
import { FaAngleDown } from 'react-icons/fa'

const Dropdown = (props) => {
    const [open, setOpen] = useState(false)

    const displayList = () => {
        setOpen(true)
        document.addEventListener('click', hideList)
    }

    const hideList = () => {
        setOpen(false)
        document.removeEventListener('click', hideList)
    }

    return (
        <div className="dropdown">
            <div className="dropdown-button" style={props.buttonStyle} onClick={displayList}>
                <div className="dropdown-value">{props.value}</div>
                <FaAngleDown />
            </div>
            {open &&
                <div className="dropdown-list">
                    {props.items.map((item, index) =>
                        <div className="dropdown-list-item" key={index} onClick={() => props.setValue(item)}>
                            {item}
                        </div>
                    )}
                </div>
            }
        </div>

    )
}

export default Dropdown