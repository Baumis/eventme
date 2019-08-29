import React from 'react'
import './Text.css'
import EditableWrapper from '../../EditableWrapper/EditableWrapper'

const Text = (props) => {

    const changeTitle = (event) => {
        const dataObject = {
            title: event.target.value,
            content: props.data.content
        }
        props.changeData(dataObject)
    }

    const changeContent = (event) => {
        const dataObject = {
            title: props.data.title,
            content: event.target.value
        }
        props.changeData(dataObject)
    }

    const borderStyle = props.edit ? 'text-editable-mode' : ''
    return (
        <div className="text-component">
            <div className={"text-component-title " + borderStyle}>
                <h2>
                    <EditableWrapper
                        html={props.data.title}
                        editable={!props.edit}
                        onChange={changeTitle}
                    />
                </h2>
            </div>
            <div className={"text-component-content " + borderStyle}>
                <EditableWrapper
                    html={props.data.content}
                    editable={!props.edit}
                    onChange={changeContent}
                />
            </div>
        </div>
    )
}

export default Text