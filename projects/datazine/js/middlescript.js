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
                return "translate("+(150+i*230)+", 300)"
            })
    ;

    // CREATING SCALE TO CALCULATE RADIUS
    // get array of dates
    let dayStrings = transformedData.map(function(d){
        return d[0]
    })
    console.log("dayStrings", dayStrings)

    //get array of datappoint of each day
    let numCurseWordsPerDay = transformedData.map(function(d){
        // console.log(d)
        let array = d[1]
        // console.log(array)
        let count = 0
        for(let i = 0; i < array.length; i++){
            // console.log(array[i], array[i][1].length)
            count += array[i][1].length
        }
        return count
    });
    console.log("numCurseWordsPerDay", numCurseWordsPerDay)
    let giveDayStringGetNumCurseWords = d3.scaleOrdinal().domain(dayStrings).range(numCurseWordsPerDay);
    // console.log( giveDayStringGetNumCurseWords("0221")  )
    
    let maxWordsPerDay = d3.max(numCurseWordsPerDay);
    let minWordsPerDay = d3.min(numCurseWordsPerDay);
    let minRadius = 50;
    let maxRadius = 120;
    let dayRadiusScale = d3.scaleLinear().domain( [minWordsPerDay, maxWordsPerDay ]).range( [ minRadius, maxRadius ] )



    // CREATING SCALE TO CALCULATE HOUR ROTATION
    let timeSlots = ["0-1am", "1-2am"]
    let anglesForTimeSlots = [18, 19]
    anglesForTimeSlots = anglesForTimeSlots.map(d=>d*15);
    let giveTimeGetAngle = d3.scaleOrdinal().domain(timeSlots).range(anglesForTimeSlots);




    // test  
    // let date = "0226";
    // console.log("date", date)
    // let numWords = giveDayStringGetNumCurseWords(date);
    // console.log("numWords", numWords)
    // let dateRadius = dayRadiusScale(numWords);
    // console.log("dateRadius", dateRadius)


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
            // .attr("r",100)
            .attr("r",function(d, i){
                let date = d[0];
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                return dateRadius
            })
            .attr("fill", "transparent")
            .attr("stroke", "black")
            .attr("stroke-width",6)
    ;

//     //mouth mask circle
//     dayDataGroups
//         .append("circle")
//             .attr("cx",0)
//             .attr("cy",0)
//             .attr("r",95)
//             .attr("fill", "transparent")
//             .attr("stroke", "blue")
//             .attr("stroke-width",6)
// 
//     //lip circle
//     dayDataGroups
//         .append("circle")
//             //filter: need to count the number of unconscious vs conscious
//             .attr("cx",0)
//             .attr("cy",0)
//             .attr("r",110)
//             .attr("fill", "transparent")
//             .attr("stroke", "red")
//             .attr("stroke-width",5)

    // within each group we bind the hour data to elements (Layer 2)
    // there are multiple groups in dayDataGroups so what we do here 
    // happens once for each of those groups
    function getHourData(d, i){
        // console.log(d)

        return [d[1][0]] // only work with one hour group worth of data
        // return d[1] // all hour groups
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
        return giveTimeGetAngle(d[0]);


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

        let angle2=angle*3;
        // console.log(angle2);

    return "rotate("+angle2+")";

    }

    // rect is just to debug/visualize whats happening
    hourDataGroups
        .append("rect")
            .attr("x",0)
            // .attr("x",mouthRadius)//need change-relate to the radius-how to count
            .attr("y",0)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", "transparent")
            .attr("stroke","black")
    ;

    hourDataGroups
        // .attr("transform", function(d, i){
        //     console.log(d)
        //     let angle = 90 // this angle needs to be different for each our group
        //     return "rotate("+angle+")"
        // })
        .attr("transform", hourPos)
    ;

    // these two circles are tests for actual data groups
    let rotateTestGroup1 = hourDataGroups.append("g")
        .attr("transform", function(d, i){
            console.log("need date for radius, where is it inside d?", d)
            console.log(d[1][0].date)
            let date = d[1][0].date;
            let numWords = giveDayStringGetNumCurseWords(date);
            let dateRadius = dayRadiusScale(numWords);
            // x must depend on radius of that whole day
            let x = dateRadius *0.9;
            return "translate("+x+",0)";
        })
    ;
    rotateTestGroup1.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 3)
        .attr("fill", "black")
    ;
    let rotateTestGroup2= hourDataGroups.append("g")
        .attr("transform", function(d, i){
            console.log("need date for radius, where is it inside d?", d)
            console.log(d[1][0].date)
            let date = d[1][0].date;
            let numWords = giveDayStringGetNumCurseWords(date);
            let dateRadius = dayRadiusScale(numWords);
            // x must depend on radius of that whole day
            let x = dateRadius *0.9;
            return "rotate(15) translate("+x+",0)";
        })
    ;
    rotateTestGroup2.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 3)
        .attr("fill", "red")
    ;



    // hourDataGroups.append(circle)

    // hourDataGroups
    //         .attr("transform",hourPos)
    // ;
