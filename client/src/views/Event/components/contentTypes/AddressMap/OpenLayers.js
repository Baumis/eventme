import React, { Component } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import './OpenLayers.css'

class OpenLayers extends Component {

    componentDidMount() {
        const map = new Map({
            target: this.refs.mapContainer,
            view: new View({
                center: [60, 24],
                zoom: 8,
            }),
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ]
        })
    }

    render() {
        return (

            <div className="openLayer-container" ref="mapContainer"> </div>
        )
    }
}

export default OpenLayers