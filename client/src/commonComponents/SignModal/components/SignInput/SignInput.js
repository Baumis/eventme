import React from 'react'
import './SignInput.css'

const SignInput = (props) => {
    return (
        <div className="sign-input">
            {props.label.length > 0 || props.secondLabel.length > 0 ?
                <div className="sign-input-label-row">
                    <div className="sign-input-label">
                        {props.label}
                    </div>
                    <div className="sign-input-second-label" onClick={props.labelAction}>
                        {props.secondLabel || null}
                    </div>
                </div>
                : null}
            <div className="sign-input-input-container">
                <div className="sign-input-icon">
                    {props.icon}
                </div>
                <input
                    type={props.type}
                    onChange={props.change}
                    value={props.value}
                    placeholder={props.placeholder}
                >
                </input>
            </div>
        </div>
    )
}

export default SignInput