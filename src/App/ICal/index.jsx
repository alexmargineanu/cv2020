import * as ICAL from 'ical.js';

const iCalParser = (data) => {

    const flattenEvent = iCalEvent => {
        return iCalEvent[1].reduce((event, values) => {
            event[values[0]] = values[3];
            return event;
        }, {});
    };

    try {
        const iCalEvents = ICAL.parse(data);
        if(iCalEvents.length && iCalEvents[2]){
            return iCalEvents[2].map(iCalEvent => flattenEvent(iCalEvent));
        } else {
            console.error('no parsed events');
            return [];
        }
    }
    catch(error) {
        console.error(error.name, error.message);
    }

};

export default iCalParser;
