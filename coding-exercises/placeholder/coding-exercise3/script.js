let w = window.innerWidth;
let h = window.innerHeight;

let viz = d3.select("#viz-container")
    // .style("display", flex)
    // .style("flex-wrap", wrap)
    .append("svg")
    .attr("id", "viz")
    // .attr("class", "flex-container")
    .attr("width", w)
    .attr("height", h);


function xPos(d, i) {
    // console.log("D3 passed", d, "into my xPos function!");
    // console.log("D3 also passed", i);
    let xRow;
    xRow = Math.floor(i % 7);
    return xRow * 200 + 120;
}

function yPos(d, i) {
    // console.log("D3 passed", d, "into my xPos function!");
    // console.log("D3 also passed", i);
    let yRow;
    yRow = Math.floor(i / 7);
    return yRow * 200 + 100;
}

// //how to do with yPos if wrap is used?
//
// function yPos(d, i) {
//     // console.log("D3 passed", d, "into my xPos function!");
//     // console.log("D3 also passed", i);
//     return 200 * i + 100;
// }


// //mouth radius depends on how many swear words I say one day
// //however, I collect date data as text, so I have to first sum the number of each day
// //calculate and collect the dateData(the number of swear words for each date)
//
// function dateData(d, i) {
//     let count1, count2, count3, count4 = 0;
//     if (d.date[i] = "0219") {
//         count1++;
//         console.log(d.date[i]); //this does not define which d.date is
//     } else if (d.date[i] = "0220") {
//         count2++;
//     } else if (d.date[i] = "0221") {
//         count3++;
//     } else { count4++; }
// 
//     console.log(count1, count2, count3, count4);
//     return count1, count2, count3, count4;
// }
//give up, don't know how to sum


function mouthRadius(d, i) {
    let radiusNum;
    // console.log(d);
    // console.log(i);
    if (d.where == "in-person") {
        radiusNum = 1;
    } else if (d.where == "wechat") {
        radiusNum = 2;
    } else if (d.where == "weibo") {
        radiusNum = 3;
    }
    console.log(radiusNum);
    return radiusNum * 15 + 20;
}

function mouthColor(d, i) {
    let color;
    if (d.emotionalContent == "in-person") {
        color = 1;
    } else if (d.emotionalContent == "enjoyment") {
        color = "#F5B041";
    } else if (d.emotionalContent == "anger") {
        color = "#E74C3C";
    } else if (d.emotionalContent == "disgust") {
        color = "#AF7AC5";
    } else if (d.emotionalContent == "sadness") {
        color = "#85C1E9";
    } else if (d.emotionalContent == "Questioning") {
        color = "#A3E4D7";
    } else if (d.emotionalContent == "none") {
        color = "#ABB2B9";
    } else if (d.emotionalContent == "fear") {
        color = "#566573";
    } else if (d.emotionalContent == "surprise/shock") {
        color = "#F7DC6F";
    }
    console.log(color);
    return color;
}

function dateText(d, i) {
    let underText;
    underText = "22" + d.date + ": " + d.time;
    console.log(underText); //calls
    return underText;
}

//tried to change the date x position to make it center, but failed
//also tried "var dataxPos = xPos - mouthRadius; " in the below gotData() function, failed
//how to calculate the xPos in attr ? or in new function ?
//
// function datexPos(d, i) {
//     let datexPos;
//     dataxPpos[i] = xPos[i] - mouthRadius[i];
//     return datexPos;
// }
//i made by the repeated code below (the code repeated with other code)
//are there any more simple calculation method that can replace them?

function datexPos(d, i) {
    let radiusNum;
    // console.log(d);
    // console.log(i);
    if (d.where == "in-person") {
        radiusNum = 1;
    } else if (d.where == "wechat") {
        radiusNum = 2;
    } else if (d.where == "weibo") {
        radiusNum = 3;
    }
    console.log(radiusNum);
    //mouthRadius: radiusNum * 20 + 20; 
    let xRow;
    xRow = Math.floor(i % 7);
    //xPos: xRow * 200 + 140;
    return (xRow * 200 + 120) - (radiusNum * 15 + 20);
}

function dateyPos(d, i) {
    let yRow;
    yRow = Math.floor(i / 7);
    // yPos: yRow * 200 + 120;
    return yRow * 200 + 200;
}

function lipRadius(d, i) {
    let lipUpdown;
    let radiusNum;

    if (d.where == "in-person") {
        radiusNum = 1;
    } else if (d.where == "wechat") {
        radiusNum = 2;
    } else if (d.where == "weibo") {
        radiusNum = 3;
    }

    if (d.consciousness == "conscious") {
        lipUpdown = 1;
    }

    console.log(lipUpdown);
    return lipUpdown * (radiusNum * 15 + 20) + 10;
}

