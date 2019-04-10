import React from 'react'

const Text = ({ data }) => {
    return (
        <div className='Component'>
            <h3>{data.text}</h3>
        </div>
    )
}

export default Text