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
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000,
            },
            coronaData: {},
            countries: [],
            loaded: false
        };
    }

    componentDidMount() {
        axios.all([axios.get('https://corona.lmao.ninja/v2/all'), axios.get('https://corona.lmao.ninja/v2/countries')])
            .then(axios.spread((...responses) => {
                this.setState({ coronaData: responses[0].data });
                this.setState({ countries: responses[1].data, loaded: true })
            })).catch(err => {
                console.log(err);
                return null;
            })
    }

    render() {
        return (
            <div>
                <LeafletMap
                    center={this.state.defaultPosition}
                    zoom={1.5}
                    maxZoom={6}
                    minZoom={1.5}
                    tap={false}
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

                    {this.state.loaded ? <AllMarkers countries={this.state.countries} /> : ''}

                </LeafletMap>

                <div className="container p-4">
                    <h2 className="text-center font-weight-bold p-4">Worldwide</h2>
                    <div className="row h-100 ">
                        <div className="col-4">
                            <h3 className="text-center">Cases:</h3>
                            <p className="text-center font-weight-light">{new Intl.NumberFormat('de-DE').format(this.state.coronaData.cases)}</p>
                        </div>
                        <div className="col-4">
                            <h4 className="text-center">Active:</h4>
                            <p className="text-center font-weight-light">{new Intl.NumberFormat('de-DE').format(this.state.coronaData.active)}</p>
                        </div>
                        <div className="col-4">
                            <h4 className="text-center">Deaths:</h4>
                            <p className="text-center font-weight-light">{new Intl.NumberFormat('de-DE').format(this.state.coronaData.deaths)}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}