function gotData(newData) {
    console.log(newData);
    console.log(mouthRadius);

    viz.selectAll("circle").data(newData).enter().append("circle")
        // .style("display", flex)
        // .style("flex-wrap", wrap)
        .attr("cx", xPos)
        .attr("cy", yPos)
        .attr("r", mouthRadius)
        .attr("fill", mouthColor);

    viz.selectAll("text").data(newData).enter().append("text")
        .text(dateText)
        .attr("x", datexPos)
        .attr("y", dateyPos)
        //do calculation inside attribute - create function 
        //.attr("y", () => {
        //     return 6 + 7
        // })
        .attr("fill", "black")
        //.style("text-align", "center");

    //tried to draw a semicircle but failed (here's the link to the tutorial I referred to:https://www.geeksforgeeks.org/how-to-draw-a-semi-circle-using-html-and-css/)
    //
    // viz.selectAll("semiCircle").data(newData).enter().append("semiCircle")
    //     .attr("cx", xPos)
    //     .attr("y", 400)
    //     .attr("fill", "black")
    //     .style("position", "absolute")
    //     .style("top ", "50%")
    //     .style("left", "50%")
    //     .style("transform", "translate(-50%,-50%)")
    //     .style("border-radius", "mouthRadius * 1.5 mouthRadius * 1.5 0 0")
    //     .style("background-color", "red");

    viz.selectAll("lipcircle").data(newData).enter().append("circle")
        .attr("cx", xPos)
        .attr("cy", yPos)
        .attr("r", lipRadius)
        .attr("fill", "transparent")
        .attr("style", "fill-opacity:0; stroke:red;stroke-width:3px");

    viz.selectAll("title").data(newData).enter().append("text")
        .text("SWEAR WORDS")
        .attr("x", 1030)
        .attr("y", 800)
        .attr("fill", "black")
        .attr("style", "font-weight: bold")
        .attr("style", "font-size: 70px");

    viz.selectAll("key1").data(newData).enter().append("text")
        .text("Circle Size - Where : small/medium/large - In-person/WeChat/Weibo")
        .attr("x", 1035)
        .attr("y", 660)
        .attr("fill", "black")
        .attr("style", "font-size: 18px");

    viz.selectAll("key2").data(newData).enter().append("text")
        .text("⭕️ - consciousness : exist - conscious ; not exist - unconscious")
        .attr("x", 1035)
        .attr("y", 685)
        .attr("style", "font-size: 18px");

    viz.selectAll("key3").data(newData).enter().append("text")
        .text("Circle Color - Emotion : ")
        .attr("x", 1035)
        .attr("y", 710)
        .attr("style", "font-size: 18px");

    //i failed to include the key in the container in html, so below are many lines that needs to be improved
    //
    //<div class="key"><span style="color:#F5B041">enjoyment</span><span style="color:#E74C3C">anger</span><span style="color:#AF7AC5">disgust</span><span style="color:#85C1E9">sadness</span></div>
    //<div class = "key" > < span style = "color:#A3E4D7" > Questioning < /span><span style="color:#F7DC6F">surprise/shock < /span><span style="color:#566573">fear</span > < span style = "color:#ABB2B9" > none < /span></div>

    viz.selectAll("key3").data(newData).enter().append("text")
        .text("Happiness")
        .attr("x", 1215)
        .attr("y", 710)
        .attr("style", "font-size: 18px")
        .attr("fill", "#F5B041");

    viz.selectAll("key3").data(newData).enter().append("text")
        .text("Anger")
        .attr("x", 1295)
        .attr("y", 710)
        .attr("style", "font-size: 18px")
        .attr("fill", "#E74C3C");

    viz.selectAll("key3").data(newData).enter().append("text")
        .text("Disgust")
        .attr("x", 1345)
        .attr("y", 710)
        .attr("style", "font-size: 18px")
        .attr("fill", "#AF7AC5");

    viz.selectAll("key3").data(newData).enter().append("text")
        .text("Sadness")
        .attr("x", 1405)
        .attr("y", 710)
        .attr("style", "font-size: 18px")
        .attr("fill", "#85C1E9");

    viz.selectAll("key3").data(newData).enter().append("text")
        .text("Questioning")
        .attr("x", 1215)
        .attr("y", 735)
        .attr("style", "font-size: 18px")
        .attr("fill", "#A3E4D7");

    viz.selectAll("key3").data(newData).enter().append("text")
        .text("Surprise")
        .attr("x", 1310)
        .attr("y", 735)
        .attr("style", "font-size: 18px")
        .attr("fill", "#F7DC6F");

    viz.selectAll("key3").data(newData).enter().append("text")
        .text("Fear")
        .attr("x", 1375)
        .attr("y", 735)
        .attr("style", "font-size: 18px")
        .attr("fill", "#566573");

    viz.selectAll("key3").data(newData).enter().append("text")
        .text("None")
        .attr("x", 1415)
        .attr("y", 735)
        .attr("style", "font-size: 18px")
        .attr("fill", "#ABB2B9");


}
d3.json("data.json").then(gotData)