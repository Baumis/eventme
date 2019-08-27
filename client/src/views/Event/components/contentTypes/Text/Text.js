import React from 'react'
import './Text.css'
import ContentEditable from 'react-contenteditable'

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
                <ContentEditable
                    html={props.data.title}
                    disabled={!props.edit}
                    onChange={changeTitle}
                />
            </div>
            <div className={"text-component-content " + borderStyle}>
                <ContentEditable
                    html={props.data.content}
                    disabled={!props.edit}
                    onChange={changeContent}
                />
            </div>
        </div>
    )
}

export default Text