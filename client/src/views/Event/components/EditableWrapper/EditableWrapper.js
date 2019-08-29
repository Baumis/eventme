import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'

class EditableWrapper extends Component {

    handlePaste = (event) => {
        event.preventDefault()
        const content = event.clipboardData.getData('text/plain')
        document.execCommand('insertHTML', false, content)
    }

    render() {
        return (
            <ContentEditable
                html={this.props.html}
                onPaste={this.handlePaste}
                disabled={this.props.editable}
                onChange={this.props.onChange}
            />
        )
    }
}

export default EditableWrapper