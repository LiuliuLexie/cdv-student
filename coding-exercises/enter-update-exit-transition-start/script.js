let w = 960;
let h = 640;
let xPadding = 70;
let yPadding = 50;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
;


function gotData(incomingData){
  console.log(incomingData);

  // getting min max of our data.
  // because if the structure of this particular data (5 mini datasets in one)
  // getting the min and max computationally would be slightly different
  // that we have done in the past. It uses d3.min and d3.max but requires 
  // one extra step. For sake of time, I am "hardcoding" the minimum and
  // maximum here. But if you scroll down I included 2 varieties of solutions
  // to get min and max computationally!  
  let minX = 0;
  let maxX = 145;
  let minY = 0;
  let maxY = 140

  // x scale and axis:
  let xScale = d3.scaleLinear().domain( [minX, maxX] ).range( [xPadding, w-xPadding] );
  // make a group in which all the elements of the axis will be created
  let xAxisGroup = viz.append("g").attr("class", "xaxis");
  // ask d3 for an axis generator that is tailored to our scale
  // "bottom" stands for an axis where the text and ticks will be at the bottom.
  let xAxis = d3.axisBottom(xScale);
  // create the axis elements (paths, texts, lines etc.) inside the group
  xAxisGroup.call(xAxis);
  // bring the axis into the right position:
  xAxisGroup.attr("transform", "translate(0, "+(h-yPadding)+")")

  // y scale and axis:
  let yScale = d3.scaleLinear().domain( [minY, maxY] ).range( [h-yPadding, yPadding] );
  let yAxisGroup = viz.append("g").attr("class", "yaxis");
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis);
  yAxisGroup.attr("transform", "translate("+xPadding+", 0)")


  // since we have two groups for the axis,
  // to keep things clean, let's create an extra group in which
  // the graph goes. Clean DOM, happy project!
  let vizGroup = viz.append("g").attr("class", "vizGroup");

  

// //enter
// function step1(){
//     // For now we visualize the first version of the dataset
//     let dataToShow = incomingData[0];
//     console.log("the data:", dataToShow);
// 
//     let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow).enter()
//       .append("g")
//         .attr("class", "datagroup")
//     ;
// 
//     datagroups.append("circle")
//       .attr("r", 30)
//       .attr("fill", "white")
//     ;
//     datagroups.append("text")
//       .text(function(d, i){
//         return d.name;
//       })
//       .attr("x", -17)
//       .attr("y", 17)
//       .attr("font-family", "sans-serif")
//       .attr("font-size", "3em")
//       .attr("fill", "black")
//     ;
//     function getGroupLocation(d, i){
//       let x = xScale(d.x);
//       let y = yScale(d.y);
//       return "translate("+x+", "+y+")"
//     }
//     datagroups.attr("transform", getGroupLocation)
// 
//   }
// 
// //update
// function step2(){
//     // For now we visualize the first version of the dataset
//     let dataToShow = incomingData[1];
//     console.log("the data:", dataToShow);
// 
//     //updating staff
//     //                              datagroups on the page    what we want to show
//     let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow)
//       // .enter()
//       // .append("g")
//       //   .attr("class", "datagroup")
//     ;
// 
//     // datagroups.append("circle")
//     //   .attr("r", 30)
//     //   .attr("fill", "white")
//     // ;
// 
//     // datagroups.append("text")
//     //   .text(function(d, i){
//     //     return d.name;
//     //   })
//     //   .attr("x", -17)
//     //   .attr("y", 17)
//     //   .attr("font-family", "sans-serif")
//     //   .attr("font-size", "3em")
//     //   .attr("fill", "black")
//     // ;
// 
//     //shift
//     function getGroupLocation(d, i){
//       let x = xScale(d.x);
//       let y = yScale(d.y);
//       return "translate("+x+", "+y+")"
//     }
//     datagroups.attr("transform", getGroupLocation)
// 
// 
//   }
// 
// //update and exit
// function step3(){
//     // For now we visualize the first version of the dataset
//     let dataToShow = incomingData[2];
//     console.log("the data:", dataToShow);
// 
//     //                                      4                3(what will be on the page)
//     let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow)
// 
//     let exitingElements=datagroups.exit();
//     //remove things in the existing selection
//     exitingElements.remove();
// 
//       // .enter()
//       // .append("g")
//       //   .attr("class", "datagroup")
//     ;
// 
//     // datagroups.append("circle")
//     //   .attr("r", 30)
//     //   .attr("fill", "white")
//     // ;
// 
//     // datagroups.append("text")
//     //   .text(function(d, i){
//     //     return d.name;
//     //   })
//     //   .attr("x", -17)
//     //   .attr("y", 17)
//     //   .attr("font-family", "sans-serif")
//     //   .attr("font-size", "3em")
//     //   .attr("fill", "black")
//     // ;
// 
//     //shift update
//     function getGroupLocation(d, i){
//       let x = xScale(d.x);
//       let y = yScale(d.y);
//       return "translate("+x+", "+y+")"
//     }
//     datagroups.attr("transform", getGroupLocation)
// }
// 
// function step4(){
//     // For now we visualize the first version of the dataset
//     let dataToShow = incomingData[3];
//     console.log("the data:", dataToShow);
//     
//     //updating
//     //                                      3                4(what will be on the page)
//     let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow);
//     datagroups.attr("transform", getGroupLocation)
// 
//     // let exitingElements=datagroups.exit();
//     // exitingElements.remove();
// 
// let enteringElements=datagroups.enter()
//       .append("g")
//         .attr("class", "datagroup")
//     ;
// 
//     //append circle to the entering elements
//     enteringElements.append("circle")
//       .attr("r", 30)
//       .attr("fill", "white")
//     ;
// 
//    enteringElements.append("text")
//       .text(function(d, i){
//         return d.name;
//       })
//       .attr("x", -17)
//       .attr("y", 17)
//       .attr("font-family", "sans-serif")
//       .attr("font-size", "3em")
//       .attr("fill", "black")
//     ;
// 
//     //shift update
//     function getGroupLocation(d, i){
//       let x = xScale(d.x);
//       let y = yScale(d.y);
//       return "translate("+x+", "+y+")"
//     }
//     enteringElements.attr("transform", getGroupLocation)
// }
// 
// document.getElementById("step1").addEventListener("click",step1);
// document.getElementById("step2").addEventListener("click",step2);
// document.getElementById("step3").addEventListener("click",step3);
// document.getElementById("step4").addEventListener("click",step4);



