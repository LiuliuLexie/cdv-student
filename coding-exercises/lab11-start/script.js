// let wW=window.innerWidth;
// let wH=window.innerHeight;
// let gW=700;
// let gH=450;
// let paddingTop=(wH-gH)/2;
// let paddingLeft=(wW-gW)/2;
// 
// // let w = 1200;
// // let h = 800;
// // let padding = 90
// 
// let viz = d3.select("#vizContainer").append("svg")
//     .style("width", wW)
//     .style("height", wH)
//     .style("background-color", "lavender")
// ;
// 
// viz.append("rect")
//   .attr("x", 0)
//   .attr("y", 0)
//   .attr("width", wW)
//   .attr("height", wH)
//   .attr("fill", 0)
//   .attr("opacity", 0.2)
// ;
// 
// //group of both graphs
// let bothGraphs=viz.append("g").attr("class","bothGraphs");
// 
// let graphTranslateScale=d3.scaleLinear().domain([0,1]).range([0,-wH])
// 
// // initialise scales
// // let xScale = d3.scaleTime().range([padding, w-padding]);
// // let yScale = d3.scaleBand().range([padding, h-padding]);
// 
// 
// // get data
// d3.json("monarchs.json").then(function(incomingData){
//   data = formatData(incomingData);
// 
// // get kist of data
//   let types = data.map(d=>d.type).filter(onlyUnique); //see onlyUnique function at bottom
// 
// //count datapoints within their types and add a key value pair
//   let typeCount = {}
//   types.forEach(d=>{
//     typeCount[d] = 0;
//   })
//   // console.log(typeCount)
//   let maxTypeCount = 0;
//   data.forEach(d=>{
//     // console.log(d, typeCount[d.tpe])
//     d.countInType = typeCount[d.type];
//     typeCount[d.type]++
//     maxTypeCount = Math.max(typeCount[d.type],maxTypeCount)
//   })
// 
//   console.log(maxTypeCount)
// 
//   console.log(data)
// 
// 
// 	//build SCALES and AXIS for both graphs
// 
// 	//graph 1: Scales and Axis
// 
// 	// xscale and axis
// 	let g1xScale = d3.scaleTime().range([paddingLeft, gW+paddingLeft]);
// 	g1xScale.domain( d3.extent(data, d=>d.date) )
// 	let g1xAxis = d3.axisBottom(g1xScale).tickFormat(d3.timeFormat("%-Y"));
// 	let g1xAxisGroup = bothGraphs.append("g")
// 		.attr("class", "g1xaxisgroup")
// 		.attr("transform", "translate(0,"+(paddingTop+gH)+")")
// 	;
// 	g1xAxisGroup.call(g1xAxis);
// 
// 	// yscale and axis
// 	let g1yScale = d3.scaleBand().range([paddingTop, paddingTop+gH]);
// 	g1yScale.domain(types);
// 	let g1yAxis = d3.axisLeft(g1yScale);
// 	let g1yAxisGroup = bothGraphs.append("g")
// 		.attr("class", "g1yaxisgroup")
// 		.attr("transform", "translate("+paddingLeft+",0)")
// 
// 	;
// 	g1yAxisGroup.call(g1yAxis);
// 
// 
// 
// 	// graph 2: Scaless and Axis
// 
// 	// xscale and axis
// 	let g2xScale = d3.scaleBand().range([paddingLeft, gW+paddingLeft]);
// 	g2xScale.domain(types)
// 	let g2xAxis =d3.axisBottom(g2xScale)
// 	let g2xAxisGroup = bothGraphs.append("g")
// 		.attr("class", "g2xaxisgroup")
// 		.attr("transform", "translate(0,"+(wH+paddingTop+gH)+")")
// 	;
// 	g2xAxisGroup.call(g2xAxis);
// 
// 	// yaxis
// 	let g2yScale = d3.scaleLinear().range([paddingTop+wH, paddingTop+gH+wH]);
// 	g2yScale.domain([maxTypeCount,0]);
// 	let g2yAxis = d3.axisLeft(g2yScale);
// 	let g2yAxisGroup = bothGraphs.append("g")
// 		.attr("class", "g2yaxisgroup")
// 		.attr("transform", "translate("+paddingLeft+",0)")
// 
// 	;
// 	g2yAxisGroup.call(g2yAxis);
// 
// 
// 
// 	let graphicGroup=bothGraphs.append("g").attr("class","graphicGroup")
// 
// 	// build two functions, that show data in each graph
// 	// function 1: 
// 	// - deal with entering elements(when page is loaded)
// 	// - deal with updating elements(when we transition backwards from graph2 to graph1)
// 
// 	function showGraph1(){
// 		let datagroups=graphicGroup.selectAll(".datagroup").data(data,d=>d.event)
// 
// 		// deal with entering elements
// 		let enteringElement=datagroups.enter().append("g")
// 			.attr("class","datagroup")
// 			.attr("tranform",function(d,i){
// 				let x=g1xScale(d.date);
// 				let y=g1yScale(d.type);
// 				let bandHeight=g1yScale.bandwidth();//returns width (in this height) of the band axis
// 				return "translate("+x+","+(y+bandHeight/2)+")"
// 			})
// 		;
// 		enteringElement.append("circle")
// 			.attr("x",0)
// 			.attr("y",0)
// 			.attr("r",5)
// 			.attr("fill",0)
// 		;
// 
// 		datagroups
// 			.transition()
// 			.duration(1000)
// 			.attr("tranform",function(d,i){
// 				let x=g1xScale(d.date);
// 				let y=g1yScale(d.type);
// 				let bandHeight=g1yScale.bandwidth();//returns width (in this height) of the band axis
// 				return "translate("+x+","+(y+bandHeight/2)+")"
// 			})
// 		;
// 	}
// 
// // call function 1.
// showGraph1();
// 
// 
// 	// function 2: 
// 	// - deal with UPDATING elements(when we transition from graph1 to graph2)
// 
// function showGraph2(){
// 	//only ever updates elements because the elements are allready visible in graph 1 when the page starts
// 	let updatingDatagroups=graphicGroup.selectAll(".datagroup").data(data,d=>d.event);
// 
// 		updatingDatagroups
// 			.transition()
// 			.duration(1000)
// 			.attr("tranform",function(d,i){
// 				let x=g2xScale(d.type);
// 				let y=g2yScale(d.countInType);
// 				let bandWidth=g2xScale.bandwidth();//returns width (in this height) of the band axis
// 				return "translate("+(x+bandWidth/2)+","+y+")"
// 			})
// 		;
// 	}	
// 
// // showGraph2();
// 
// 
// //set up entweVIEW listener that-trigger the functions -translate bothGraphs()
// 
// enterView({
// 	selector: '.textTwo',
// enter: function(el) {
// 		// el.classList.add('entered');
//     console.log("enter")
// 	showGraph2();
// 	},
// 	exit: function(el) {
// 	// el.classList.remove('entered');
//     console.log("exit")
// 	showGraph1();
// 	},
// 	progress: function(el, progress) {
// 	// el.style.opacity = progress;
//     console.log("progress",progress)
// 	bothGraphs.attr("tranform",function(){
// 			let y =graphTranslateScale(progress)
// 			return "translate(0,"+y+")"
// 		})
// 	},
// 	offset: 0.5, // enter at middle of viewport
// 	// once: true, // trigger just once
// });
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// //   // xscale and axis
// //   xScale.domain( d3.extent(data, d=>d.date) )
// //   let xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%-Y"));
// //   let xAxisGroup = viz.append("g")
// //       .attr("class", "xaxisgroup")
// //       .attr("transform", "translate(0,"+(h-padding)+")")
// //   ;
// //   xAxisGroup.call(xAxis);
// 
// 
// //   //yscale and axis
// //   yScale.domain(types);
// //   let yAxis = d3.axisLeft(yScale);
// //   let yAxisGroup = viz.append("g")
// //       .attr("class", "yaxisgroup")
// //       .attr("transform", "translate("+padding/2+",0)")
// // 
// //   ;
// //   yAxisGroup.call(yAxis);
// //   // style the y axis
// //   yAxisGroup.selectAll("line").attr("display", "none");
// //   yAxisGroup.selectAll("path").attr("display", "none");
// //   yAxisGroup.selectAll("text")
// //       .attr("text-anchor", "middle")
// //       .attr("transform", "rotate(-90)")
// //       .attr("x", "0")
// //   ;
// 
// 
// //   let graphGroup = viz.append("g").attr("class", "graphgroup");
// // 
// //   let datagroups = graphGroup.selectAll(".datagroup").data(data).enter()
// //     .append("g")
// //       .attr("class", "datagroup")
// //       .attr("transform", function(d){
// //         console.log(d);
// //         return "translate("+ xScale(d.date) +","+ (yScale(d.type) + yScale.bandwidth()/2 )+")"
// //       })
// //   ;
// // 
// //   datagroups.append("circle")
// //     .attr("r", 10)
// //     .attr("opacity", 0.5)
// //   ;
// 
// 
// 
// 
// 
// 
// 
// });
// 
// 
// let timeParse = d3.timeParse("%Y");
// 
// function formatData(incoming){
//   let keys = Object.keys(incoming.Dates);
//   return keys.map((d)=>{
//     incoming.Dates[d].date = timeParse(incoming.Dates[d].date)
//     return incoming.Dates[d];
//   });
// 
// }
// 
// //from: https://stackoverflow.com/a/14438954
// function onlyUnique(value, index, self) {
//     return self.indexOf(value) === index;
// }











