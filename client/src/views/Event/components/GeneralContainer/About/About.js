import React, { useState, useEffect } from 'react'
import './About.css'


const About = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const height = document.getElementById('about-text').clientHeight;
        if(height < 80) {
            setIsOpen(true)
        }
    },[])

    return (
        <div className="about">
            <div className="about-text" style={{maxHeight: isOpen ? '10000px' : '80px'}} id="about-text">
                {props.description}
            </div>
            { !isOpen && <div className="about-text-fader"></div>}
            { !isOpen && 
            <div className="about-show-more" onClick={() => setIsOpen(!isOpen)} id={"about-text"}>
                show more
            </div>
            }
        </div>
    )
}
export default About