//step1-super function
function visualizeData(){
    // For now we visualize the first version of the dataset
    let dataToShow = incomingData[dataindex];
    console.log("the data:", dataToShow);

    //UPDATING
    let datagroups = vizGroup.selectAll(".datagroup").data(dataToShow);
    datagroups.transition().ease(d3.easeLinear).duration(1000).attr("transform", getGroupLocation)
    
    //ENTERING
    let enteringElements=datagroups.enter()
      .append("g")
        .attr("class", "datagroup")
    ;

    enteringElements.append("circle")
      .attr("r", 30)
      .attr("fill", "white")
    ;
    enteringElements.append("text")
      .text(function(d, i){
        return d.name;
      })
      .attr("x", -17)
      .attr("y", 17)
      .attr("font-family", "sans-serif")
      .attr("font-size", "3em")
      .attr("fill", "black")
    ;

    function getGroupLocation(d, i){
      let x = xScale(d.x);
      let y = yScale(d.y);
      return "translate("+x+", "+y+")"
    }
    function getIncomingGroupLocation(d, i){
      let x = xScale(d.x);
      let y = -30;
      return "translate("+x+", "+y+")"
    }
    function getExitingGroupLocation(d, i){
      let x = xScale(d.x);
      let y = h+30;
      return "translate("+x+", "+y+")"
    }

  //ENTERING
    enteringElements.attr("transform", getIncomingGroupLocation).transition().delay(1000).attr("transform", getGroupLocation);

  //EXITING
    let exitingElements=datagroups.exit();
    exitingElements.transition().attr("transform", getExitingGroupLocation).remove();

  }

document.getElementById("step1").addEventListener("click",function(){
    dataindex=0;
    visualizeData();
});

document.getElementById("step2").addEventListener("click",function(){
    dataindex=1;
    visualizeData();
});

document.getElementById("step3").addEventListener("click",function(){
    dataindex=2;
    visualizeData();
});

document.getElementById("step4").addEventListener("click",function(){
    dataindex=3;
    visualizeData();
});

document.getElementById("step5").addEventListener("click",function(){
    dataindex=4;
    visualizeData();
});

}



d3.json("data.json").then(gotData);




























/*
Minimum and Maximum of our Data

The Problem:
 
For an array in which each element is one of our datapoints, we have used d3.min and d3.max
in the past:
```
let incomingData = [ {x: 6, y: 2}, {x: 3, y: 5} ];
let max = d3.max(incomingData, function(d, i){ return d.x });
```
The problem we have now is that our incomingData array contains further arrays
```
let incomingData = [ [{x: 6, y: 2}, {x: 3, y: 5}], [{x: 5, y: 7}, {x: 3, y: 9}] ];
```
If we do the same formular as above, then the `d` is itself a data set 
within which are multiple values:
```
let max = d3.max(incomingData, function(d, i){ 
  // d is equal to arrays like this: [{x: 6, y: 2}, {x: 3, y: 5}]
  // "return d.x" won't work because d is a full array, not a single data point
});


Solution #1:
Nested use of d3.min and d3.max:
```
let max = d3.max(incomingData, function(d, i){ 
  // as we loop over the inner arrays of our data
  // we first find the max value within them:
  let maxInInnerArray = d3.max(d, function(innerD, innerI){
    return innerD.x
  })
  // then return that max value to the first d3.max function we
  // called. It will then essentially find the max value
  // of all the max values of the inner arrays.
  return maxInInnerArray
});
```


Solution #2:
Using d3.merge to flatten the incomingData array temporarily. 
Documentation: https://github.com/d3/d3-array/blob/main/README.md#merge

with the above function we can very quickly get from this data shape:
```
[ [{x: 6, y: 2}, {x: 3, y: 5}], [{x: 5, y: 7}, {x: 3, y: 9}] ];
```
to this:
```
[ {x: 6, y: 2}, {x: 3, y: 5}, {x: 5, y: 7}, {x: 3, y: 9} ];
```
Do you see the difference? It's one-dimensional array now. 
Since we will use the original data shape later on, and need this
flat shap only to get to the min and max value more easily, we 
flatten the array into a temporary variable:
```
let flatArray  = d3.merge(incomingData)
```
now the data is one-dimensional and we can 
use our regular d3.min and d3.max function:
```
let max = d3.max(flatArray, function(d, i){ return d.x });
let min = d3.min(flatArray, function(d, i){ return d.x });
```


*/