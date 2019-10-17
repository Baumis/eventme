import React from 'react'
import './AddressMap.css'
import GoogleMaps from './GoogleMaps'

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
            <GoogleMaps
                isMarkerShown={true}
                googleMapURL="https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    )
}


export default AddressMap