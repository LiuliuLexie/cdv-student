let w = 2400;
let h = 800;

let viz = d3.select("#container")
    .append("svg")
        .attr("class", "viz")
        .attr("width", w)
        .attr("height", h);

    viz
        .append("text")
        .text("艹草操")//操
            .attr("x", 570)
            .attr("y", 160)
            .style("font-size", 220)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "Silver");
    ;

    viz
        .append("text")
        .text("**的**")//**的
            .attr("x", -30)
            .attr("y", 150)
            .style("font-size", 200)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "Silver");
    ;

    viz
        .append("text")
        .text("淦'")//淦
            .attr("x", -25)
            .attr("y", 750)
            .style("font-size", 320)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "Silver");
    ;

    viz
        .append("text")
        .text("씨발")//씨발
            .attr("x", -30)
            .attr("y", 480)
            .style("font-size", 180)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "Silver")
            // .attr("letter-spacing","2px")
    ;

    viz
        .append("text")
        .text("我日")//我日
            .attr("x", 825)
            .attr("y", 762)
            .style("font-size", 210)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "Silver")
    ;

    viz
        .append("text")
        .text("FUCK")//F**k
            .attr("x", -20)
            .attr("y", 300)
            .style("font-size", 130)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "Silver");
    ;

    viz
        .append("text")
        .text("SH*T")//sh*t
            .attr("x", 310)
            .attr("y", 805)
            .style("font-size", 220)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "Silver");
    ;

    viz
        .append("text")
        .text("***")//sh*t
            .attr("x", 790)
            .attr("y", 680)
            .style("font-size", 300)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "Silver")
            // .attr("letter-spacing","5px")
    ;

    viz
        .append("text")
        .text("DA!")//sh*t
            .attr("x", 893)
            .attr("y", 345)
            .style("font-size", 170)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "Silver")
            // .attr("letter-spacing","5px")
    ;

    viz
        .append("text")
        .text("MN")//sh*t
            .attr("x", 906)
            .attr("y", 455)
            .style("font-size", 170)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "Silver")
            // .attr("letter-spacing","5px")
    ;

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
                return "translate(600, 370)"
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
    let minRadius = 250;
    let maxRadius = 250;
    let dayRadiusScale = d3.scaleLinear().domain( [minWordsPerDay, maxWordsPerDay ]).range( [ minRadius, maxRadius ] )


    

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

    ;

  
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
    // let singleDataGroups = actualDataGroups.selectAll(".singleDataGroup").data(GetSingleDatapoints).enter()
    //     .append("g")
    //         .attr("class", "singleDataGroup")
    //         .attr("transform", function(d, i){
    //             console.log(i);
    //             return "rotate("+i*5+")"
    //         })
    //         .attr("fill", actualDataPointsColor)
    // ;

//background circle
dayDataGroups
        .append("circle")
            .attr("cx",0)
            .attr("cy",0)
            // .attr("r",100)
            .attr("r",function(d, i){
                let date = d[0];
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                return dateRadius+20
            })
            .attr("fill", "transparent")
            .attr("stroke", "white")
            .attr("stroke-width",50)
    ;

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
                return dateRadius+25
            })
            .attr("fill", "transparent")
            .attr("stroke", "red")
            .attr("stroke-width",13)
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
                return dateRadius
            })
            .attr("fill", "transparent")
            .attr("stroke", "black")
            .attr("stroke-width",15)
    ;

    //mouth mask circle
    dayDataGroups
        .append("circle")
            .attr("cx",0)
            .attr("cy",0)
            .attr("r",function(d, i){
                let date = d[0];
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                return dateRadius-5
            })
            .attr("fill", "transparent")
            .attr("stroke", "black")
            .attr("stroke-width",5)
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
            .attr("width",40)
            .attr("height",15)

    ;

    singleDataGroups
        .filter(function(d, i) { return d.toWhom == "roommate"; })
        .append("circle")//circle
            .attr("cx", 10)
            .attr("cy", 8)
            .attr("r", 13)
    ;

    singleDataGroups
        .filter(function(d, i) { return d.toWhom == "acquaintance"; })
        .append("rect")//round-corner rectangle
            .attr("x",-5)
            .attr("y",-5)
            .attr("rx",6)
            .attr("ry",6)
            .attr("width",30)
            .attr("height",15)
    ;



    singleDataGroups
        .filter(function(d, i) { return d.where == "wechat"; })
        .append("line")//wechaat
            .attr("x1",3)
            .attr("y1",-5)
            .attr("x2",3)
            .attr("y2",10)
            .attr("stroke", "black")
            .attr("stroke-width",4)
    ;

    singleDataGroups
        .filter(function(d, i) { return d.where == "weibo"; })
        .append("line")//wechaat
            .attr("x1",3)
            .attr("y1",-5)
            .attr("x2",3)
            .attr("y2",10)
            .attr("stroke", "black")
            .attr("stroke-width",4)
    ;

    singleDataGroups
        .filter(function(d, i) { return d.where == "weibo"; })
        .append("line")//wechaat
            .attr("x1",10)
            .attr("y1",-5)
            .attr("x2",10)
            .attr("y2",10)
            .attr("stroke", "black")
            .attr("stroke-width",4)
    ;

    dayDataGroups
        .append("text")
            .text("SWEAR")
            .attr("x", -130)
            .attr("y", -25)
            .style("font-size", 90)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
     
    ;

    dayDataGroups
        .append("text")
            .text("WORDS")
            .attr("x", 0)
            .attr("y", 50)
            .style("font-size", 90)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("text-anchor", "middle")
            .call(cdvTextWrap(200))
    ;

    // datagroups.attr("transform", translateGroup);
}


d3.json("swearwordscover.json").then(gotData);