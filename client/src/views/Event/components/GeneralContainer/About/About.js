import React from 'react'
import './About.css'


const About = (props) => {
    return (
        <div className="about">
            <div className="about-text">
                {props.description}
            </div>
        </div>
    )
}
export default About