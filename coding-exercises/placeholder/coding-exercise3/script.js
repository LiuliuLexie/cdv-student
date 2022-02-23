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
    return 150 * i + 80;
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
    return radiusNum * 25 + 20;
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
    underText = "2022" + d.date + ": " + d.time;
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
    //mouthRadius: radiusNum * 25 + 20; 
    // xPos= 150 * i + 80;
    return (150 * i + 80) - (radiusNum * 25 + 20);
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
    return lipUpdown * (radiusNum * 25 + 20) + 10;
}

function gotData(newData) {
    console.log(newData);
    console.log(mouthRadius);

    viz.selectAll("circle").data(newData).enter().append("circle")
        // .style("display", flex)
        // .style("flex-wrap", wrap)
        .attr("cx", xPos)
        .attr("cy", 400)
        .attr("r", mouthRadius)
        .attr("fill", mouthColor);

    viz.selectAll("text").data(newData).enter().append("text")
        .text(dateText)
        .attr("x", datexPos)
        .attr("y", 510)
        .attr("fill", "black");

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
        .attr("cy", 400)
        .attr("r", lipRadius)
        .attr("fill", "transparent")
        .attr("style", "fill-opacity:0; stroke:red;stroke-width:3px");

}
d3.json("data.json").then(gotData)