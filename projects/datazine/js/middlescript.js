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

function translateGroup(d, i) {
    //remember that i starts from 0
    let x, y;
    if (i < 7) {
        x = 250 + 320 * i;
        y = 200;
    } else if (i > 6) {
        x = 250 + 320 * (i - 7);
        y = 530;
    }
    return "translate(" + x + ", " + y + ")";
}

    // binding the first layer data to big groups, one for each day
    let dayDataGroups = viz.selectAll(".dayDataGroup").data(transformedData).enter()
        .append("g")
            .attr("class", "dayDataGroup")
            .attr("transform", translateGroup)
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
    let minRadius = 60;
    let maxRadius = 150;
    let dayRadiusScale = d3.scaleLinear().domain( [minWordsPerDay, maxWordsPerDay ]).range( [ minRadius, maxRadius ] )



    // // CREATING SCALE TO CALCULATE HOUR ROTATION
    // let timeSlots = ["0-1am", "1-2am","2-3am","3-4am","4-5am","5-6am","6-7am","7-8am","8-9am","9-10am","10-11am","11-12am","12-1pm","1-2pm","2-3pm","3-4pm","4-5pm","5-6pm","6-7pm","7-8pm","8-9pm","9-10pm","10-11pm","11-12pm"]
    // let anglesForTimeSlots = [18, 19,20,21,22,23,24,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
    // anglesForTimeSlots = anglesForTimeSlots.map(d=>d*15);
    // let giveTimeGetAngle = d3.scaleOrdinal().domain(timeSlots).range(anglesForTimeSlots);


//     test  
//     let date = "0226";
//     console.log("date", date)
//     let numWords = giveDayStringGetNumCurseWords(date);
//     console.log("numWords", numWords)
//     let dateRadius = dayRadiusScale(numWords);
//     console.log("dateRadius", dateRadius)
// 
// 
//     //radius of the mask circle that inside the mouth circle
//     function maskRadius(d, i) {
//         let radius;
//         radius = d3.count(transformedData, d => d.date);
//         // radius = d3.count(transformedData.Array[1], d => d.date);
//         // console.log(radius);
//         return radius * 20 - 5;
//     }

    //lip circle
    dayDataGroups
        .append("circle")
            //filter: need to count the number of unconscious vs conscious
            .attr("cx",0)
            .attr("cy",0)
            .attr("r",function(d, i){
                let date = d[0];
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                return dateRadius+18
            })
            .attr("fill", "transparent")
            .attr("stroke", "red")
            .attr("stroke-width",7)

    function getTextMMDD(d,i){
        console.log(d[0]);
        return d[0];
    }

    //date
    dayDataGroups
        .append("text")
        .text(getTextMMDD)
            .attr("x",function(d, i){
                let date = d[0];
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                return -dateRadius*0.3
            })
            .attr("y",-5)
            .style("font-size",function(d, i){
                let date = d[0];
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                return dateRadius*0.3
            })
    ;

    dayDataGroups
        .append("text")
        .text("2022")
            .attr("x",function(d, i){
                let date = d[0];
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                return -dateRadius*0.3
            })
            .attr("y",function(d, i){
                let date = d[0];
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                return dateRadius*0.2
            })
            .style("font-size",function(d, i){
                let date = d[0];
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                return dateRadius*0.3
            })
    ;

    // within each group we bind the hour data to elements (Layer 2)
    // there are multiple groups in dayDataGroups so what we do here 
    // happens once for each of those groups
    function getHourData(d, i){
        // console.log(d)

        // return [d[1][0]] // only work with one hour group worth of data
        return d[1] // all hour groups
    }

    let hourDataGroups = dayDataGroups.selectAll(".hourDataGroup").data(getHourData).enter()
        .append("g")
            .attr("class", "hourDataGroup")
            .attr("transform", function(d, i){
                // return "translate("+(i*21)+", 10)"
                return "translate(0, 0)"
            })
    ;

    hourDataGroups
        .attr("transform", function(d, i){
            // console.log(d)
                    let angle;
        if (d[0] == "0-1am") {
            angle=18;
        } else if (d[0] == "1-2am") {
            angle=19;
        } else if (d[0] == "2-3am") {
            angle=20;
        } else if (d[0] == "3-4am") {
            angle=21;
        } else if (d[0] == "4-5am") {
            angle=22;
        } else if (d[0] == "5-6am") {
            angle=23;
        }else if (d[0] == "6-7am") {
            angle=24;
        }else if (d[0] == "7-8am") {
            angle=1;
        }else if (d[0] == "8-9am") {
            angle=2;
        }else if (d[0] == "9-10am") {
            angle=3;
        }else if (d[0] == "10-11am") {
            angle=4;
        }else if (d[0] == "11-12am") {
            angle=5;
        }else if (d[0] == "12-1pm") {
            angle=6;
        }else if (d[0] == "1-2pm") {
            angle=7;
        }else if (d[0] == "2-3pm") {
            angle=8;
        }else if (d[0] == "3-4pm") {
            angle=9;
        }else if (d[0] == "4-5pm") {
            angle=10;
        }else if (d[0] == "5-6pm") {
            angle=11;
        }else if (d[0] == "6-7pm") {
            angle=12;
        }else if (d[0] == "7-8pm") {
            angle=13;
        }else if (d[0] == "8-9pm") {
            angle=14;
        }else if (d[0] == "9-10pm") {
            angle=15;
        }else if (d[0] == "10-11pm") {
            angle=16;
        }else if (d[0] == "11-12pm") {
            angle=17;
        }

        let angle2=angle*15;
        // console.log(angle2);

        return "rotate("+angle2+")";
        })

        // .attr("transform", function(d,i){
        //     return "rotate("+giveTimeGetAngle+")"
        //     })
    ;

    // // these two circles are tests for actual data groups
    // let rotateTestGroup1 = hourDataGroups.append("g")
    //     .attr("transform", function(d, i){
    //         // console.log("need date for radius, where is it inside d?", d)
    //         // console.log(d[1][0].date)
    //         let date = d[1][0].date;
    //         let numWords = giveDayStringGetNumCurseWords(date);
    //         let dateRadius = dayRadiusScale(numWords);
    //         // x must depend on radius of that whole day
    //         let x = dateRadius *0.8;
    //         return "translate("+x+",0)";
    //     })
    // ;
    // rotateTestGroup1.append("circle")
    //     .attr("cx", 0)
    //     .attr("cy", 0)
    //     .attr("r", 3)
    //     .attr("fill", "black")
    // ;
