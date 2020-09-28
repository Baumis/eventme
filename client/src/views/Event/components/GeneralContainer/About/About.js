import React, { useState, useEffect } from 'react'
import './About.css'


const About = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="about">
            <div className="about-text" style={{maxHeight: isOpen ? '10000px' : '80px'}}>
                {props.description}
            </div>
            {!isOpen && <div className="about-text-fader"></div>}
            { !isOpen && 
            <div className="about-show-more" onClick={() => setIsOpen(!isOpen)} id={"about-text"}>
                show more
            </div>
            }
        </div>
    )
}
export default About