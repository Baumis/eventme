import React, { Component } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Overlay from 'ol/Overlay'
import './OpenLayers.css'

class OpenLayers extends Component {

    componentDidMount() {
        const olMap = new Map({
            target: this.refs.mapContainer,
            view: new View({
                center: this.props.cordinates,
                zoom: 8,
            }),
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ]
        })

        this.marker = new Overlay({
            position: [949282, 6002552],
            positioning: "center-center",
            element: document.getElementById("marker"),
            stopEvent: false
          })

          olMap.addOverlay(this.marker)
    }

    render() {
        return (
            <div className="openLayer-container" ref="mapContainer"> </div>
        )
    }
}

export default OpenLayers