// 
//     function getActualData(d, i){
//         // console.log(d)
//         return d[1]
//     }
// 
//     function actualDataPointsColor(d,i){
//         let color;
//         if (d.emotionalContent == "in-person") {
//             color = 1;
//         } else if (d.emotionalContent == "enjoyment") {
//             color = "#F5B041";
//         } else if (d.emotionalContent == "anger") {
//             color = "#E74C3C";
//         } else if (d.emotionalContent == "disgust") {
//             color = "#AF7AC5";
//         } else if (d.emotionalContent == "sadness") {
//             color = "#85C1E9";
//         } else if (d.emotionalContent == "Questioning") {
//             color = "#A3E4D7";
//         } else if (d.emotionalContent == "none") {
//             color = "#ABB2B9";
//         } else if (d.emotionalContent == "fear") {
//             color = "#566573";
//         } else if (d.emotionalContent == "surprise/shock") {
//             color = "#F7DC6F";
//         }
//         console.log(color);
//         return color;
//     }
// 
//     //actualDataPoints
//     let actualDataGroups = hourDataGroups.selectAll(".actualDataGroup").data(getActualData).enter()
//         .append("g")
//             .attr("class","actualDataGroup")
//             .attr("fill",actualDataPointsColor)
//             // .attr("transform",hourPos)
//             .attr("transform",function(d,i){
//                 let x=i*10;
//                 return "translate("+x+",5)"
//              
//             })
//     ;
// 
//     actualDataGroups
//         .filter(function(d, i) { return d.toWhom == "roommate"; })
//         .append("circle")
//             .attr("cx",0)
//             .attr("cy",0)
//             .attr("r",4)
//             // .attr("fill","red")
//     ;
// 
//     actualDataGroups
//         .filter(function(d, i) { return d.toWhom == "friend"; })
//         .append("rect")
//             .attr("x",0)
//             .attr("y",0)
//             .attr("width",4)
//             .attr("height",4)
//             // .attr("fill","blue")
//     ;
// 
//     actualDataGroups
//         .filter(function(d, i) { return d.toWhom == "strangers"; })
//         .append("circle")//need be changed to triangle //use path
//             .attr("cx",0)
//             .attr("cy",0)
//             .attr("r",4)
//     ;
// 
//     actualDataGroups
//         .filter(function(d, i) { return d.toWhom == "acquaintance"; })
//         .append("rect")
//             .attr("x",0)
//             .attr("y",0)
//             .attr("rx",2)
//             .attr("ry",2)
//             .attr("width",4)
//             .attr("height",4)
//     ;
// 
//     actualDataGroups
//         .filter(function(d, i) { return d.toWhom == "family"; })
//         .append("circle")//need be changed to sth with little dot
//             .attr("cx",0)
//             .attr("cy",0)
//             .attr("r",4)
//     ;

    // datagroups.attr("transform", translateGroup);
}


d3.json("swearwords.json").then(gotData);