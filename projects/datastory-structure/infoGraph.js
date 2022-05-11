let w=window.innerWidth-200;
let h=window.innerHeight-100;
// let w = 1400;
// let h = 500;
let padding = 30;



let viz = d3.select("#visualization")
    .append("svg")
  .style("background-color", "black")
  .attr("width", w)
  .attr("height", h)
;



// initialise scales
let xScale = d3.scaleTime().range([padding, w-padding]);
let yScale = d3.scaleLinear().range([h-padding, padding] )



d3.json("jumpscares.json").then(function(incomingData){
  console.log(incomingData);

  // incomingData = incomingData.slice(0,500);

    let parseTime = d3.timeParse("%Y"); //a function-time string
    // console.log(parseTime(2010))

  //turn date in to data object
  incomingData = incomingData.map(d=>{
    d.year = parseTime(d.year)
    d.price= Number(d.price)
    d.jumpCount= Number(d.jumpCount)
    d.rating=Number(d.jumpScareRating)
    d.runtime= Number(d.runtime)
    return d
  })

  let runtimeExtent=d3.extent(incomingData,function(d){
    return d.runtime;
  })
  let dScale=d3.scaleLinear().domain(runtimeExtent).range([2,27])

  //x-axis
  // get the earliest and latest date in the dataset
  let yearExtent = d3.extent(incomingData, function(d){
    return d.year;
  })
  console.log(yearExtent);
  // amend domain to scale
  xScale.domain(yearExtent);
  // group to hold axis
  let xAxisGroup = viz.append("g").attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h-padding)+")")
      .attr("class", "axisColor")
  ;
  // ask d3 to get an axis ready
  let xAxis = d3.axisBottom(xScale);
  // build the axis into our group
  xAxisGroup.call(xAxis);

  // yaxis
  let jumpCountExtent = d3.extent(incomingData, function(d){
    return d.jumpCount;
  })
  console.log(jumpCountExtent);
  yScale.domain(jumpCountExtent)
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g")
      .attr("class", "yaxisgroup")
      .attr("transform", "translate("+padding+",0)")
      .attr("class", "axisColor")
  ;
  yAxisGroup.call(yAxis);


//mouseover and mouseout

// viz.selectAll(".datapoint").data(incomingData).enter()
//     .append("text")
//     .text("hi")
//     .attr("class","context")
//     .attr("font-size", 15)
//     .attr("fill", "black")
//     .style("font-family", "sans-serif")
//     .style("opacity", 1)
//     // .on("mouseover", textMouseOver)
//     // .on("mouseout", textMouseOut)
//   ;

  // put a rectangle for each data point onto the page, size-runtime
  viz.selectAll(".datapoint").data(incomingData).enter()
    .append("rect")
    .attr("class", "datapoint")
    .attr("x", function(d){
      return xScale(d.year)-dScale(d.runtime);
    })
    .attr("y", function(d){
      return yScale(d.jumpCount)-dScale(d.runtime);
    })
    .attr("width", function(d,i){
      return dScale(d.runtime)
    })
    .attr("height", function(d,i){
      return dScale(d.runtime)
    })
    .attr("fill","red")
    .style("opacity",0.5)
    // .on("mouseover", function (d, i) {
    //     d3.select(this).selectAll('.context').style("opacity",1)
    // })
    // .on("mouseout", function (d, i) {
    //     d3.select(this).selectAll('.context').style("opacity",0)
    // })
  ;

//   viz.selectAll('rect')
//       .on('mouseover', mouseOver)
//       .on('mouseout', mouseOut)
// 
//   function mouseOver(d, i) {
//       d3.select(this)
//           .append("text")
//           .text("hi")
//           .attr('opacity', 1)
//       }
//   function mouseOut(d, i) {
//       d3.select(this)
//           .append("text")
//           .text("hi")
//           .attr('opacity', 0)
//       }

// viz.append("text")
//     .text("")
//     .attr("class","context")
//     .attr("font-size", 15)
//     .attr("fill", "black")
//     .style("font-family", "sans-serif")
//     .style("opacity", 0)
//     // .on("mouseover", textMouseOver)
//     // .on("mouseout", textMouseOut)
//   ;

  incomingData=incomingData.map(function(datapoint){
    datapoint.x=xScale(datapoint.date);
    datapoint.y=h/2;
    return datapoint
  })


  // problem: points overlap!




})
