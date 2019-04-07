import React from 'react'
import '../styles/HeaderStyles.css'

const Header = (props) => {

    const headerStyles = {
        color: props.headerData.color,
        backgroundImage: 'url(' + props.headerData.url + ')'
    };

    return (
        <div style={headerStyles} className="Header-container">
            <h1>{props.headerData.h1}</h1>
            <h2>{props.headerData.h2}</h2>

            <div className="editRow">
                <div className="editor">

                    <div className="inputBlock">
                        <label>background url</label>
                        <input id="urlInput"></input>
                    </div>

                    <div className="inputBlock">
                        <label>h1 color</label>
                        <input id="colorInput"></input>
                    </div>

                    <div className="inputBlock">
                        <label>h2 color</label>
                        <input id="colorInput"></input>
                    </div>

                    <button id="saveButton" onClick={props.save}></button>

                </div>
            </div>
        </div>
    )
}

export default Header