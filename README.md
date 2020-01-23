## About the project
The app takes as input the **.ics** file exported from your favorite calendar, and outputs your flight history animated on a D3 map of the world.

![UI Preview](https://alexmargineanu.github.io/cv2020/preview.png)

#### The calendar entries need to follow this format:
```
BEGIN:VCALENDAR
BEGIN:VEVENT
DTSTART:20080205T191224Z
DTEND:20080206T191224Z
SUMMARY:Flight to Paris
LOCATION:LONDON LTN
UID:4088E990AD89CB3DBB484909
END:VEVENT
END:VCALENDAR
```

## Javascript libraries used:
- **ICAL** Javascript parser for ics (rfc5545) [mozilla-comm/ical.js](https://github.com/mozilla-comm/ical.js)
- **D3.js** SVG manipulation based on data  [d3/d3](https://github.com/d3/d3)
- **React** Javascript library for building user interfaces  [facebook/react](https://github.com/facebook/react)
- **create-react-app** Preconfigured javascript tools [facebook/create-react-app](https://github.com/facebook/create-react-app)
- **TopoJSON** An extension of GeoJSON that encodes topology
  [topojson/topojson](https://github.com/topojson/topojson)

## Data used:
- **World Atlas TopoJSON** Pre-built TopoJSON from Natural Earth
  [topojson/world-atlas](https://github.com/topojson/world-atlas)
- **cities100000.csv** This data is from GeoNames, and contains (name, latitude, longitude) for 23460 cities around the world. This only includes cities with more than 100,000 people.
  [curran/data](https://github.com/curran/data/blob/gh-pages/geonames/cities100000.csv)


## Running the project:
In the project directory, to install the project run:
### `yarn install`

To run the app in development mode ([http://localhost:3000)](http://localhost:3000)
### `yarn start`