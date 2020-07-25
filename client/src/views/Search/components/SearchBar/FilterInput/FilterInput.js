import React from 'react'
import './FilterInput.css'

const FilterInput = (props) => {

    return (
        <div className="filter-input" style={props.style}>
            {props.label.length > 0 ?
                <div className="filter-input-label">
                    <label>{props.label}</label>
                </div>
                : null}
            <input
                type={props.type}
                min={props.min}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                style={props.style}
                required
            ></input>
        </div>
    )
}
export default FilterInput