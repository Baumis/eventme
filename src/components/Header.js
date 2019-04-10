import React from 'react'
import '../styles/HeaderStyles.css'

const Header = ({label, background, save}) => {

    const headerStyles = {
        color: 'white',
        backgroundImage: 'url(' + background + ')'
    }

    return (
        <div style={headerStyles} className='Header-container'>
            <h1>{label}</h1>

            <div className='editRow'>
                <div className='editor'>

                    <div className='inputBlock'>
                        <label>background url</label>
                        <input id='urlInput'></input>
                    </div>

                    <div className='inputBlock'>
                        <label>h1 color</label>
                        <input id='colorInput'></input>
                    </div>

                    <div className='inputBlock'>
                        <label>h2 color</label>
                        <input id='colorInput'></input>
                    </div>

                    <button id='saveButton' onClick={save}></button>

                </div>
            </div>
        </div>
    )
}

export default Header