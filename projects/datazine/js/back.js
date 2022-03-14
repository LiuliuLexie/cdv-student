let w = 2400;
let h = 800;

let viz = d3.select("#container")
    .append("svg")
        .attr("class", "viz")
        .attr("width", w)
        .attr("height", h);

    viz
        .append("text")
        .text("How to read it")
            .attr("x", -20)
            .attr("y", 180)
            .style("font-size", 200)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "Silver");
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
                return "translate(595, 452)"
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
    dayDataGroups
        .append("text")
        .text("Date:")
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
                return -dateRadius*0.2
            })
            .style("font-size",function(d, i){
                let date = d[0];
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                return dateRadius*0.3
            })
            .attr("fill", "DimGray")
    ;
    dayDataGroups
        .append("text")
        .text("MMDD")
            .attr("x",function(d, i){
                let date = d[0];
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                return -dateRadius*0.45
            })
            .attr("y",10)
            .style("font-size",function(d, i){
                let date = d[0];
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                return dateRadius*0.3
            })
            .attr("fill", "DimGray")
    ;

    dayDataGroups
        .append("text")
        .text("YY")
            .attr("x",function(d, i){
                let date = d[0];
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                return -dateRadius*0.25
            })
            .attr("y",function(d, i){
                let date = d[0];
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                return dateRadius*0.35
            })
            .style("font-size",function(d, i){
                let date = d[0];
                let numWords = giveDayStringGetNumCurseWords(date);
                let dateRadius = dayRadiusScale(numWords);
                return dateRadius*0.4
            })
            .attr("fill", "DimGray")
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

    viz
        .append("text")
        .text("consciouness——")
            .attr("x", 25)
            .attr("y", 270)
            .style("font-size", 50)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "DimGray");
   
    ;

    viz
        .append("text")
        .text("con said > uncon said")
            .attr("x", 70)
            .attr("y", 310)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray");
    ;

    viz
        .append("circle")
            .attr("cx", 50)
            .attr("cy", 303)
            .attr("r",10)
            .attr("fill", "transparent")
            .attr("stroke", "red")
            .attr("stroke-width",3)
    ;

    viz
        .append("text")
        .text("con said < uncon said")
            .attr("x", 70)
            .attr("y", 340)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            // .style("font-weight", "bold")
            .attr("fill", "DimGray");
    ;

    viz
        .append("circle")
            .attr("cx", 50)
            .attr("cy", 333)
            .attr("r",10)
            .attr("fill", "transparent")
            .attr("stroke", "red")
            .attr("stroke-width",3)
            .style("stroke-dasharray", ("10,5"))
    ;

    viz
        .append("text")
        .text("how many——")
            .attr("x", 25)
            .attr("y", 410)
            .style("font-size", 50)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "DimGray");
    ;

    viz
        .append("text")
        .text("more words, bigger mouth circle")
            .attr("x", 40)
            .attr("y", 450)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray");
    ;

    viz
        .append("text")
        .text("my mood———")
            .attr("x", 25)
            .attr("y", 525)
            .style("font-size", 50)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "DimGray");
    ;

    viz
        .append("circle")
            .attr("cx", 50)
            .attr("cy", 560)
            .attr("r",10)
            .attr("fill", "#90EE90")
            .attr("stroke-width",3)
    ;

    viz
        .append("text")
        .text("joyful")
            .attr("x", 70)
            .attr("y", 565)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray");
    ;

    viz
        .append("circle")
            .attr("cx", 180)
            .attr("cy", 560)
            .attr("r",10)
            .attr("fill", "#E74C3C")
            .attr("stroke-width",3)
    ;

    viz
        .append("text")
        .text("angry")
            .attr("x", 200)
            .attr("y", 565)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray");
    ;

    viz
        .append("circle")
            .attr("cx", 50)
            .attr("cy", 600)
            .attr("r",10)
            .attr("fill", "#AF7AC5")
            .attr("stroke-width",3)
    ;

    viz
        .append("text")
        .text("annoyed")
            .attr("x", 70)
            .attr("y", 605)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray");
    ;

    viz
        .append("circle")
            .attr("cx", 180)
            .attr("cy", 600)
            .attr("r",10)
            .attr("fill", "#85C1E9")
            .attr("stroke-width",3)
    ;

    viz
        .append("text")
        .text("sad")
            .attr("x", 200)
            .attr("y", 605)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray");
    ;

  viz
        .append("circle")
            .attr("cx", 50)
            .attr("cy", 640)
            .attr("r",10)
            .attr("fill", "#566573")
            .attr("stroke-width",3)
    ;

    viz
        .append("text")
        .text("afraid")
            .attr("x", 70)
            .attr("y", 645)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray");
    ;

    viz
        .append("circle")
            .attr("cx", 180)
            .attr("cy", 640)
            .attr("r",10)
            .attr("fill", "#F7DC6F")
            .attr("stroke-width",3)
    ;

    viz
        .append("text")
        .text("surprised")
            .attr("x", 200)
            .attr("y", 645)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray");
    ;

  viz
        .append("circle")
            .attr("cx", 50)
            .attr("cy", 680)
            .attr("r",10)
            .attr("fill", "#ABB2B9")
            .attr("stroke-width",3)
    ;

    viz
        .append("text")
        .text("nothing")
            .attr("x", 70)
            .attr("y", 685)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray");
    ;

