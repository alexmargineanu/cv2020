import * as ICAL from 'ical.js';

const iCalParser = (data) => {

    const flattenEvent = (e) => {
        let event = {};
        for(let i = 0; i < e[1].length; i++) {
            let prop = e[1][i];
            event[prop[0]] = prop[3];
        }
        return event;
    };

    try {
        const calendarEntries = ICAL.parse(data);
        if(calendarEntries.length && calendarEntries[2]){
            const events = calendarEntries[2];
            return events.map(event => flattenEvent(event));
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
