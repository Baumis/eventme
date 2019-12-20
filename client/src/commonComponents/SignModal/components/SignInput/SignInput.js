import React from 'react'
import './SignInput.css'

const SignInput = (props) => {
    return (
        <div className="sign-input">
            <label>{props.label}</label>
            <input
                type={props.type}
                onChange={props.change}
                value={props.value}
            >
            </input>
        </div>
    )
}

export default SignInput