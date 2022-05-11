let w=window.innerWidth-600;
let h=window.innerHeight-50;
// let w = 1000;
// let h = 900;
let padding1 = 50
let padding2=150

let viz = d3.select("#visualization").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "black")
;


// initialise scales
let xScale = d3.scaleLinear().range([padding2+30, w-padding2]);
let yScale = d3.scaleLinear().range([padding1, h-padding1]);


// get data
d3.csv("jumpscares_data.csv").then(function(incomingData){
  console.log(incomingData);


  //turn date in to data object
  incomingData = incomingData.map(d=>{
    d.imdb= Number(d.imdb)
    d.rating=Number(d.jump_scare_rating)
    return d
  })

  //x-axis

  // get the earliest and latest rating in the dataset
  let extent = d3.extent(incomingData, function(d){
    return d.jump_scare_rating;
  })
  console.log(extent);
  // amend domain to scale
  xScale.domain(extent);
  // group to hold axis
  let xAxisGroup = viz.append("g")
      .attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h-padding1)+")")
      .attr("class", "axisColor")
    ;
  // ask d3 to get an axis ready
  let xAxis = d3.axisBottom(xScale);
  // build the axis into our group
  xAxisGroup.call(xAxis);

  // yaxis
  let yScale = d3.scaleLinear().range( [h-padding1, padding1] )
  yScale.domain([3, 9])
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g")
      .attr("class", "yaxisgroup")
      .attr("transform", "translate("+padding2+",0)")
      .attr("class", "axisColor")
  ;
  yAxisGroup.call(yAxis);


  // put a circle for each data point onto the page

  let datapoints=viz.selectAll(".datapoint").data(incomingData).enter()
    
  datapoints.append("circle")
    .attr("class", "datapoint")
    .attr("cx", function(d){
      return xScale(d.jump_scare_rating);
    })
    .attr("cy", function(d){
      return yScale(d.imdb);
    })
    .attr("r", 6)
    .attr("fill","green")
    .style("opacity",0.6)
    .on("mouseover", function (d, i) {
        d3.select(this).selectAll('.context').style("opacity",1)
    })
    .on("mouseout", function (d, i) {
        d3.select(this).selectAll('.context').style("opacity",0)
    })
  ;

datapoints.append("text")
    .text("hi")
    .attr("class","context")
    .attr("font-size", 15)
    .attr("fill", "black")
    .style("font-family", "sans-serif")
    .style("opacity", 0)
    // .on("mouseover", textMouseOver)
    // .on("mouseout", textMouseOut)
  ;

    // draw average lines

    //average line 1: imdb rating average line
    let sum1 = d3.sum(incomingData, function(d,i) { return d.imdb; }); 
    console.log(sum1)

    let average1 = sum1/incomingData.length;

    viz.append("line")
        // .datum(incomingData) //bind the entirety of data to every single element in the selection
        // .attr("class", "averageline")
        .attr("x1",function(){return padding2-30;})
        .attr("y1",function(){return yScale(average1);})
        .attr("x2",function(){return w-padding2+30;})
        .attr("y2",function(){return yScale(average1);})
        .attr("stroke","red")
        .attr("stroke-width",2)
      ;

    viz.append("text")
        .attr("transform", "translate(" + (w-padding2+150) + "," + (yScale(average1)+10) + ")")
        .attr("dy", "1em")
        .attr("text-anchor", "end")
        .style("fill", "red")
        .style("font-size",13)
        .html("Average IMDb Rating = " + average1);


    //average line 2: jump scare rating average line
    let sum2 = d3.sum(incomingData, function(d,i) { return d.jump_scare_rating; }); 
    console.log(sum2)

    let average2 = sum2/incomingData.length;

    viz.append("line")
        // .datum(incomingData) //bind the entirety of data to every single element in the selection
        // .attr("class", "averageline")
        .attr("x1",function(){return xScale(average2);})
        .attr("y1",function(){return padding1-30;})
        .attr("x2",function(){return xScale(average2);})
        .attr("y2",function(){return h-padding1+30;})
        .attr("stroke","red")
        .attr("stroke-width",2)
      ;

    viz.append("text")
        .attr("transform", "translate(" + (w-padding2+35) + "," + (yScale(average2)-65) + ")")
        .attr("dy", "1em")
        .attr("text-anchor", "end")
        .style("fill", "red")
        .style("font-size",15)
        .html("Average Jump Scare Rating = " + average2);



  incomingData=incomingData.map(function(datapoint){
    datapoint.x=xScale(datapoint.jumpScareRating);
    datapoint.y=h/2;
    return datapoint
  })

})