// 
//     let rotateTestGroup2= hourDataGroups.append("g")
//         .attr("transform", function(d, i){
//             // console.log("need date for radius, where is it inside d?", d)
//             // console.log(d[1][0].date)
//             let date = d[1][0].date;
//             let numWords = giveDayStringGetNumCurseWords(date);
//             let dateRadius = dayRadiusScale(numWords);
//             // x must depend on radius of that whole day
//             let x = dateRadius *0.8;
//             return "rotate(15) translate("+x+",0)";
//         })
//     ;
// 
//     rotateTestGroup2.append("circle")
//         .attr("cx", 0)
//         .attr("cy", 0)
//         .attr("r", 3)
//         .attr("fill", "red")
//     ;



//     let actualDataGroups = hourDataGroups.append("g")
//         
//         .attr("transform", function(d, i){
//             // console.log("need date for radius, where is it inside d?", d)
//             // console.log(d[1][0].toWhom)
//             let date = d[1][0].date;
//             let numWords = giveDayStringGetNumCurseWords(date);
//             let dateRadius = dayRadiusScale(numWords);
//             // x must depend on radius of that whole day
//             let x = dateRadius *0.8;
// 
//             return "translate("+x+",0)";
//         })
//     ;

    function GetSingleDatapoints(d, i){
        return d[1] 
    }

    let singleDataGroups = hourDataGroups.selectAll(".singleDataGroup").data(GetSingleDatapoints).enter()
        .append("g")
            .attr("class", "singleDataGroup")
            .attr("transform", function(d, i){
                // console.log(i);
                // console.log(d);//one singledata group
                 let date = d.date;
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                // x must depend on radius of that whole day
                let x = dateRadius *0.85;

                return "rotate("+i*5+") translate("+x+",0)"
            })
            .attr("fill", actualDataPointsColor)
    ;
  

    function actualDataPointsColor(d,i){
        let color;

        if (d.emotionalContent == "enjoyment") {
            color = "#90EE90";//lightgreen
        } else if (d.emotionalContent == "anger") {
            color = "#E74C3C";
        } else if (d.emotionalContent == "disgust") {
            color = "#AF7AC5";
        } else if (d.emotionalContent == "sadness") {
            color = "#85C1E9";
        } else if (d.emotionalContent == "none") {
            color = "#ABB2B9";
        } else if (d.emotionalContent == "fear") {
            color = "#566573";
        } else if (d.emotionalContent == "surprise/shock") {
            color = "#F7DC6F";
        }
        // console.log(color);
        return color;
    }

    singleDataGroups
        .filter(function(d, i) { return d.toWhom == "friend"; })
        .append("rect")//rectangle
            .attr("x",-10)
            .attr("y",-5)
            .attr("width",30)
            .attr("height",8)

    ;

    singleDataGroups
        .filter(function(d, i) { return d.toWhom == "roommate"; })
        .append("circle")//circle
            .attr("cx", 5)
            .attr("cy", 0)
            .attr("r", 10)
    ;

    singleDataGroups
        .filter(function(d, i) { return d.toWhom == "acquaintance"; })
        .append("rect")//round-corner rectangle
            .attr("x",-5)
            .attr("y",-5)
            .attr("rx",5)
            .attr("ry",5)
            .attr("width",22)
            .attr("height",8)
    ;

    singleDataGroups
        .filter(function(d, i) { return d.where == "wechat"; })
        .append("line")//wechaat
            .attr("x1",-2)
            .attr("y1",-5)
            .attr("x2",-2)
            .attr("y2",3)
            .attr("stroke", "black")
            .attr("stroke-width",4)
    ;

//need change
    singleDataGroups
        .filter(function(d, i) { return d.where == "weibo"; })
        .append("line")//wechaat
            .attr("x1",-2)
            .attr("y1",-5)
            .attr("x2",-2)
            .attr("y2",3)
            .attr("stroke", "black")
            .attr("stroke-width",4)
    ;

    singleDataGroups
        .filter(function(d, i) { return d.where == "weibo"; })
        .append("line")//wechaat
            .attr("x1",5)
            .attr("y1",-5)
            .attr("x2",5)
            .attr("y2",3)
            .attr("stroke", "black")
            .attr("stroke-width",4)
    ;


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
                return dateRadius+3
            })
            .attr("fill", "transparent")
            .attr("stroke", "black")
            .attr("stroke-width",10)
    ;

    // //mouth mask circle
    // dayDataGroups
    //     .append("circle")
    //         .attr("cx",0)
    //         .attr("cy",0)
    //         .attr("r",function(d, i){
    //             let date = d[0];
    //             let numWords = giveDayStringGetNumCurseWords(date);
    //             let dateRadius = dayRadiusScale(numWords);
    //             return dateRadius-2
    //         })
    //         .attr("fill", "transparent")
    //         .attr("stroke", "black")
    //         .attr("stroke-width",5)
    // ;

    // datagroups.attr("transform", translateGroup);
}


d3.json("swearwords.json").then(gotData);