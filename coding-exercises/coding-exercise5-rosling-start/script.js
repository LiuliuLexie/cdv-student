console.log("hi");
//data from https://towardsdatascience.com/how-to-build-animated-charts-like-hans-rosling-doing-it-all-in-r-570efc6ba382


let w = 1200;
let h = 800;
let xPadding = 50;
let yPadding = 50;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
    // .style("background-color", "lavender")
;

viz.append("text")
      .text("Developing World")
      .attr("x",w/2)
      .attr("y",50)
      .attr("font-family", "sans-serif")
      .attr("font-size", 40)
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
  ;
viz.append("text")
      .text("recreating Hans Rosling's graph")
      .attr("x",w/2)
      .attr("y",90)
      .attr("font-family", "sans-serif")
      .attr("font-size", 15)
      .attr("text-anchor", "middle")
  ;

let colors=["orange","red","grey","ForestGreen","YellowGreen" ];
let continents=["Asia","Americas","Europe","Oceania","Africa"]

for(let i=0;i<5;i++){
viz.append("circle")
      .attr("r", 10)
      .attr("cx",1030)
      .attr("cy",30+i*30)
      .attr("fill", colors[i])
      .attr("opacity", 0.6)
    ;

viz.append("text")
      .text(continents[i])
      .attr("x", 1050)
      .attr("y", 40+i*30)
      .attr("font-family", "sans-serif")
      .attr("font-size", "1.2em")
      .attr("fill", colors[i])
    ;
}




// if (d.continent == "Asia") { 
//         color = "orange"
//       } else if (d.continent == "Americas") {
//         color = "red"
//       } else if (d.continent == "Europe") {
//         color = "grey"
//       } else if (d.continent == "Oceania") {
//         color = "ForestGreen"
//       } else {
//         color = "YellowGreen"
//       }

