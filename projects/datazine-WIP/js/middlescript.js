let w = 2400;
let h = 800;

let viz = d3.select("#container")
    .append("svg")
        .attr("class", "viz")
        .attr("width", w)
        .attr("height", h);


//how to do flex position
// function translateGroup(d, i) {
//    
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
        
        // console.log(singleDayData)

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
    // console.log(hourData);
// 
//     return dataToTransform;
// }


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
                return "translate("+(150+i*210)+", 150)"
            })
    ;

    //mouth radius-number of swear words 
    function mouthRadius(d, i) {
        // let radius=?.Array[1].length;
        // console.log("radius=",radius);
        // return radius*20;

    }

    // //radius of the mask circle that inside the mouth circle
    // function maskRadius(d, i) {
    //     let radius;
    //     radius = d3.count(transformedData, d => d.date);
    //     // radius = d3.count(transformedData.Array[1], d => d.date);
    //     // console.log(radius);
    //     return radius * 20 - 5;
    // }

    //main mouthcircle
    dayDataGroups
        .append("circle")
            .attr("cx",0)
            .attr("cy",0)
            .attr("r",100)
            .attr("fill", "transparent")
            .attr("stroke", "black")
            .attr("stroke-width",6)
    ;

    //mouth mask circle
    dayDataGroups
        .append("circle")
            .attr("cx",0)
            .attr("cy",0)
            .attr("r",94)
            .attr("fill", "transparent")
            .attr("stroke", "blue")
            .attr("stroke-width",6)

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
                // return "translate("+(i*21)+", 10)"
                return "translate(0, 0)"
            })
    ;

    function hourPos(d,i){
        // console.log(d);
        // let radius=d3.count(dayDataGroups.Array[1], d => d.time)*10;
        let angle;
        if (d[0] == "0-1am") {
            // position=;
            angle=18;
        } else if (d[0] == "1-2am") {
            // position=;
            angle=19;
        } else if (d[0] == "2-3am") {
            // position=;
            angle=20;
        } else if (d[0] == "3-4am") {
            // position=;
            angle=21;
        } else if (d[0] == "4-5am") {
            // position=;
            angle=22;
        } else if (d[0] == "5-6am") {
            // position=;
            angle=23;
        }else if (d[0] == "6-7am") {
            // position=;
            angle=24;
        }else if (d[0] == "7-8am") {
            // position=;
            angle=1;
        }else if (d[0] == "8-9am") {
            // position=;
            angle=2;
        }else if (d[0] == "9-10am") {
            // position=;
            angle=3;
        }else if (d[0] == "10-11am") {
            // position=;
            angle=4;
        }else if (d[0] == "11-12pm") {
            // position=;
            angle=5;
        }else if (d[0] == "12-1pm") {
            // position=;
            angle=6;
        }else if (d[0] == "1-2pm") {
            // position=;
            angle=7;
        }else if (d[0] == "2-3pm") {
            // position=;
            angle=8;
        }else if (d[0] == "3-4pm") {
            // position=;
            angle=9;
        }else if (d[0] == "4-5pm") {
            // position=;
            angle=10;
        }else if (d[0] == "5-6pm") {
            // position=;
            angle=11;
        }else if (d[0] == "6-7pm") {
            // position=;
            angle=12;
        }else if (d[0] == "7-8pm") {
            // position=;
            angle=13;
        }else if (d[0] == "8-9pm") {
            // position=;
            angle=14;
        }else if (d[0] == "9-10pm") {
            // position=;
            angle=15;
        }else if (d[0] == "10-11pm") {
            // position=;
            angle=16;
        }else if (d[0] == "11-12pm") {
            // position=;
            angle=17;
        }

        let angle2=angle*15;
        // console.log(angle2);

    return "rotate("+angle2+")";

    }

    hourDataGroups
        .append("rect")
            .attr("x",70)//need change-relate to the radius-how to count
            .attr("y",0)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", "transparent")
            .attr("stroke","black")
            .attr("transform",hourPos)
    ;

    function getActualData(d, i){
        // console.log(d)
        return d[1]
    }

    //actualDataPoints
    let actualDataGroups = hourDataGroups.selectAll(".actualDataGroup").data(getActualData).enter()
        .append("g")
            .attr("class","actualDataGroup")
            .attr("transform",function(d,i){
                let x=i*5;
                return "translate("+x+",5)"
             
            })
    ;

    actualDataGroups
        .filter(function(d, i) { return d.toWhom == "roommate"; })
        .append("circle")
            .attr("cx",0)
            .attr("cy",0)
            .attr("r",4)
            .attr("fill","red")
            // .attr("transform",hourPos)
    ;

    actualDataGroups
        .filter(function(d, i) { return d.toWhom == "friend"; })
        .append("rect")
            .attr("x",0)
            .attr("y",0)
            .attr("width",4)
            .attr("height",4)
            .attr("fill","blue")
            // .attr("transform",hourPos)
    ;

    // datagroups.attr("transform", translateGroup);
}


d3.json("swearwords.json").then(gotData);