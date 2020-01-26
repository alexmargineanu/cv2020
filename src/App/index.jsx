import React from 'react';
import { CSSTransition } from 'react-transition-group';
import iCalParser from './ICal';
import Table from './Table';
import Map from './Map';
import DataPipeline from './Map/DataPipeline';

import './index.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flights: [],
            flight: {},
        };
    }

    updateCurrentFlight(flight) {
        this.setState({ flight });
    }

    componentDidMount() {
        const url = 'https://alexmargineanu.github.io/cv2020/data.ics';
        fetch(url)
            .then(response => {
                if(response.status === 200) {
                    response.text()
                        .then(txt => {
                            const parsedEvents = iCalParser(txt);
                            if(parsedEvents){
                                const flightEvents = parsedEvents.filter(
                                    f => f.summary ? f.summary.indexOf('Flight to') > -1 : false
                                );
                                const flights = new DataPipeline({
                                    flights: flightEvents
                                }).addCityNames().addFlightDuration().addFlightDistance().valFlights;

                                this.setState({ flights });
                            }
                        });
                } else {
                    console.error('status ' + response.status, 'url:', url);
                }
            })
            .catch(error => console.error(error));
    }


    render() {
        const { flights, flight } = this.state;
        return (
            <CSSTransition
                timeout={500}
                classNames="water"
                in={true}
                appear={true}
            >
                <div className="water">
                    <Map
                        flights={flights}
                        getCurrentFlight={f => this.updateCurrentFlight(f)}
                    />
                    <Table
                        flight={flight}
                    />
                </div>
            </CSSTransition>
        );
    }
}

export default App;
