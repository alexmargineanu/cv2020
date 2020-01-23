import React from 'react';
import PropTypes from 'prop-types';

import Moment from 'react-moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlaneDeparture,
    faPlaneArrival,
    faCalendarAlt,
    faClock,
} from '@fortawesome/free-solid-svg-icons';

import './index.scss';

class Table extends React.Component {

    constructor() {
        super();
        this.state = {
            totalTime: 0,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.flight && prevProps.flight !== this.props.flight) {
            this.setState({
                totalTime: (parseFloat(prevState.totalTime) + parseFloat(this.props.flight.duration)).toFixed(1)
            });
        }
    }

    render() {
        const {
            flight,
        } = this.props;

        const {
            totalTime,
        } = this.state;

        if(!flight.from) {
            return (
                <section className="Table">
                    <h1>
                        <small className="separator">loading flights</small>
                    </h1>
                </section>
            );
        }

        return (
            <section className="Table">
                <h1>
                    <FontAwesomeIcon icon={faCalendarAlt} /> <Moment format='DD MMM YYYY'>{flight.dtstart}</Moment>
                </h1>
                <ul>
                    <li>
                        <h2>
                            <FontAwesomeIcon icon={faPlaneDeparture} /> {flight.from}
                        </h2>
                    </li>
                    <li className="separator">
                        <Moment format='hh:mma'>{flight.dtstart}</Moment>
                        <small>
                            <FontAwesomeIcon icon={faClock} /> {flight.duration} h
                        </small>
                        <Moment format='hh:mma'>{flight.dtend}</Moment>
                    </li>
                    <li>
                        <h2 style={{textAlign: 'right'}}>
                            {flight.to} <FontAwesomeIcon icon={faPlaneArrival} />
                        </h2>
                    </li>
                </ul>
                <small className="info">
                    <FontAwesomeIcon icon={faClock} /> {totalTime} hours in the air
                </small>
            </section>
        );
    }
}

Table.propTypes = {
    flight: PropTypes.object,
};

export default Table;
