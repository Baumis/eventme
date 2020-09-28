import React, { useState, useEffect } from 'react'
import './About.css'


const About = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setIsOpen(props.description.length < 500)
    },[])

    return (
        <div className="about">
            <div className="about-text">
                {props.description.length > 500 && !isOpen?
                props.description.substring(0,500)
                :
                props.description}
            </div>
            { !isOpen && 
            <div className="about-show-more" onClick={() => setIsOpen(!isOpen)} id={"about-text"}>
                show more
            </div>
            }
        </div>
    )
}
export default About