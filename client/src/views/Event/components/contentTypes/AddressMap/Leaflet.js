import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import './Leaflet.css'
import 'leaflet/dist/leaflet.css'

class Leaflet extends Component {

    render() {
        return (
            <div style={{height: '400px'}}>
                <Map center={[51.505, -0.09]} zoom={13} style={{height: '400px'}}>>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker>
                </Map>
            </div>
        )
    }
}

export default Leaflet