function gotData(incomingData){
  console.log(incomingData);

  // min max fertility rate (for xScale)
  let fertExtent = d3.extent(incomingData, function(d, i){
    return d.fert;
  });
  console.log("fertExtent", fertExtent);

  // make the xscale which we use to locate points along the xaxis
  let xScale = d3.scaleLinear().domain(fertExtent).range([xPadding, w-xPadding]);


  // min max life expectancy
  let lifeExtent = d3.extent(incomingData, function(d, i){
    return d.life;
  });
  console.log("lifeExtent", lifeExtent);

  // make the yscale which we use to locate points along the yaxis
  let yScale = d3.scaleLinear().domain(lifeExtent).range([h-yPadding, yPadding]);

  // using the function defined at the bottom of this script to build two axis
  buildXAndYAxis(xScale, yScale);


  // min max Population
  let popExtent = d3.extent(incomingData, function(d, i){
    return d.pop;
  });
  console.log("popExtent", popExtent);
  // you may use this scale to define a radius for the circles
  let rScale = d3.scaleLinear().domain(popExtent).range([5, 50]);




  // the simple out put of this complicated bit of code,
  // is an array of all the years the data talks about.
  // the "dates" array looks like:
  // ["1962", "1963", "1964", "1965", ... , "2012", "2013", "2014", "2015"]
  let dates = incomingData.reduce(function(acc,d,i){
    if(!acc.includes(d.year)){
      acc.push(d.year)
    }
    return acc
  }, [])

  console.log("dates", dates);

  // this block of code is needed to select a subsection of the data (by year)
  let currentYearIndex = 0;
  let currentYear = dates[currentYearIndex];
  function filterYear(d, i){
    if(d.year == currentYear){
      return true;
    }else{
      return false;
    }
  }











  // make a group for all things visualization:
  let vizGroup = viz.append("g").attr("class", "vizGroup");


  // this function is called every second.
  // inside it is a data variable that always carries the "latest" data of a new year
  // inside it we want to draw shapes and deal wirth both updating and entering element.
  function drawViz(){

    let currentYearData = incomingData.filter(filterYear);
    console.log("---\nthe currentYearData array now carries the data for year", currentYear);


    // Below here is where your coding should take place! learn from lab 6:
    // https://github.com/leoneckert/critical-data-and-visualization-spring-2020/tree/master/labs/lab-6
    // the three steps in the comments below help you to know what to aim for here

    // bind currentYearData to elements
     function getGroupLocation(d, i) {
      let x = xScale(d.fert);
      let y = yScale(d.life);
      return "translate("+x+", "+y+")"
    }
    function getIncomingLocation(d, i) {
      let x = xScale(d.fert);
      let y = -100;
      return "translate("+x+", "+y+")"
    }

    function radius(d, i) {
      let r = rScale(d.pop);
      return r*2.5;
    }

    function circleColor(d, i) {
      if (d.continent == "Asia") { 
        color = "orange"
      } else if (d.continent == "Americas") {
        color = "red"
      } else if (d.continent == "Europe") {
        color = "grey"
      } else if (d.continent == "Oceania") {
        color = "ForestGreen"
      } else {
        color = "YellowGreen"
      }
      return color
    }

    // take care of updating elements
    let datagroups = vizGroup.selectAll(".datagroup").data(currentYearData);
    datagroups.transition().duration(1000).attr("transform", getGroupLocation);

    // take care of entering elements

    let enteringElements=datagroups.enter()
        .append("g")
        .attr("class", "datagroup")
    ;

    enteringElements.append("circle")
      .attr("r", radius)
      .attr("fill", circleColor)
      .style("opacity", 0.6)
    ;

    function textMouseOver(d, i) {
      d3.select(this)
        .style("opacity", 1)
      ;
    }
    function textMouseOut(d, i) {
      d3.select(this)
        .style("opacity", 0)
    }

    enteringElements.append("text")
      .text(function(d) {
          return d.Country;
        })
      .attr("font-size", 15)
      .attr("fill", "black")
      .style("font-family", "sans-serif")
      .style("opacity", 0)
      .on("mouseover", textMouseOver)
      .on("mouseout", textMouseOut)
    ;

    enteringElements.append("circle")
      .attr("r", radius)
      .attr("fill", "transparent")
      .attr("stroke", "black")
      .attr("stroke-width",1)
    ;
// 
//     enteringElements.selectAll(".textMouse")
//       .style("opacity", 0)
//       .on("mouseover", textMouseOver1)
//       .on("mouseout", textMouseOut1)
//     ;


    enteringElements.attr("transform", getIncomingLocation).transition().delay(1000).attr("transform", getGroupLocation);









  }




  // this puts the YEAR onto the visualization
  let year = viz.append("text")
      .text("")
      .attr("x", 80)
      .attr("y", h-100)
      .attr("font-family", "sans-serif")
      .attr("font-size", 120)
      .style("opacity", 0.4)

  ;

  // this called the drawViz function every second
  // and changes the year of interest
  // and updates the text element that displays the year.
  setInterval(function(){
    currentYearIndex++;
    if(currentYearIndex>dates.length){
      currentYearIndex = 0;
    }
    currentYear = dates[currentYearIndex];
    year.text(currentYear)
    drawViz();
  }, 1000);






}


// load data
d3.csv("data.csv").then(gotData);





// function to build x anc y axis.
// the only reasons these are down here is to make the code above look less polluted

function buildXAndYAxis(xScale, yScale){
  let xAxisGroup = viz.append("g").attr("class", 'xaxis');
  let xAxis = d3.axisBottom(xScale);
  xAxisGroup.call(xAxis)
  xAxisGroup.attr("transform", "translate(0, "+ (h-yPadding) +")")
  xAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate("+w/2+", 40)")
    .append("text")
    .attr("fill", "black")
    .text("fertility")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.7em")

  ;

  let yAxisGroup = viz.append("g").attr("class", 'yaxis');
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis)
  yAxisGroup.attr("transform", "translate("+xPadding+", 0)")

  yAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate(-33, "+h/2+") rotate(-90)")
    .append("text")
    .attr("fill", "black")
    .text("life expectancy")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.7em")

  ;
}
