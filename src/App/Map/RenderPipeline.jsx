import * as d3 from 'd3';

import {
    getOverlapFromTwoExtents,
    cssClass
} from './utils';

const width = window.innerWidth;
const height = window.innerHeight;

const projections = {
    geoMercator: d3.geoMercator().translate(
        [width / 2, height / 2]
    ).scale(
        190
    ),
    geoConicConformal: d3.geoConicConformal()
        .parallels([35, 65])
        .rotate([-20, 0])
        .scale(width)
        .center([0, 52])
        .translate([width / 2, height / 2])
        .precision(0.2),
};

const projection = projections.geoMercator;

const path = d3.geoPath().projection(projection);

export { path, projection };

class RenderPipeline  {

    constructor(props) {
        this.cities = props.cities;
        this.flights = props.flights;
        this.updateFlight = props.getCurrentFlight;
        this.flightTime = props.flightTime || 2500;
        this.svg = props.svg;
    }

    renderCircles() {
        const circles = this.svg.selectAll('circle').data(this.cities);
        circles.enter().append('svg:circle')
            .attr('cx', d => projection([d.longitude,d.latitude])[0])
            .attr('cy', d => projection([d.longitude,d.latitude])[1])
            .attr('r',  4.5)
            .attr('class', d => `city${cssClass(d.name)}`);
        circles.exit().remove();

        return this;
    }

    renderFlightPath() {
        this.flights.forEach(flight => {
            if(flight.flightCoords && flight.flightCoords.length === 2) {
                this.svg.append('path')
                    .attr('d', path({
                        type: 'LineString',
                        coordinates: [
                            flight.flightCoords[0],
                            flight.flightCoords[1]
                        ]
                    }))
                    .attr('class', `flight-path flight-path${cssClass(flight.uid)}`);

                    this.svg.append('path')
                        .attr('d', path({
                            type: 'LineString',
                            coordinates: [
                                flight.flightCoords[0],
                                flight.flightCoords[1]
                            ]
                        }))
                        .attr('class', `dashed dashed${cssClass(flight.uid)}`);
            } else {
                console.error('no flightCoords for', flight);
            }
        });

        this.svg.selectAll('.flight-path').data(this.flights).each(
            (flight, index) => {
                if(flight.to && flight.from) {
                    setTimeout(
                        () => {
                            this.updateFlight(flight);
                            this.animateFlightPath(flight);
                        }, this.flightTime * index
                    )
                }
            }
        );
        return this;
    }

    animateFlightPath(d) {
        const fromCity        = d3.select(`.city${cssClass(d.from)}`);
        const toCity          = d3.select(`.city${cssClass(d.to)}`);
        const flightPath      = d3.select(`.flight-path${cssClass(d.uid)}`);
        const dashedPath      = d3.select(`.dashed${cssClass(d.uid)}`);

        const path = flightPath.node();
        const totalLength = path ? path.getTotalLength() : null;

        const t = d3.transition()
            .duration(this.flightTime - 300)
            .delay(0)
            .on('start',function() {
                const setVisible = [
                    flightPath,
                    fromCity,
                    toCity,
                    dashedPath,
                ];
                setVisible.forEach(path => path.style('display', 'block'));
                toCity.attr('r', parseFloat(toCity.attr('r')) + 0.25);
            })
            .on('end',function() {
                dashedPath.style('stroke', '#999');
                flightPath.style('display', 'none');
            });

        if(totalLength){
            flightPath.transition(t)
                .attrTween('stroke-dasharray',function() {
                    return d3.interpolateString('0,' + totalLength,totalLength + ',' + totalLength);
                });
        }
    }

    renderLabels() {
        this.svg.append('g').selectAll('g')
            .data(this.cities)
            .enter().append('g')
            .append('text')
            .attr('x', d => projection([d.longitude,d.latitude])[0] + 8)
            .attr('y', d => projection([d.longitude,d.latitude])[1] + 3)
            .attr('class', d => `label${cssClass(d.name)}`)
            .text(d => d.name);

        this.checkLabelOverlapping(this.svg.selectAll('text'));

        return this;
    }

    checkLabelOverlapping(data){
        data.each(function(d, i) {
            const thisBBox = this.getBBox();
            data.filter((k, j) => j > i).each(function() {
                const underBBox = this.getBBox();
                if(getOverlapFromTwoExtents(thisBBox, underBBox)){
                    d3.select(this).style('opacity', 0.5);
                }
            });
        });

        return this;
    }
}

export default RenderPipeline;
