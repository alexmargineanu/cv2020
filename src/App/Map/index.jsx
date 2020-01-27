import React from 'react';
import PropTypes from 'prop-types';

import * as d3 from 'd3';

import D3Map from './D3Map';
import DataPipeline from './DataPipeline';
import RenderPipeline from './RenderPipeline';

import './index.scss';

class Map extends React.Component {

    constructor() {
        super();
        this.mapRef = React.createRef();
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        fetch('https://alexmargineanu.github.io/cv2020/world-50m.json')
            .then(response => response.json()
                .then(world => {

                    const svg = d3.select(this.mapRef.current);
                    new D3Map({ svg, world });

                    Promise.all([
                        d3.csv('https://alexmargineanu.github.io/cv2020/geonames_cities100000.csv'),
                    ]).then(([cities]) => {

                        const data = new DataPipeline({
                            cities,
                            flights: this.props.flights
                        }).addCityNames();

                        setTimeout(()=>{
                            new RenderPipeline({
                                svg,
                                cities: data.filterCities().valCities,
                                flights: data.addGeoData().valFlights,
                                getCurrentFlight: (f) => this.props.getCurrentFlight(f),
                                flightTime: 2300,
                            }).renderFlightPath().renderCircles().renderLabels();
                        }, 2800);
                    }).catch(err => console.log('Error loading or parsing data.', err));
                })
            )
            .catch(error => console.error(error));
    }


    render() {
        return (
            <section className="map">
                <svg ref={this.mapRef} />
            </section>
        );
    }
}

Map.propTypes = {
    flights: PropTypes.array,
    getCurrentFlight: PropTypes.func,
};

export default Map;
