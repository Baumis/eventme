import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import './Leaflet.css'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

class Leaflet extends Component {

    render() {
        const defaultIcon = L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow
        })
        L.Marker.prototype.options.icon = defaultIcon
        return (
            <div style={{ height: '400px' }}>
                <Map center={[60.1690001, 24.9359817]} zoom={15} style={{ height: '400px' }}>>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    <Marker position={[60.1690001, 24.9359817]}>
                        <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                    </Marker>
                </Map>
            </div>
        )
    }
}

export default Leaflet