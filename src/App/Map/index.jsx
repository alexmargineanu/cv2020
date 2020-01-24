import React from 'react';
import PropTypes from 'prop-types';

import * as d3 from 'd3';

import D3Map from './D3Map';
import DataPipeline from './DataPipeline';
import RenderPipeline from './RenderPipeline';

import './index.scss';

class Map extends React.Component {

    constructor(){
        super();
        this.mapRef = React.createRef();
        this.state = {
            world: [],
        };
    }

    componentDidMount() {
        const url = 'https://alexmargineanu.github.io/cv2020/world-50m.json';
        fetch(url)
            .then(response => response.json()
                .then(world => this.setState({ world }))
            )
            .catch(error => console.error(error));
    }

    componentDidUpdate(prevProps, prevState) {
        const { world } = this.state;
        const svg = d3.select(this.mapRef.current);

        if(prevState.world !== world && world !== null){
            Promise.all([
                d3.csv('https://alexmargineanu.github.io/cv2020/geonames_cities100000.csv'),
            ]).then(([geoDb]) => {

                const data = new DataPipeline({
                    cities: geoDb,
                    flights: this.props.flights
                }).addCityNames();

                new D3Map({ svg, world });

                setTimeout(()=>{
                    new RenderPipeline({
                        svg: svg,
                        cities: data.filterCities().valCities,
                        flights: data.addGeoData().valFlights,
                        getCurrentFlight: (f) => this.props.getCurrentFlight(f),
                        flightTime: 2300,
                    }).renderFlightPath().renderCircles().renderLabels();
                }, 2000);
            }).catch(err => console.log('Error loading or parsing data.', err));
        }
    }

    render(){
        const { world } = this.state;

        if (!world) {
            return <small>Error</small>;
        }

        if (world.length && world.length === 0) {
            return <small>Loading</small>;
        }

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
