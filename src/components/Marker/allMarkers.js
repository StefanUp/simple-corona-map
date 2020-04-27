import React from 'react';
import CustomMarker from './marker';

export default class AllMarkers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { countries: props.countries };
    }

    render() {
        return (
            <div>
                {this.state.countries.map( (country, i) => {
                    return <CustomMarker country={country} key={i} />;
                })}
            </div>
        );
    }
}