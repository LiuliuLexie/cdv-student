let data=[
    { label: 'Foreign', value: 83 },
    { label: 'Found Footage', value: 71 },
    { label: 'Survival', value: 109 },
    { label: 'Zombie', value: 58 },
    { label: 'Extraterrestrial Life', value: 50 },
    { label: 'Mystery', value: 180 },
    { label: 'Post-Apocalyptic', value: 23 },
    { label: 'Sci-Fi', value: 94 },
    { label: 'Underground', value: 16 },
    { label: 'Comedy', value: 133 },
    { label: 'Low Budget', value: 171 },
    { label: 'Book Adaptation', value: 72 },
    { label: 'Historical', value: 34 },
    { label: 'Crime', value: 53 },
    { label: 'Possession', value: 80 },
    { label: 'Vampire', value: 29 },
    { label: 'Gory', value: 104 },
    { label: 'Shark', value: 12 },
    { label: 'Action', value: 80 },
    { label: 'Haunted House / Building', value: 131 },
    { label: 'Fantasy', value: 54 },
    { label: 'Religion & The Occult', value: 111 },
    { label: 'Revenge', value: 47 },
    { label: 'Romantic', value: 36 },
    { label: 'Black & White', value: 16 },
    { label: 'Loner / Misfit', value: 57 },
    { label: 'Slasher', value: 122 },
    { label: 'Monsters & Mutants', value: 89 },
    { label: 'Forest / Woods Setting', value: 63 },
    { label: 'Body Horror', value: 52 },
    { label: 'Anthology', value: 17 },
    { label: 'Home Invasion', value: 30 },
    { label: 'Werewolf', value: 14 },
    { label: 'Christmas', value: 23 },
    { label: 'Creepy Children', value: 57 }
  ]



let w = 1000;
let h=window.innerHeight-50;
let padding=20;

console.log(data);

let viz = d3.select("#visualization")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "black")
;

let datagroups = viz.selectAll(".datagroup").data(data).enter()
  .append("g")
    .attr("class", "datagroup")
;

let extent = d3.extent(data, function(d){
    return d.value;
  })
  console.log(extent);
  // amend domain to scale
  let yScale = d3.scaleLinear().domain(extent).range([20, h/2-padding] );

  let colorScale = d3.scaleLinear().domain(extent).range( ["darkred", "lightCoral"] );

  function getHeight(d, i){
    let height = yScale(d.value);
    return height;
  }
  function getY(d, i){
    return -yScale(d.value);
  }
  function getColor(d, i){
    return colorScale( d.value)

  }



  // append a rectangle to each datagroup
  let bars = datagroups.append("rect")
      .attr("x", 0)
      .attr("y", getY)
      .attr("width", 20)
      .attr("height", getHeight)
      .attr("fill", getColor)
      // .on('mouseover', MouseOver)
      // .on('mouseout', MouseOut)
  ;

  function getTag(d, i){
    return d.label+": "+d.value;
  }

  let labels = datagroups.append("text")
    .attr("x", 3)
    .attr("y", -5)
    .text(getTag)
    .attr("fill","white")
    .attr("transform", "rotate(90)")
    .style("font-family", "Times New Roman")
    // .style("opacity", 0)

  ;

//     function MouseOver(d, i) {
//       d3.select(this)
//       datagroups.append("text")
//         .attr("x", 3)
//         .attr("y", -5)
//         .text(getTag)
//         .attr("transform", "rotate(90)")
//         .style("font-family", "sans-serif")
//         .style("opacity", 1)
// 
//       ;
//     }
//     function MouseOut(d, i) {
//       d3.select(this)
//       datagroups.append("text")
//         .attr("x", 3)
//         .attr("y", -5)
//         .text(getTag)
//         .attr("transform", "rotate(90)")
//         .style("font-family", "sans-serif")
//         .style("opacity", 0)
// 
//       ;
//     }

  //position the datagroups
  function getPosition(d, i){
    let x = i*(w/35);
    let y = h/2;
    return "translate("+x+", "+y+")";
  }
  datagroups.attr("transform", getPosition);

  function getTextPosition(d, i){
    let x = i*(w/35);
    let y = h/2-200;
    return "translate("+x+", "+y+")";
  }


// function sortData(){
//   sortDatapoints();
// 
//   // update data
//   elementsForPage = graphGroup.selectAll(".datapoint").data(data,assignKey);
// 
//   // update data and adjust xScale domain
//   allNames = data.map(function(d){return d.key});
//   xScale.domain(allNames);
// 
//   // update xAxis
//   xAxis = d3.axisBottom(xScale);
//   xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
//   xAxisGroup.transition().duration(1000).delay(200).call(xAxis).selectAll("text").attr("font-size", 18);
//   xAxisGroup.selectAll("line").remove();
// 
//   // update yDomain
//   yMax = d3.max(data, function(d){return d.value});
//   yDomain = [0, yMax+yMax*0.1];
//   yScale.domain(yDomain);
// 
// 
//   elementsForPage.transition().delay(200).duration(1000).attr("transform", function(d, i){
//     return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
//   });
// 
//   elementsForPage.select("rect")
//  .attr("y", function(d,i){
//       return 0;
//     })
//     .attr("height", function(d, i){
//       return 0;
//     })
//     .attr("width", function(){
//       return xScale.bandwidth();
//     })
//     .attr("fill", "#F27294")
//    .transition()
//    .delay(200)
//    .duration(800)
//    .attr("width", function(){
//       return xScale.bandwidth();
//    })
//    .attr("y", function(d,i){
//      return -yScale(d.value);
//    })
//    .attr("height", function(d, i){
//      return yScale(d.value);
//    })
//    .attr("fill", "black")
// ;
// 
//   // update elementsForPage
//   elementsForPage.select("rect")
//  .attr("y", function(d,i){
//       return 0;
//     })
//     .attr("height", function(d, i){
//       return 0;
//     })
//     .attr("width", function(){
//       return xScale.bandwidth();
//     })
//     .attr("fill", "#F27294")
//      .transition()
//      .delay(1000)
//      .duration(800)
//      .attr("width", function(){
//         return xScale.bandwidth();
//      })
//      .attr("y", function(d,i){
//        return -yScale(d.value);
//      })
//      .attr("height", function(d, i){
//        return yScale(d.value);
//      })
//      .attr("fill", "black")
//   ;
// 
// 
// 
// }
// 
// document.getElementById("buttonD").addEventListener("click", sortData);

