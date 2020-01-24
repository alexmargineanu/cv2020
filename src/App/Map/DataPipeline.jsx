import moment from 'moment';

class citiesPipeline {
    constructor(args) {
        this.cities = args.cities;
        this.flights = args.flights;
    }

    get valCities() {
        return this.cities;
    }

    get valFlights() {
        this.flights.sort(function(a, b) {
          if (a.dtstart < b.dtstart) {
            return -1;
          }
          if (a.dtstart > b.dtstart) {
            return 1;
          }
          return 0;
        });
        return this.flights;
    }

    addFlightDuration() {
        this.flights = this.flights.map(e => {
            return {
                ...e,
                duration: parseFloat(moment(e.dtend).diff(moment(e.dtstart), 'hours', true)).toFixed(1),
            };
        });

        return this;
    }


    addCityNames() {
        this.flights = this.flights.map(e => {

            // get London from "London LHR"
            const withAirportCode = e.location.split(' ');
            withAirportCode.pop();
            let from = withAirportCode.join(' ');

            // get BCN from "Flight to BCN (FR 3064)"
            let to = e.summary.replace('Flight to ', '').replace(/\([^()]*\)/g, '').trim();

            return {
                ...e,
                from,
                to,
            };
        });

        return this;
    }

    filterCities(){
        this.cities = this.cities.filter(city => this.flights.find(
            flight => flight.to === city.name || flight.from === city.name
        ));

        return this;
    }

    countCityOccurrence() {
        this.cities = this.cities.map(
            city => {
                const occurence = this.flights.reduce(
                    (occurence, flight) => {
                        if(flight.to === city.name || flight.from === city.name){
                            occurence++;
                        }
                        return occurence;
                    }, 0
                );
                return { ... city, occurence };
            }
        );

        return this;
    }

    addGeoData() {
        this.flights = this.flights.map(flight => {
            const to = this.cities.findIndex(city => city.name === flight.to);
            const from = this.cities.findIndex(city => city.name === flight.from);
            const fromCoords = {
                fromCoords: from === -1 ? [] : [this.cities[from].longitude, this.cities[from].latitude]
            };
            const toCoords = {
                toCoords: to === -1 ? [] : [this.cities[to].longitude, this.cities[to].latitude]
            };
            const flightCoords = {
                flightCoords: to > -1 && from > -1 ? [
                    [this.cities[from].longitude, this.cities[from].latitude],
                    [this.cities[to].longitude, this.cities[to].latitude]
                ] : []
            };
            const obj = {
                ...flight,
                ...flightCoords,
                ...fromCoords,
                ...toCoords,
            };
            return obj;
        });

        return this;
    }
}

export default citiesPipeline;
