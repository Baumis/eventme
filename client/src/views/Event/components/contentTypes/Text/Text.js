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
    return (
        <div className="text-component">
            <div className={"text-component-title"}>
                <h2> {props.component.data.title} </h2>
            </div>
            <div className={"text-component-content "}>
                {props.component.data.content}
            </div>
        </div>
    )
}

export default Text