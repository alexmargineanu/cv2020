import * as ICAL from 'ical.js';

const iCalParser = (data) => {

    const dumpCalendar = (parsedEvents) => {
        const comp = new ICAL.Component(['vcalendar', [], []]);

        const flightEvents = parsedEvents.filter(d => {
            if(d.summary){
                return d.summary.indexOf('Flight to') > -1;
            }
            return false;
        });
        flightEvents.map(f => {
            const vevent = new ICAL.Component('vevent');
            var event = new ICAL.Event(vevent);
            event.summary = f.summary;
            event.location = f.location;
            event.uid = f.uid;

            vevent.addPropertyWithValue('dtstart', f.dtstart);
            vevent.addPropertyWithValue('dtend', f.dtend);
            vevent.addPropertyWithValue('dtstamp', f.dtstamp);
            vevent.addPropertyWithValue('created', f.created);

            comp.addSubcomponent(vevent);
        });

        console.log(comp.toString());


    }

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
            const e = events.map(event => flattenEvent(event));
            //dumpCalendar(e);
            return e;
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
