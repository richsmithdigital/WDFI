import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { MAPS_API } from "../config/API_config";

 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class MapComponent extends Component {
  static defaultProps = {
    center: {
      lat: 50.9087,
      lng: 1.4012
    },
    zoom: 18
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:MAPS_API }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={50.9087}
            lng={1.40120}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default MapComponent;