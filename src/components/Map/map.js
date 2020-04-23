import React from 'react';
import axios from 'axios';
import { Map as LeafletMap, GeoJSON } from 'react-leaflet';
import WorldMapJSON from 'geojson-world-map';
import AllMarkers from './../Marker/allMarkers';
import 'bootswatch/dist/slate/bootstrap.min.css';

export default class GeoMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultPosition: [40,10],
            options: {
                maximumAge: 0,
                timeout: 5000,
                enableHighAccuracy: true,
            },
            coronaData: {}
        };
    }

    componentDidMount() {
        this.getCoronaStats();
    }

    getCoronaStats = () => {
        axios
            .get('https://corona.lmao.ninja/v2/all')
            .then(data => this.setState({ coronaData: data.data }))
            .catch(err => {
                console.log(err);
                return null;
            });
    };

    render() {
        return (
            <div>
                <LeafletMap
                    center={this.state.defaultPosition}
                    zoom={1.5}
                    maxZoom={6}
                    minZoom={1.5}
                    animate={false}
                    dragging={true}
                    zoomControl={true}
                    easeLinearity={0.35}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    attributionControl={true}
                >
                    <GeoJSON
                        data={WorldMapJSON}
                        style={() => ({
                            weight: 0.2,
                            color: '#92B3F0',
                            fillOpacity: 0.9,
                            fillColor: "#223C6E",
                        })}
                    />
                    <AllMarkers />
                </LeafletMap>
                <div class="container p-4">
                    <h2 class="text-center font-weight-bold p-4">Worldwide</h2>
                    <div class="row h-100 ">
                        <div class="col-4">
                            <h3 class="text-center">Cases:</h3>
                            <p class="text-center font-weight-light">{new Intl.NumberFormat('de-DE').format(this.state.coronaData.cases)}</p>
                        </div>
                        <div class="col-4">
                            <h4 class="text-center">Active:</h4>
                            <p class="text-center font-weight-light">{new Intl.NumberFormat('de-DE').format(this.state.coronaData.active)}</p>
                        </div>
                        <div class="col-4">
                            <h4 class="text-center">Deaths:</h4>
                            <p class="text-center font-weight-light">{new Intl.NumberFormat('de-DE').format(this.state.coronaData.deaths)}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}
