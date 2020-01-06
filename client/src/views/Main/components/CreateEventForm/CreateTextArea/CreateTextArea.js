import React from 'react'
import './CreateTextArea.css'
import EditableWrapper from '../../../../../commonComponents/EditableWrapper/EditableWrapper'

const CreateTextArea = (props) => {

    return (
        <div className="create-textarea">
            <div className="create-textarea-area-wrapper">
                <div className="create-textarea-label">
                    <label>{props.label}</label>
                </div>
                <textarea 
                    value={props.value}
                    className={"create-textarea-area"}
                    onChange={props.onChange}
                />
            </div>
        </div>
    )
}
export default CreateTextArea