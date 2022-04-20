let w = 1200;
let h = 800;
let padding = 30

// SVG
let viz = d3.select("#container").append("svg")
  .style("width", w)
  .style("height", h)
  .style("background-color", "lavendar")


// IMPORT DATA
d3.json("mainland.geojson").then(function (geoData) {
    d3.csv('china-pop-2018.csv').then(function (incomingData) {
      
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

    let colorScale = d3.scaleLinear().domain([minPop, maxPop]).range(['white', 'green']);


    let projection=d3.geoEquirectangular() //returns a projection
      .translate([w/2,h/2])
      // .scale(300)
      // .center([103.8,34.1])
      .fitExtent([[padding,padding],[w-padding,h-padding]],geoData)
    ;

      let pathMaker = d3.geoPath(projection);

      viz.selectAll(".province").data(geoData.features).enter()
        .append("path")
        .attr("class", "province")
        .attr("d", pathMaker)
        .attr("fill", function(d,i) {
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
        .on('mouseover', mouseOn)
        .on('mouseout', mouseOut)


      function mouseOn() {
        d3.select(this).attr('fill', 'red')
      }

      function mouseOut() {
        d3.select(this)
            .attr("fill", function(d,i) {
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

    }
  })

})
