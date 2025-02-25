let w = 1200;
let h = 800;
let padding = 90

// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender")
;


// IMPORT DATA
// d3.json("countries.geojson").then(function(geoData){
d3.json("mainland.geojson").then(function(geoData){
  d3.csv("china-pop-2018.csv").then(function(incomingData){
    // console.log(incomingData);

    incomingData=incomingData.map(function(d,i){
      d.population=Number(d.population); //turn strings into numbers
      return d
    })

    let minPop = d3.min(incomingData, function(d,i){
      return d.population
    })

    let maxPop = d3.max(incomingData, function(d,i){
      return d.population
    })

    let colorScale=d3.scaleLinear().domain([minPop,maxPop]).range(["white","blue"]);
    // console.log(colorScale(20))


    // PRINT DATA
    // console.log(geoData); //type: FeatureCollection...

    // SCALES (to translate data values to pixel values)
    // let xDomain = d3.extent(incomingData, function(d){ return Number(d.year); })
    // let xScale = d3.scaleLinear().domain(xDomain).range([padding,w-padding]);
    // let yDomain = d3.extent(incomingData, function(d){ return Number(d.birthsPerThousand); })
    // let yScale = d3.scaleLinear().domain(yDomain).range([h-padding,padding]);


    let projection=d3.geoEqualEarth() //returns a projection
      .translate([w/2,h/2])
      // .center([103.8,34.1])
      .fitExtent([[padding,padding],[w-padding,h-padding]],geoData)
    ;
    // PATH (line) MAKER - gets points, returns one of those complicated looking path strings
    // let lineMaker = d3.line()
    //     .x(function(d){
    //       return xScale(Number(d.year));
    //     })
    //     .y(function(d){
    //       return yScale(Number(d.birthsPerThousand));
    //     })
    // ;

    let pathMaker = d3.geoPath(projection); 

    // CREATE SHAPES ON THE PAGE!
    viz.selectAll(".provinces").data(geoData.features).enter() //data should be an array
      .append("path")
        .attr("class", "province")
        .attr("d", pathMaker)
        .attr("fill", function(d,i){
          // console.log(d.properties.name)

          //see if d.properties.name is in incomingData
          let correspondingDatapoint=incomingData.find(function(datapoint){ //can also be filter
            // console.log(datapoint);
            if(datapoint.province==d.properties.name){
              return true
            }else{
              return false 
            }
          })

          if(correspondingDatapoint != undefined){
            return colorScale(correspondingDatapoint.population)
          }else{
            return "black"
          }

        })
        .attr("stroke", "white")
        // .attr("stroke-width", 8)
    ;

    let lat=31.22773
    let lon=121.52946
    // let pixelvalue=projection([lon,lat])
    

    viz.append("circle")
      .attr("cx",function(){
        return projection([lon,lat])[0];
      })
      .attr("cy",function(){
        return projection([lon,lat])[1];
      })
      .attr("r",20)
      .attr("fill","red")
    ;

  });
});
