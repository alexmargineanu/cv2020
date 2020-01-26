import moment from 'moment';
import airports2cities from '../DB/airports2cities';

class DataPipeline {
    constructor(props) {
        this.cities = props.cities;
        this.flights = props.flights;
    }

    get valCities() {
        return this.cities;
    }

    get valFlights() {
        return [...this.flights].sort(
            (a, b) => a.dtstart < b.dtstart ? -1 : a.dtstart > b.dtstart ? 1 : 0
        );
    }

    addFlightDuration() {
        this.flights = this.flights.map(f => {
            const duration = parseFloat(moment(f.dtend).diff(moment(f.dtstart), 'hours', true)).toFixed(1);
            return {
                ...f,
                duration,
            };
        });

        return this;
    }

    addFlightDistance() {
        this.flights = this.flights.map(f => {
            const duration = f.duration ? f.duration : parseFloat(moment(f.dtend).diff(moment(f.dtstart), 'hours', true)).toFixed(1);
            return {
                ...f,
                distance: duration * 750 /*km/h average speed*/,
            };
        });

        return this;
    }

    addCityNames() {
        this.flights = this.flights.map(f => {

            // get Cape Town from "Cape Town CPT"
            const withAirportCode = f.location.split(' ');
            withAirportCode.pop();
            let from = withAirportCode.join(' ');

            // change TFN to Tenerife
            if (from.length === 3 && airports2cities[from]) {
                from = airports2cities[from];
            }

            // get BCN from "Flight to BCN (FR 3064)"
            let to = f.summary.replace('Flight to ', '').replace(/\([^()]*\)/g, '').trim();

            // change BCN to Barcelona
            if (to.length === 3 && airports2cities[to]) {
                to = airports2cities[to];
            }

            return {
                ...f,
                from,
                to,
            };
        });

        return this;
    }

    filterCities() {
        this.cities = this.cities.filter(city => this.flights.find(
            flight => flight.to === city.name || flight.from === city.name
        ));

        return this;
    }

    countCityOccurrence() {
        this.cities = this.cities.map(
            city => {
                const i = this.flights.reduce(
                    (i, flight) => flight.to === city.name || flight.from === city.name ? i++ : i,
                    0
                );
                return { ...city, occurrence: i };
            }
        );

        return this;
    }

    addGeoData() {
        this.flights = this.flights.map(flight => {
            const to = this.cities.findIndex(city => city.name === flight.to);
            const from = this.cities.findIndex(city => city.name === flight.from);
            const flightCoords = {
                flightCoords: to > -1 && from > -1 ? [
                    [this.cities[from].longitude, this.cities[from].latitude],
                    [this.cities[to].longitude, this.cities[to].latitude]
                ] : []
            };

            return {
                ...flight,
                ...flightCoords,
            };
        });

        return this;
    }
}

export default DataPipeline;
