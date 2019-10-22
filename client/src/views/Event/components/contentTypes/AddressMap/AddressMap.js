import React from 'react'
import './AddressMap.css'
import Leaflet from './Leaflet'

const AddressMap = (props) => {

    const changeAddress = (event) => {
        const dataObject = {
            address: event.target.value
        }
        props.changeData(dataObject)
    }

    return (
        <div className="map-container">
            {props.edit ?
                <div className="map-address-row">
                    <input
                        value={props.data.address}
                        onChange={changeAddress}
                        placeholder={'address'}
                    />
                </div>
                : null}
                <Leaflet
                    cordinates={props.data.cordinates}
                />
        </div>
    )
}


export default AddressMap