//shape-to whom
    viz
        .append("text")
        .text("—————to whom")
            .attr("x", 715)
            .attr("y", 270)
            .style("font-size", 50)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "DimGray");
   
    ;
    viz
        .append("rect")
            .attr("x",890)
            .attr("y",290)
            .attr("width",15)
            .attr("height",40)
            .attr("stroke", "DimGray")
            .attr("fill","transparent")
            .attr("stroke-width",3)
    ;

    viz
        .append("text")
        .text("friend")
            .attr("x", 915)
            .attr("y", 315)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray");
    ;

    viz
        .append("circle")
            .attr("cx", 1010)
            .attr("cy", 310)
            .attr("r", 13)
            .attr("stroke", "DimGray")
            .attr("fill","transparent")
            .attr("stroke-width",3)
    ;

    viz
        .append("text")
        .text("roommate")
            .attr("x", 1035)
            .attr("y", 315)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray");
    ;

    viz
        .append("rect")//round-corner rectangle
            .attr("x",910)
            .attr("y",350)
            .attr("rx",7)
            .attr("ry",7)
            .attr("width",18)
            .attr("height",35)
            .attr("stroke", "DimGray")
            .attr("fill","transparent")
            .attr("stroke-width",3)
    ;

    viz
        .append("text")
        .text("acquaintance/strangers")
            .attr("x", 940)
            .attr("y", 370)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray");
    ;

//lines-where
    viz
        .append("text")
        .text("————where")
            .attr("x", 810)
            .attr("y", 462)
            .style("font-size", 50)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "DimGray")
    ;

    viz
        .append("rect")
            .attr("x",910)
            .attr("y",485)
            .attr("width",15)
            .attr("height",40)
            .attr("stroke", "DimGray")
            .attr("fill","transparent")
            .attr("stroke-width",3)
            .style("stroke-dasharray", ("10,5"))
    ;

    viz
        .append("text")
        .text("in-person")
            .attr("x", 885)
            .attr("y", 550)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray")
    ;
    viz
        .append("rect")
            .attr("x",1000)
            .attr("y",485)
            .attr("width",15)
            .attr("height",40)
            .attr("stroke", "DimGray")
            .attr("fill","transparent")
            .attr("stroke-width",3)
            .style("stroke-dasharray", ("10,5"))
    ;
    viz
        .append("text")
        .text("wechat")
            .attr("x", 980)
            .attr("y", 550)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray")
    ;
    viz
        .append("rect")
            .attr("x",1090)
            .attr("y",485)
            .attr("width",15)
            .attr("height",40)
            .attr("stroke", "DimGray")
            .attr("fill","transparent")
            .attr("stroke-width",3)
            .style("stroke-dasharray", ("10,5"))
    ;
    viz
        .append("text")
        .text("weibo")
            .attr("x", 1075)
            .attr("y", 550)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray")
    ;
    viz
        .append("line")//wechaat
            .attr("x1",1000)
            .attr("y1",495)
            .attr("x2",1016)
            .attr("y2",495)
            .attr("stroke", "DimGray")
            .attr("stroke-width",4)
    ;

    viz
        .append("line")
            .attr("x1",1090)
            .attr("y1",495)
            .attr("x2",1106)
            .attr("y2",495)
            .attr("stroke", "DimGray")
            .attr("stroke-width",4)
    ;

    viz
        .append("line")
            .attr("x1",1090)
            .attr("y1",505)
            .attr("x2",1106)
            .attr("y2",505)
            .attr("stroke", "DimGray")
            .attr("stroke-width",4)
    ;

