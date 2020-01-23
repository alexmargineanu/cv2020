import * as d3 from 'd3';
import * as topojson from 'topojson';
import { path } from './RenderPipeline';

class D3Map {

    constructor(args) {
        this.world = args.world;
        this.svg = args.svg;

        this.worldMap();
    }

    worldMap(){
        this.svg.append('path')
            .attr('d', path)
            .datum(d3.geoGraticule())
            .attr('class', 'grid');

        const countries = topojson.feature(this.world, this.world.objects.countries).features;
        this.svg.selectAll('.country')
            .data(countries)
            .enter().insert('path', '.grid')
            .attr('class', 'country')
            .attr('d', path)
            .style('fill', '#fff');


        const zoomed = () => {
            this.svg.select('.arrow').attr('transform', d3.event.transform);
            this.svg.selectAll('path').attr('transform', d3.event.transform);
            this.svg.selectAll('circle').attr('transform', d3.event.transform);
            this.svg.selectAll('text').attr('transform', d3.event.transform);
        };

        const zoom = d3.zoom().scaleExtent([1, 3]).on('zoom', zoomed);

        this.svg.call(zoom);
    }
}

export default D3Map;
