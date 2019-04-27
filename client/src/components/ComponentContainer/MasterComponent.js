import React from 'react'
import Text from '../contentTypes/Text'
import './ComponentStyles.css'
import { FaAngleDown } from 'react-icons/fa'

const MasterComponent = ({ component }) => {
    const components = {
        Text: Text
    }

    const TagName = components[component.type || 'Text']

    return (
        <div className="Component">
            <div className="OptionsButton"><FaAngleDown /></div>
            <TagName data={component.data} />
        </div>
    )
}
export default MasterComponent