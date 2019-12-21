import React from 'react'
import './SignInput.css'

const SignInput = (props) => {
    return (
        <div className="sign-input">
            <div className="sign-input-label-row">
                <div className="sign-input-label">
                    {props.label}
                </div>
                <div className="sign-input-second-label" onClick={props.labelAction}>
                    {props.secondLabel || null}
                </div>
            </div>
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