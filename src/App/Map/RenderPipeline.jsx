import * as d3 from 'd3';

import {
    getOverlapFromTwoExtents,
    cssClass
} from './utils';

const projection = d3.geoMercator().translate(
    [window.innerWidth / 2, window.innerHeight / 2]
).scale(
    160
);

const path = d3.geoPath().projection(projection);

export { path, projection };

class RenderPipeline  {

    constructor(args) {
        this.cities = args.cities;
        this.flights = args.flights;
        this.updateFlight = args.getCurrentFlight;
        this.flightTime = args.flightTime || 2500;
        this.svg = args.svg;
    }

    renderCircles() {
        const circles = this.svg.selectAll('circle').data(this.cities);
        circles.enter().append('svg:circle')
            .attr('cx', d => projection([d.longitude,d.latitude])[0])
            .attr('cy', d => projection([d.longitude,d.latitude])[1])
            .attr('r',  5.5)
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

        this.svg.append('path')
            .attr('d', 'M-5,0 L-5,5 L5,0 L-5,-5 Z')
            .attr('class', 'arrow');

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
        const arrow           = d3.select('.arrow');
        const fromCity        = d3.select(`.city${cssClass(d.from)}`);
        const toCity          = d3.select(`.city${cssClass(d.to)}`);
        const fromCityLabel   = d3.select(`.label${cssClass(d.from)}`);
        const toCityLabel     = d3.select(`.label${cssClass(d.to)}`);
        const flightPath      = d3.select(`.flight-path${cssClass(d.uid)}`);
        const dashedPath      = d3.select(`.dashed${cssClass(d.uid)}`);

        const path = flightPath.node();
        const totalLength = path ? path.getTotalLength() : null;

        const pointAtLength = (l) => {
            const xy = path.getPointAtLength(l);
            return [xy.x, xy.y];
        };

        // Approximate tangent
        const angleAtLength = (l) => {
            const a = pointAtLength(Math.max(l - 0.01,0)); // this could be slightly negative
            const b = pointAtLength(l + 0.01); // browsers cap at total length
            return Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
        };

        const t = d3.transition()
            .duration(this.flightTime - 300)
            .delay(0)
            .on('start',function(){
                const setVisible = [
                    arrow,
                    flightPath,
                    fromCity,
                    fromCityLabel,
                    dashedPath,
                ];
                setVisible.forEach(path => path.style('display', 'block'));
                toCity.attr('r', parseFloat(toCity.attr('r'))+0.5);
            })
            .on('end',function(){
                dashedPath.style('display', 'none');
                arrow.style('display', 'none');
                toCity.style('display', 'block')
                toCityLabel.style('display', 'block')
            });

        if(totalLength){
            arrow.transition(t)
                .attrTween('transform',function(){
                    return function(t){
                        const pos = t * totalLength;
                        return 'translate(' + pointAtLength(pos) + ') rotate( ' + angleAtLength(pos) + ')';
                    };
                });

            flightPath.transition(t)
                .attrTween('stroke-dasharray',function(){
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
            data.filter((k, j) => j > i).each(function(){
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