//copied from Leon's code

let wW = window.innerWidth;
let wH = window.innerHeight;
let gW = 700;
let gH = 450;
let paddingTop = (wH-gH)/2;
let paddingLeft = (wW-gW)/2;
// let w = 1200;
// let h = 800;
// let padding = 90

let viz = d3.select("#vizContainer").append("svg")
    .style("width", wW)
    .style("height", wH)
    .style("background-color", "lavender")
;

viz.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", wW)
  .attr("height", wH)
  .attr("fill", 0)
  .attr("opacity", 0.2)
;


let bothGraphs = viz.append("g").attr('class', "bothGraphs");

let graphTranslateScale = d3.scaleLinear().domain([0, 1]).range([0, -wH])


// get data
d3.json("monarchs.json").then(function(incomingData){
  data = formatData(incomingData);
  
  // get list of types
  let types = data.map(d=>d.type).filter(onlyUnique); //see onlyUnique function at bottom
  
  // count datapoints within their types and add a key value pair to data point
  let typeCount = {}
  types.forEach(d=>{
    typeCount[d] = 0;
  })
  // also find out the maximum number of data points within one type
  // it's tyoe: military which contains 23 datapoints
  let maxTypeCount = 0;
  data.forEach(d=>{
    d.countInType = typeCount[d.type];
    typeCount[d.type]++
    maxTypeCount = Math.max(typeCount[d.type],maxTypeCount)
  })
  console.log(maxTypeCount)
  console.log(data)


  // build SCALES and AXIS for both graphs

  // graph 1: Scales and Axis
  // x axis
  let g1xScale = d3.scaleTime().range([paddingLeft, paddingLeft+gW]);
  g1xScale.domain( d3.extent(data, d=>d.date) )
  let g1xAxis = d3.axisBottom(g1xScale).tickFormat(d3.timeFormat("%-Y"));
  let g1xAxisGroup = bothGraphs.append("g")
      .attr("class", "g1xaxisgroup")
      .attr("transform", "translate(0,"+(paddingTop+gH)+")")
  ;
  g1xAxisGroup.call(g1xAxis);
  // y axis
  let g1yScale = d3.scaleBand().range([paddingTop, paddingTop+gH]);
  g1yScale.domain(types);
  let g1yAxis = d3.axisLeft(g1yScale);
  let g1yAxisGroup = bothGraphs.append("g")
      .attr("class", "g1yaxisgroup")
      .attr("transform", "translate("+paddingLeft+",0)")
  ;
  g1yAxisGroup.call(g1yAxis);


  // graph 2: Scales and Axis
  // xaxis
  let g2xScale = d3.scaleBand().range([paddingLeft, paddingLeft+gW]);
  g2xScale.domain(types)
  let g2xAxis = d3.axisBottom(g2xScale);
  let g2xAxisGroup = bothGraphs.append("g")
      .attr("class", "g2xaxisgroup")
      .attr("transform", "translate(0,"+(wH+paddingTop+gH)+")")
  ;
  g2xAxisGroup.call(g2xAxis);
  // yaxis
  let g2yScale = d3.scaleLinear().range( [wH+paddingTop, wH+paddingTop+gH] )
  g2yScale.domain([maxTypeCount, 0])
  let g2yAxis = d3.axisLeft(g2yScale);
  let g2yAxisGroup = bothGraphs.append("g")
      .attr("class", "g2yaxisgroup")
      .attr("transform", "translate("+paddingLeft+",0)")
  ;
  g2yAxisGroup.call(g2yAxis);



  let graphicGroup = bothGraphs.append("g").attr("class", "graphicGroup")

  // build two functions, that show data in each graph
  // function 1: 
  //      - deal with entering elements (when page is loaded)
  //      - deal with updating elements (when we transition backwards from graph2 to graph 1)

  function showGraph1(){
    
    let datagroups = graphicGroup.selectAll(".datagroup").data(data, d=>d.event);
    
    // deal with entering elements
    let enteringElement = datagroups.enter().append("g")
      .attr("class", "datagroup")
      .attr("transform", function(d, i){
        let x = g1xScale(d.date);
        let y = g1yScale(d.type);
        let bandHeight = g1yScale.bandwidth(); // returns width (in this height) of the band scale
        return "translate("+x+", "+(y+bandHeight/2)+")"
      })
    ;
    enteringElement.append("circle")
      .attr("x", 0)
      .attr("y", 0)
      .attr("r", 5)
      .attr("fill", 0)
    ;

    // deal with updating elements:
    datagroups
      .transition()
      .duration(1000)
      .attr("transform", function(d, i){
        let x = g1xScale(d.date);
        let y = g1yScale(d.type);
        let bandHeight = g1yScale.bandwidth(); // returns width (in this height) of the band scale
        return "translate("+x+", "+(y+bandHeight/2)+")"
      })
    ;
  }

  // call function 1. 
  showGraph1();

  // function 2: 
  //      - deal with UPDATING elements (when we transition from graph1 to graph2)

  function showGraph2(){
    // only ever updates elements because the elements are allready visible in graph 1 when the page starts
    let updatingDatagroups = graphicGroup.selectAll(".datagroup").data(data, d=>d.event);

    updatingDatagroups
      .transition()
      .duration(1000)
      .attr("transform", function(d, i){
        let x = g2xScale(d.type);
        let y = g2yScale(d.countInType);
        let bandWidth = g2xScale.bandwidth(); // returns width (in this height) of the band scale
        return "translate("+(x+bandWidth/2)+", "+y+")"
      })
    ;

  }

  // showGraph2();


  // set up enterVIEW listeners that 
  //      - trigger the functions
  //      - translate bothGraphs (the whole group)

  enterView({
    selector: '.textTwo',
    enter: function(el) {
      // el.classList.add('entered');
      console.log("enter")
      showGraph2();
    },
    exit: function(el) {
      // el.classList.remove('entered');
      console.log("exit")
      showGraph1();
    },
    progress: function(el, progress) {
      // el.style.opacity = progress;
      console.log("progress", progress)
      bothGraphs.attr("transform", function(){
        let y = graphTranslateScale(progress)
        return "translate(0, "+y+")";
      })
    },
    offset: 0.5, // enter at middle of viewport
    // once: true, // trigger just once
  });





  






});


let timeParse = d3.timeParse("%Y");

function formatData(incoming){
  let keys = Object.keys(incoming.Dates);
  return keys.map((d)=>{
    incoming.Dates[d].date = timeParse(incoming.Dates[d].date)
    return incoming.Dates[d];
  });

}

//from: https://stackoverflow.com/a/14438954
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}