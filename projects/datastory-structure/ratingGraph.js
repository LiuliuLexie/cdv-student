let w=window.innerWidth-200;
let h=window.innerHeight-200;
// let w = 1200;
// let h = 500;
let padding = 100;
margin = ({top: 10, right: 20, bottom: 20, left: 20})



let viz = d3.select("#visualization")
    .append("svg")
  .style("background-color", "black")
  .attr("width", w)
  .attr("height", h)
;



// initialise scales
let xScale = d3.scaleLinear().range([padding, w-padding]);



d3.json("jumpscares.json").then(function(incomingData){
  console.log(incomingData);

  incomingData = incomingData.slice(0,500);

  //turn date in to data object
  incomingData = incomingData.map(d=>{
    d.jumpCount= Number(d.jumpCount)
    d.rating=Number(d.jumpScareRating)
    d.runtime= Number(d.runtime)
    return d
  })

  let jumpCountExtent=d3.extent(incomingData,function(d){
    return d.jumpCount;
  })
  let rScale=d3.scaleLinear().domain(jumpCountExtent).range([2,15])

  // get the earliest and latest rating in the dataset
  let extent = d3.extent(incomingData, function(d){
    return d.jumpScareRating;
  })
  // console.log(extent);
  // amend domain to scale
  xScale.domain(extent);
  // group to hold axis
  let xAxisGroup = viz.append("g")
      .attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h-padding)+")")
      .attr("class", "axisColor")
    ;
  // ask d3 to get an axis ready
  let xAxis = d3.axisBottom(xScale);
  // build the axis into our group
  xAxisGroup.call(xAxis);


  // put a circle for each data point onto the page

  let circle=viz.selectAll(".datapoint").data(incomingData).enter()
  
  // circle.append("text")
  //   .text("hi")
  //   .attr("class","context")
  //   .attr("font-size", 15)
  //   .attr("fill", "black")
  //   .style("font-family", "sans-serif")
  //   .style("opacity", 1)
  //   // .on("mouseover", textMouseOver)
  //   // .on("mouseout", textMouseOut)
  // ;

  circle.append("circle")
    .attr("class", "datapoint")
    .attr("cx", function(d){
      return xScale(d.jumpScareRating);
    })
    .attr("cy", function(d){
      return h/2;
    })
    .attr("r", function(d,i){
      return rScale(d.jumpCount)
    })
    .attr("fill","tomato")
    // .on('mouseover', function (d, i) {
    //     d3.select(this).selectAll('#context').style("opacity",1)
    // })
    // .on('mouseout', function (d, i) {
    //     d3.select(this).selectAll('#context').style("opacity",0)
    // })
  ;


// function getText(d,i){
//     console.log(d.title)
//     return "<tspan x='0' dy='1.2em'>" + d.title + "s </tspan>" + "<tspan x='0' dy='1.2em'>" +d.director + "</tspan>"+ "<tspan x='0' dy='1.2em'>" +d.year+ "</tspan>";
// }
// 
//   let context = viz.append("text")
//       .text(getText)
//       .attr("id", "context")
//       .attr("x",0)
//       .attr("width",20)
//       .attr("fill","white")
//       .style("text-wrap","wrap")
//       .attr("font-size","xx-small")
//       .attr("y",10)
//       .style("opacity",0)
//       .attr("text-anchor", "middle")
//       .attr("dominant-baseline", "central") 
//   ;

  incomingData=incomingData.map(function(datapoint){
    datapoint.x=xScale(datapoint.jumpScareRating);
    datapoint.y=h/2;
    return datapoint
  })

  //create the simulation
  let simulation =d3.forceSimulation(incomingData)
    .force("forceX",function(d,i){
        return d3.forceX(xScale(d.jumpScareRating))
      })
    .force("forceY",d3.forceY(h/2))
    .force("collide", d3.forceCollide().radius( function(d,i){
        return rScale(d.jumpCount) +0.8
      }))
    .on("tick",simulationRan)
  ;
  function simulationRan(){
    // console.log(incomingData[0].x)
    viz.selectAll(".datapoint")
      .attr("cx", function(d){
        return d.x;
      })
      .attr("cy", function(d){
        return d.y;
      })
    ;
  }

  const brush = d3.brushX()
      .extent([[margin.left, margin.top], [w - margin.right, h - margin.bottom]])
      .on("start brush end", brushed);

  // viz.append("g")
  //     .call(xAxis);

  viz.append("g")
      .call(brush)
      .call(brush.move, [3, 4].map(xScale))
      .call(g => g.select(".overlay")
          .datum({type: "selection"})
          .on("mousedown touchstart", beforebrushstarted));


  function beforebrushstarted(event) {
    const dx = xScale(1) - xScale(0); // Use a fixed width when recentering.
    const [[cx]] = d3.pointers(event);
    const [x0, x1] = [cx - dx / 2, cx + dx / 2];
    const [X0, X1] = xScale.range();
    d3.select(this.parentNode)
        .call(brush.move, x1 > X1 ? [X1 - dx, X1] 
            : x0 < X0 ? [X0, X0 + dx] 
            : [x0, x1]);
  }

  function brushed(event) {
    const selection = event.selection;
    // console.log("selection",selection)
    if (selection === null) {
      circle.attr("stroke", null);
    } else {
      const [x0, x1] = selection.map(xScale.invert);
      circle.attr("stroke", null);
    }
  }

  return viz.node();


})
