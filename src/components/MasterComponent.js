import React from 'react'
import Text from './contentTypes/Text'

const MasterComponent = ({ component }) => {
    const components = {
        Text: Text
    }

    const TagName = components[component.type || 'Text']

    return (
        <TagName data={component.data} />
    )
}
export default MasterComponent