//time
    viz
        .append("text")
        .text("————timeslot")
            .attr("x", 775)
            .attr("y", 610)
            .style("font-size", 50)
            .style("font-family", "Times New Roman")
            .style("font-weight", "bold")
            .attr("fill", "DimGray")
    ;

    viz
        .append("circle")
            .attr("cx", 880)
            .attr("cy", 690)
            .attr("r", 60)
            .attr("stroke", "DimGray")
            .attr("fill","transparent")
            .attr("stroke-width",4)
    ;

    viz
        .append("rect")
            .attr("x", 820)
            .attr("y", 690)
            .attr("width",10)
            .attr("height",2)
            .attr("stroke", "DimGray")
            .attr("fill","DimGray")
    ;
    viz
        .append("text")
        .text("18")
            .attr("x", 830)
            .attr("y", 700)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray")
    ;

    viz
        .append("rect")
            .attr("x", 930)
            .attr("y", 690)
            .attr("width",10)
            .attr("height",2)
            .attr("stroke", "DimGray")
            .attr("fill","DimGray")
    ;
    viz
        .append("text")
        .text("6")
            .attr("x", 915)
            .attr("y", 700)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray")
    ;
    viz
        .append("rect")
            .attr("x", 880)
            .attr("y", 630)
            .attr("width",2)
            .attr("height",10)
            .attr("stroke", "DimGray")
            .attr("fill","DimGray")
    ;
    viz
        .append("text")
        .text("24")
            .attr("x", 870)
            .attr("y", 660)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray")
    ;
    viz
        .append("rect")
            .attr("x", 880)
            .attr("y", 740)
            .attr("width",2)
            .attr("height",10)
            .attr("stroke", "DimGray")
            .attr("fill","DimGray")
    ;
    viz
        .append("text")
        .text("12")
            .attr("x", 870)
            .attr("y", 735)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray")
    ;

    viz
        .append("line")
            .attr("x1",880)
            .attr("y1",690)
            .attr("x2",850)
            .attr("y2",660)
            .attr("stroke", "DimGray")
            .attr("stroke-width",4)
    ;

    viz
        .append("text")
        .text("a 24-hour-clock")
            .attr("x", 960)
            .attr("y", 650)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray")
    ;

    viz
        .append("text")
        .text("* according to the data, I")
            .attr("x", 960)
            .attr("y", 670)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray")
    ;

    viz
        .append("text")
        .text("say no more than 3")
            .attr("x", 975)
            .attr("y", 687)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray")
    ;
    viz
        .append("text")
        .text("swear words/hour, so 3")
            .attr("x", 975)
            .attr("y", 704)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray")
    ;
    viz
        .append("text")
        .text("slots are left in each hour.")
            .attr("x", 975)
            .attr("y", 721)
            .style("font-size", 20)
            .style("font-family", "Times New Roman")
            .attr("fill", "DimGray")
    ;
}


d3.json("swearwordscover.json").then(gotData);