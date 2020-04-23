import React from 'react'
import { Popup, Marker as DefaultMarker } from 'react-leaflet';

function Marker(props) {
    return <DefaultMarker position={[props.country.countryInfo.lat, props.country.countryInfo.long]}>
        <Popup>

            <h5 style={{display: "flex", justifyContent:"space-between"}}>
                {props.country.country}
                &nbsp;
                <img src={props.country.countryInfo.flag} alt="flag" height="20" width="20" />
            </h5>

            <div style={{display: "flex", justifyContent:"space-between", borderBottom:"1px solid #555"}}>
                Cases: 
                <span className="font-weight-light">{new Intl.NumberFormat('de-DE').format(props.country.cases)}</span>
            </div>
            <div style={{display: "flex", justifyContent:"space-between", borderBottom:"1px solid #555"}}>
                Recovered: 
                <span className="font-weight-light">{new Intl.NumberFormat('de-DE').format(props.country.recovered)}</span>
            </div>
            <div style={{display: "flex", justifyContent:"space-between", borderBottom:"1px solid #555"}}>
                Active Cases: 
                <span className="font-weight-light">{new Intl.NumberFormat('de-DE').format(props.country.active)}</span>
            </div>
            <div style={{display: "flex", justifyContent:"space-between", borderBottom:"1px solid #555"}}>
                Today Cases: 
                <span className="font-weight-light">{new Intl.NumberFormat('de-DE').format(props.country.todayCases)}</span>
            </div>
            <div style={{display: "flex", justifyContent:"space-between", borderBottom:"1px solid #555"}}>
                Total deaths: 
                <span className="font-weight-light">{new Intl.NumberFormat('de-DE').format(props.country.deaths)}</span>
            </div>
                    
            </Popup>
        </DefaultMarker>;
}

export default Marker;