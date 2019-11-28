import React from 'react'
import './Text.css'
import EditableWrapper from '../../EditableWrapper/EditableWrapper'

const Text = (props) => {

    const changeTitle = (event) => {
        const dataObject = {
            title: event.target.value,
            content: props.component.data.content
        }
        props.changeData(dataObject)
    }

    const changeContent = (event) => {
        const dataObject = {
            title: props.component.data.title,
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
                        html={props.component.data.title}
                        editable={!props.edit}
                        onChange={changeTitle}
                    />
                </h2>
            </div>
            <div className={"text-component-content " + borderStyle}>
                <EditableWrapper
                    html={props.component.data.content}
                    editable={!props.edit}
                    onChange={changeContent}
                    style={{textAlign: 'center'}}
                />
            </div>
        </div>
    )
}

export default Text