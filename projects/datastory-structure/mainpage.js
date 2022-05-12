document.getElementById("button1").addEventListener("click", function(){window.location.href="infoGraph.html";});
document.getElementById("button2").addEventListener("click", function(){window.location.href="ratingGraph.html";});
document.getElementById("button3").addEventListener("click", function(){window.location.href="imdbGraph.html";});
// document.getElementById("button4").addEventListener("click", function(){window.location.href="runtimeGraph.html";});
document.getElementById("button5").addEventListener("click", function(){window.location.href="tagGraph.html";});

const myTimeout = setTimeout(myGreeting, 180000);

function myGreeting() {
  document.getElementById("demo").src="scary.jpeg";
}

function myStopFunction() {
  clearTimeout(myTimeout);
}




// let wW = window.innerWidth;
// let wH = window.innerHeight;
// let gW = 1000;
// let gH = 800;
// let paddingTop = (wH-gH)/2;
// let paddingLeft = (wW-gW)/2;

// 
// 
// 
// //the big group of all the different graphs
// let bothGraphs = viz.append("g").attr('class', "bothGraphs");
// let graphTranslateScale = d3.scaleLinear().domain([0, 1]).range([0, -wH])
// 
// 
// // second rating graph
// // get data
// 
// d3.json("jumpscares.json").then(function(incomingData){
// 
//     let parseTime = d3.timeParse("%Y"); //a function-time string
//     console.log(parseTime(2010))
// 
//   //turn date in to data object
//   incomingData = incomingData.map(d=>{
//     d.year = parseTime(d.year)
//     d.jumpCount= Number(d.jumpCount)
//     d.rating=Number(d.jumpScareRating)
//     d.runtime= Number(d.runtime)
//     return d
//   })
//     // console.log(incomingData)
// 
//     // r
//   let jumpCountExtent=d3.extent(incomingData,function(d){
//     return d.jumpCount;
//   })
//     console.log(jumpCountExtent)
//   let rScale=d3.scaleLinear().domain(jumpCountExtent).range([2,8])
// 
// 
// 
// 
//   // build SCALES and AXIS for graphs
// 
//   // graph 2: rating graph: x-axis
// 
//   // x axis
//   let g1xScale = d3.scaleLinear().range([paddingLeft, paddingLeft+gW]);
//   // get the earliest and latest date in the dataset
//   let ratingExtent = d3.extent(incomingData, function(d){
//     return d.rating;
//   })
//   console.log(ratingExtent);
//   g1xScale.domain(ratingExtent);
//   // group to hold axis
//   let g1xAxisGroup = bothGraphs.append("g")
//         .attr("class", "g1xaxisgroup")
//         .attr("transform", "translate(0,"+(paddingTop+gH)+")")
//     ;
//   let g1xAxis = d3.axisBottom(g1xScale);
//   g1xAxisGroup.call(g1xAxis);
// 
// 
// 
//   let graphicGroup = bothGraphs.append("g").attr("class", "graphicGroup")
// 
//   // build two functions, that show data in each graph
//   // function 1: 
//   //      - deal with entering elements (when page is loaded)
//   //      - deal with updating elements (when we transition backwards from graph2 to graph 1)
// 
//   function showGraph1(){
//     
//     let datapoints = graphicGroup.selectAll(".datapoint").data(incomingData);
// 
//     // deal with entering elements
// 
//     let enteringElement = datapoints.enter()
//         .append("circle")
//         .attr("fill","darkred")
//         .attr("class","datapoint")
//         .attr("cx", function(d){
//         return g1xScale(d.rating);
//         })
//         .attr("cy", function(d){
//         // return g1yScale(d.jumpCount);
//             return gH/2+100;
//         })
//         .attr("r", function(d,i){
//         return rScale(d.jumpCount)
//         })
//         // .on("mouseover", showInfo)
//     ;
// 
//   incomingData=incomingData.map(function(datapoint){
//     datapoint.x=g1xScale(datapoint.rating);
//     datapoint.y=gH/2+100;
//     return datapoint
//   })
// 
//   //create the simulation
//   let simulation =d3.forceSimulation(incomingData)
//     .force("forceX",function(d,i){
//         return d3.forceX(g1xScale(d.rating))
//       })
//     // .force("forceY".d3.forceY(gH/2))
//     .force("collide", d3.forceCollide().radius( function(d,i){
//         return rScale(d.jumpCount) +1
//       }))
//     .on("tick",simulationRan)
//   ;
//   function simulationRan(){
//     // console.log(incomingData[0].x)
//     viz.selectAll(".datapoint")
//       .attr("cx", function(d){
//         return d.x;
//       })
//       .attr("cy", function(d){
//         return d.y;
//       })
//     ;
//   }
// 
//   }
// 
//   // call function 1. 
//   showGraph1();
// 
// //   function 2: 
// //        - deal with UPDATING elements (when we transition from graph1 to graph2)
// 
//   function showGraph2(){
//        let updatingDatagroups = graphicGroup.selectAll(".datapoint").data(data, d=>d.event);
// 
//     updatingDatagroups
//       .append("circle")
//       .attr("cx",50)
//       .attr("cy",50)
//       .attr("r",50)
//       .aattr("fill","red")
//     ;
// 
//   }
//     
// 
// 
//   // set up enterVIEW listeners that 
//   //      - trigger the functions
//   //      - translate bothGraphs (the whole group)
// 
//   enterView({
//     selector: '.textTwo',
//     enter: function(el) {
//       // el.classList.add('entered');
//       console.log("enter")
//       showGraph2();
//     },
//     exit: function(el) {
//       // el.classList.remove('entered');
//       console.log("exit")
//       showGraph1();
//     },
//     progress: function(el, progress) {
//       // el.style.opacity = progress;
//       console.log("progress", progress)
//       bothGraphs.attr("transform", function(){
//         let y = graphTranslateScale(progress)
//         return "translate(0, "+y+")";
//       })
//     },
//     offset: 0.5, // enter at middle of viewport
//     // once: true, // trigger just once
//   });
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
// });
// 
// 
// // let timeParse = d3.timeParse("%Y");
// // 
// // function formatData(incoming){
// //   let keys = Object.keys(incoming.Dates);
// //   return keys.map((d)=>{
// //     incoming.Dates[d].date = timeParse(incoming.Dates[d].date)
// //     return incoming.Dates[d];
// //   });
// // 
// // }
// // ->fomatData=date(which is year in my data)
// 
// //from: https://stackoverflow.com/a/14438954
// function onlyUnique(value, index, self) {
//     return self.indexOf(value) === index;
// }