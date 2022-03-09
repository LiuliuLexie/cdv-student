let w = 2400;
let h = 800;

let viz = d3.select("#container")
    .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h);


//how to do flex position
// function translateGroup(d, i) {
//     //remember that i starts from 0
//     let x, y;
//     if (i < 8) {
//         x = 120 + 300 * i;
//         y = 180;
//     } else if (i > 7) {
//         x = 120 + 300 * (i - 8);
//         y = 550;
//     }
//     return "translate(" + x + ", " + y + ")";
// }

//manage data to day arrays
function transformData(dataToTransform) {
    let dataSortedByDay = Array.from(d3.group(dataToTransform, d => d.date));
    console.log(dataSortedByDay);
    // here we should arrange data points inside time groups 
    // we use map to transform the array. you must know map: https://github.com/leoneckert/critical-data-and-visualization-spring-2022/tree/main/labs/foreach-filter-map
    let rearrangedData = dataSortedByDay.map(function(singleDayData) {
        // map loops over dataSortedByDay and let's us access and modify each day's data at a time.
        // singleDayData: ["0225", [_,_,_,_]]
        // we are interested in further trasnforming the array with the actual datapoints: [_,_,_,_]
        console.log(singleDayData)


        // so we take it out of singleDayData, it is its second element
        let actualDataPoints = singleDayData[1];
        // console.log("data to group:", actualDataPoints)
        let sortedByTime = Array.from(d3.group(actualDataPoints, d => d.time));
        // console.log("sortedByTime", sortedByTime)
        singleDayData[1] = sortedByTime;

        // console.log("----")
        return singleDayData
    });


    return rearrangedData;
}

//manage data to hour arrays
// function transformDataAgain(dataToTransform) {
//     let hourData = Array.from(d3.group(dataToTransform, d => d.time));
//     console.log(hourData);
// 
//     return dataToTransform;
// }

//mouth radius-number of swear words 
function mouthRadius(d, i) {
    let radius;
//try max
    radius = d3.count(transformedData, d => d.date);
    // radius = d3.count(transformedData.Array[1], d => d.date);
    // console.log(radius);
    return radius * 20;
}

//radius of the mask circle that inside the mouth circle
function maskRadius(d, i) {
    let radius;
    radius = d3.count(transformedData, d => d.date);
    // radius = d3.count(transformedData.Array[1], d => d.date);
    // console.log(radius);
    return radius * 20 - 5;
}


function gotData(incomingData) {
    console.log(incomingData);
    transformedData = transformData(incomingData);
    console.log("transformedData", transformedData)
        // timeSlotData = transformDataAgain(transformedData);

    // binding the first layer data to big groups, one for each day
    let dayDataGroups = viz.selectAll(".dayDataGroup").data(transformedData).enter()
        .append("g")
            .attr("class", "dayDataGroup")
            .attr("transform", function(d, i){
                return "translate("+(i*210)+", 100)"
            })
    ;
    dayDataGroups.append("rect")
        .attr("width", 200)
        .attr("height", 200)
    ;
    // within each group we bind the hour data to elements (Layer 2)
    // there are multiple groups in dayDataGroups so what we do here 
    // happens once for each of those groups
    function getHourData(d, i){
        // console.log(d)
        return d[1]
    }
    let hourDataGroups = dayDataGroups.selectAll(".hourDataGroup").data(getHourData).enter()
        .append("g")
            .attr("class", "hourDataGroup")
            .attr("transform", function(d, i){
                return "translate("+(i*21)+", 10)"
            })
    ;
    hourDataGroups.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", "white")
    ;

    function getActualData(d, i){
        console.log(d)
        return d[1]
    }
    let actualDataGroups = hourDataGroups.selectAll(".actualDataGroup").data(getActualData).enter()
        .append("g")
            .attr("class","actualDataGroup")
            .attr("transform",function(d,i){
                let x=i*3;
                return "translate("+x+",10)"
            })
    ;
    actualDataGroups.append("circle")
        .attr("cx",0)
        .attr("cy",0)
        .attr("r",1)
        .attr("fill","blue")
    ;







//     let mouth = datagroups.append("circle")
//         .attr("cx", 0)
//         .attr("cy", 0)
//         .attr("r", mouthRadius)
//         .attr("fill", "transparent")
//         .attr("stroke", "black")
//         .attr("stroke-width", 5);
// 
//     let mask = datagroups.append("circle")
//         .attr("cx", 0)
//         .attr("cy", 0)
//         .attr("r", maskRadius)
//         .attr("fill", "transparent")
//         .attr("stroke", "blue")
//         .attr("stroke-width", 5);


    // datagroups.attr("transform", translateGroup);
}


d3.json("swearwords.json").then(gotData);