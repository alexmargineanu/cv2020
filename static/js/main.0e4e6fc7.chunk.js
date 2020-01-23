(this.webpackJsonpcv2020=this.webpackJsonpcv2020||[]).push([[0],{71:function(t,e,n){t.exports=n(85)},82:function(t,e,n){},83:function(t,e,n){},84:function(t,e,n){},85:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),r=n(15),o=n.n(r),s=n(3),l=n(4),c=n(6),u=n(5),h=n(7),f=n(87),g=n(43),d=function(t){try{var e=g.parse(t);return e.length&&e[2]?e[2].map((function(t){return function(t){for(var e={},n=0;n<t[1].length;n++){var a=t[1][n];e[a[0]]=a[3]}return e}(t)})):(console.error("no parsed events"),[])}catch(n){console.error(n.name,n.message)}},m=n(17),p=n.n(m),v=n(8),y=n(9),b=(n(82),function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(c.a)(this,Object(u.a)(e).call(this))).state={totalTime:0},t}return Object(h.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(t,e){this.props.flight&&t.flight!==this.props.flight&&this.setState({totalTime:(parseFloat(e.totalTime)+parseFloat(this.props.flight.duration)).toFixed(1)})}},{key:"render",value:function(){var t=this.props.flight,e=this.state.totalTime;return t.from?i.a.createElement("section",{className:"Table"},i.a.createElement("h1",null,i.a.createElement(v.a,{icon:y.a})," ",i.a.createElement(p.a,{format:"DD MMM YYYY"},t.dtstart)),i.a.createElement("ul",null,i.a.createElement("li",null,i.a.createElement("h2",null,i.a.createElement(v.a,{icon:y.d})," ",t.from)),i.a.createElement("li",{className:"separator"},i.a.createElement(p.a,{format:"hh:mma"},t.dtstart),i.a.createElement("small",null,i.a.createElement(v.a,{icon:y.b})," ",t.duration," h"),i.a.createElement(p.a,{format:"hh:mma"},t.dtend)),i.a.createElement("li",null,i.a.createElement("h2",{style:{textAlign:"right"}},t.to," ",i.a.createElement(v.a,{icon:y.c})))),i.a.createElement("small",{className:"info"},i.a.createElement(v.a,{icon:y.b})," ",e," hours in the air")):i.a.createElement("section",{className:"Table"},i.a.createElement("h1",null,i.a.createElement("small",{className:"separator"},"loading flights")))}}]),e}(i.a.Component)),w=n(45),E=n(2),j=n(44),k=function(t){return t.replace("@","").replace(".","").replace("#","").split(" ").join("")},O=E.d().translate([window.innerWidth/2,window.innerHeight/2]).scale(222),C=E.e().projection(O),F=function(){function t(e){Object(s.a)(this,t),this.cities=e.cities,this.flights=e.flights,this.updateFlight=e.getCurrentFlight,this.flightTime=e.flightTime||2500,this.svg=e.svg}return Object(l.a)(t,[{key:"renderCircles",value:function(){var t=this.svg.selectAll("circle").data(this.cities);return t.enter().append("svg:circle").attr("cx",(function(t){return O([t.longitude,t.latitude])[0]})).attr("cy",(function(t){return O([t.longitude,t.latitude])[1]})).attr("r",5.5).attr("class",(function(t){return"city".concat(k(t.name))})),t.exit().remove(),this}},{key:"renderFlightPath",value:function(){var t=this;return this.flights.forEach((function(e){e.flightCoords&&2===e.flightCoords.length?(t.svg.append("path").attr("d",C({type:"LineString",coordinates:[e.flightCoords[0],e.flightCoords[1]]})).attr("class","flight-path flight-path".concat(k(e.uid))),t.svg.append("path").attr("d",C({type:"LineString",coordinates:[e.flightCoords[0],e.flightCoords[1]]})).attr("class","dashed dashed".concat(k(e.uid)))):console.error("no flightCoords for",e)})),this.svg.append("path").attr("d","M-5,0 L-5,5 L5,0 L-5,-5 Z").attr("class","arrow"),this.svg.selectAll(".flight-path").data(this.flights).each((function(e,n){e.to&&e.from&&setTimeout((function(){t.updateFlight(e),t.animateFlightPath(e)}),t.flightTime*n)})),this}},{key:"animateFlightPath",value:function(t){var e=E.g(".arrow"),n=E.g(".city".concat(k(t.from))),a=E.g(".city".concat(k(t.to))),i=E.g(".label".concat(k(t.from))),r=E.g(".label".concat(k(t.to))),o=E.g(".flight-path".concat(k(t.uid))),s=E.g(".dashed".concat(k(t.uid))),l=o.node(),c=l?l.getTotalLength():null,u=function(t){var e=l.getPointAtLength(t);return[e.x,e.y]},h=E.h().duration(this.flightTime-300).delay(0).on("start",(function(){[e,o,n,i,s].forEach((function(t){return t.style("display","block")})),a.attr("r",parseFloat(a.attr("r"))+.5)})).on("end",(function(){s.style("display","none"),e.style("display","none"),a.style("display","block"),r.style("display","block")}));c&&(e.transition(h).attrTween("transform",(function(){return function(t){var e=t*c;return"translate("+u(e)+") rotate( "+function(t){var e=u(Math.max(t-.01,0)),n=u(t+.01);return 180*Math.atan2(n[1]-e[1],n[0]-e[0])/Math.PI}(e)+")"}})),o.transition(h).attrTween("stroke-dasharray",(function(){return E.f("0,"+c,c+","+c)})))}},{key:"renderLabels",value:function(){return this.svg.append("g").selectAll("g").data(this.cities).enter().append("g").append("text").attr("x",(function(t){return O([t.longitude,t.latitude])[0]+8})).attr("y",(function(t){return O([t.longitude,t.latitude])[1]+3})).attr("class",(function(t){return"label".concat(k(t.name))})).text((function(t){return t.name})),this.checkLabelOverlapping(this.svg.selectAll("text")),this}},{key:"checkLabelOverlapping",value:function(t){return t.each((function(e,n){var a=this.getBBox();t.filter((function(t,e){return e>n})).each((function(){var t=this.getBBox();(function(t,e){t.left=t.x-0,t.right=t.x+t.width+0,t.top=t.y-0,t.bottom=t.y+t.height+0,e.left=e.x-0,e.right=e.x+e.width+0,e.top=e.y-0,e.bottom=e.y+e.height+0;var n=t,a=e;return!(n.left>=a.right||n.top>=a.bottom||n.right<=a.left||n.bottom<=a.top)})(a,t)&&E.g(this).style("opacity",.5)}))})),this}}]),t}(),x=function(){function t(e){Object(s.a)(this,t),this.world=e.world,this.svg=e.svg,this.worldMap()}return Object(l.a)(t,[{key:"worldMap",value:function(){var t=this;this.svg.append("path").attr("d",C).datum(E.c()).attr("class","grid");var e=j.a(this.world,this.world.objects.countries).features;this.svg.selectAll(".country").data(e).enter().insert("path",".grid").attr("class","country").attr("d",C).style("fill","#fff");var n=E.i().scaleExtent([1,3]).on("zoom",(function(){t.svg.select(".arrow").attr("transform",E.b.transform),t.svg.selectAll("path").attr("transform",E.b.transform),t.svg.selectAll("circle").attr("transform",E.b.transform),t.svg.selectAll("text").attr("transform",E.b.transform)}));this.svg.call(n)}}]),t}(),T=n(11),N=n(16),L=n.n(N),M={BCN:"Barcelona",TFN:"Tenerife",OTP:"Bucharest"},A=function(){function t(e){Object(s.a)(this,t),this.cities=e.cities,this.flights=e.flights}return Object(l.a)(t,[{key:"addFlightDuration",value:function(){return this.flights=this.flights.map((function(t){return Object(T.a)({},t,{duration:parseFloat(L()(t.dtend).diff(L()(t.dtstart),"hours",!0)).toFixed(1)})})),this}},{key:"addCityNames",value:function(){return this.flights=this.flights.map((function(t){var e=t.location.split(" ");e.pop();var n=e.join(" ");n&&3===n.length&&M[n]&&(n=M[n]);var a=t.summary.replace("Flight to ","").replace(/\([^()]*\)/g,"").trim();return a&&3===a.length&&M[a]&&(a=M[a]),Object(T.a)({},t,{from:n,to:a})})),this}},{key:"filterCities",value:function(){var t=this;return this.cities=this.cities.filter((function(e){return t.flights.find((function(t){return t.to===e.name||t.from===e.name}))})),this}},{key:"countCityOccurrence",value:function(){var t=this;return this.cities=this.cities.map((function(e){var n=t.flights.reduce((function(t,n){return n.to!==e.name&&n.from!==e.name||t++,t}),0);return Object(T.a)({},e,{occurence:n})})),this}},{key:"addGeoData",value:function(){var t=this;return this.flights=this.flights.map((function(e){var n=t.cities.findIndex((function(t){return t.name===e.to})),a=t.cities.findIndex((function(t){return t.name===e.from})),i={fromCoords:-1===a?[]:[t.cities[a].longitude,t.cities[a].latitude]},r={toCoords:-1===n?[]:[t.cities[n].longitude,t.cities[n].latitude]},o={flightCoords:n>-1&&a>-1?[[t.cities[a].longitude,t.cities[a].latitude],[t.cities[n].longitude,t.cities[n].latitude]]:[]};return Object(T.a)({},e,{},o,{},i,{},r)})),this}},{key:"valCities",get:function(){return this.cities}},{key:"valFlights",get:function(){return this.flights}}]),t}(),D=(n(83),function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(c.a)(this,Object(u.a)(e).call(this))).mapRef=i.a.createRef(),t.state={world:[]},t}return Object(h.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){var t=this;fetch("/world-50m.json").then((function(e){return e.json().then((function(e){return t.setState({world:e})}))})).catch((function(t){return console.error(t)}))}},{key:"componentDidUpdate",value:function(t,e){var n=this,a=this.state.world,i=E.g(this.mapRef.current);e.world!==a&&null!==a&&Promise.all([E.a("geonames_cities100000.csv")]).then((function(t){var e=Object(w.a)(t,1)[0],r=new A({cities:e,flights:n.props.flights}).addCityNames();new x({svg:i,world:a}),setTimeout((function(){new F({svg:i,cities:r.filterCities().valCities,flights:r.addGeoData().valFlights,getCurrentFlight:function(t){return n.props.getCurrentFlight(t)},flightTime:2300}).renderLabels().renderFlightPath().renderCircles()}),2e3)})).catch((function(t){return console.log("Error loading or parsing data.",t)}))}},{key:"render",value:function(){var t=this.state.world;return t?t.length&&0===t.length?i.a.createElement("small",null,"Loading"):i.a.createElement("section",{className:"map"},i.a.createElement("svg",{ref:this.mapRef})):i.a.createElement("small",null,"Error")}}]),e}(i.a.Component)),B=(n(84),function(t){function e(t){var n;return Object(s.a)(this,e),(n=Object(c.a)(this,Object(u.a)(e).call(this,t))).state={flights:[],flight:{}},n}return Object(h.a)(e,t),Object(l.a)(e,[{key:"updateCurrentFlight",value:function(t){this.setState({flight:t})}},{key:"componentDidMount",value:function(){var t=this,e="/takeout/data.ics";fetch(e).then((function(n){200===n.status?n.text().then((function(e){var n=d(e);if(n){var a=n.filter((function(t){return!!t.summary&&t.summary.indexOf("Flight to")>-1})),i=new A({flights:a}).addCityNames().addFlightDuration().valFlights;t.setState({flights:i})}})):console.error("status "+n.status,"url:",e)})).catch((function(t){return console.error(t)}))}},{key:"render",value:function(){var t=this,e=this.state,n=e.flights,a=e.flight;return i.a.createElement(f.a,{timeout:0,classNames:"water",in:!0,appear:!0},i.a.createElement("div",{className:"water"},i.a.createElement(D,{flights:n,getCurrentFlight:function(e){return t.updateCurrentFlight(e)}}),i.a.createElement(b,{flight:a})))}}]),e}(i.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[71,1,2]]]);
//# sourceMappingURL=main.0e4e6fc7.chunk.js.map