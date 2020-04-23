import React from 'react';
import axios from 'axios';
import CustomMarker from './marker';

export default class AllMarkers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { countries: [] };
    }

    componentDidMount() {
        this.getCountries();
    }

    getCountries = () => {
        axios
            .get('https://corona.lmao.ninja/v2/countries')
            .then(data => this.setState({ countries: data.data }))
            .catch(err => {
                console.log(err);
                return null;
            });
    };

    render() {
        return (
            <div>
                {this.state.countries.map( (country) => {
                    return <CustomMarker country={country} />;
                })}
            </div>
        );
    }
}