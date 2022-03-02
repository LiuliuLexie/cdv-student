let w = window.innerWidth;
let h = window.innerHeight;

let viz = d3.select("#viz-container")
    .append("svg")
    .attr("id", "viz")
    .attr("width", 1550)
    .attr("height", 780)
    .style("background-color", "lavender");

function getText(d, i) {
    return "Directed by " + d.director;
}

function directorY(d, i) {
    return d.lengthRoughlyWriteTheMinutes - 5;
}

function getText2(d, i) {
    return "Starring  " + d.starring;
}

function actorY(d, i) {
    return d.lengthRoughlyWriteTheMinutes + 15;
}

function getText3(d, i) {
    return d.name;
}

function nameX(d, i) {
    return -d.lengthRoughlyWriteTheMinutes + 65;
}


function nameY(d, i) {
    return -d.lengthRoughlyWriteTheMinutes + 35;
}

function radius(d, i) {
    return d.lengthRoughlyWriteTheMinutes - 30;
}

function circleColor(d, i) {
    let color;
    if (d.iLikedIt == 10) {
        color = "black";
    } else if (d.iLikedIt == 9) {
        color = "dimGray";
    } else if (d.iLikedIt == 8) {
        color = "gray";
    } else if (d.iLikedIt == 7) {
        color = "darkGray";
    } else if (d.iLikedIt == 6) {
        color = "silver";
    } else {
        color = "gainsboro";
    };

    return color;

}

//place and language circle color
function placeRadius(d, i) {
    return d.lengthRoughlyWriteTheMinutes - 45;
}

//small circle color
function languageColor(d, i) {
    let color;
    if (d.languageMain == "English") {
        color = "LightBlue";
    } else if (d.languageMain == "Mandarin") {
        color = "Salmon";
    } else if (d.languageMain == "Japanese ") {
        color = "YellowGreen";
    } else if (d.languageMain == "Russian") {
        color = "NavajoWhite";
    } else if (d.languageMain == "Korean") {
        color = "PaleTurquoise";
    } else {
        color = "Thistle";
    };

    return color;
}

//circle stroke color
function placeColor(d, i) {
    let color;
    if (d.place == "America") {
        color = "DodgerBlue";
    } else if (d.place == "Mainland China ") {
        color = "FireBrick";
    } else if (d.place == "Japan") {
        color = "DarkOliveGreen	";
    } else if (d.place == "Russia") {
        color = "SandyBrown";
    } else if (d.place == "Korea") {
        color = "DarkTurquoise";
    } else {
        color = "MediumPurple";
    }

    return color;

}

// function type(d, i) {
//     return d.typeOfMovie == "Drama";
// }
// function type1(d, i) {
//     let type;
//     if (d.typeOfMovie == "Drama") {
//         type = 1;
//     } else { type = 0; }
// 
//     return type * 40;
// }
//
//solved the problem by using filter

function translateGroup(d, i) {
    //remember that i starts from 0
    let x, y;
    if (i < 5) {
        x = 120 + 300 * i;
        y = 180;
    } else if (i > 4) {
        x = 120 + 300 * (i - 5);
        y = 550;
    }
    return "translate(" + x + ", " + y + ")";
}

function gotData(incomingData) {
    console.log("the incoming data is:", incomingData)

    let datagroups = viz.selectAll(".datagroup").data(incomingData).enter().append("g")
        .attr("class", "datagroup");

    console.log(datagroups);

    //director name
    datagroups.append("text")
        .text(getText)
        .attr("x", -70)
        .attr("y", directorY)

    datagroups.append("text")
        .text(getText2)
        .attr("x", -70)
        .attr("y", actorY)

    datagroups.append("text")
        .text(getText3)
        .attr("x", nameX)
        .attr("y", nameY)
        .style("font-size", 20)
        .style("font-family", "cursive")

    //length circle
    // datagroups.append("circle")
    //     .attr("cx", 0)
    //     .attr("cy", 0)
    //     .attr("r", radius)
    //     .attr("fill", circleColor);
    //circle and rect, which is nicer
    datagroups.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("rx", 20)
        .attr("ry", 20)
        .attr("width", radius)
        .attr("height", radius)
        .attr("fill", circleColor)
        .attr("stroke", circleColor)
        .attr("stroke-width", 5)

    //place and language circle
    datagroups.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", placeRadius)
        .attr("stroke", placeColor)
        .attr("stroke-width", 5)
        .attr("fill", languageColor);

    datagroups
    // .append(function(d, i) {
    //     if (d.typeOfMovie == "drama") {
    //         return document.createElementNS("http://www.w3.org/2000/svg", "rect");
    //     } else {
    //         return document.createElementNS("http://www.w3.org/2000/svg", "circle");
    //     }
    // })
    // to use one filter to include all shapes
        .filter(function(d, i) { return d.typeOfMovie == "Documentary"; })
        .append("rect")
        .attr("x", -20)
        .attr("y", -20)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("width", 40)
        .attr("height", 40)
        .attr("stroke", "black")
        .attr("stroke-width", 5)
        .attr("fill", "transparent")

    datagroups
        .filter(function(d, i) { return d.typeOfMovie == "Action"; })
        .append("rect")
        .attr("x", -20)
        .attr("y", -20)
        .attr("width", 40)
        .attr("height", 40)
        .attr("stroke", "black")
        .attr("stroke-width", 5)
        .attr("fill", "transparent")


    datagroups
        .filter(function(d, i) { return d.typeOfMovie == "Romance"; })
        .append("circle")
        .attr("x", -25)
        .attr("y", -25)
        .attr("r", 25)
        .attr("stroke", "black")
        .attr("stroke-width", 5)
        .attr("fill", "transparent")

    datagroups
        .filter(function(d, i) { return d.typeOfMovie == "Drama"; })
        .append("polygon")
        .attr("points", "-20 -20 20 20 -20 20 20 -20")
        .attr("stroke", "black")
        .attr("stroke-width", 5)
        .attr("fill", "transparent")


    datagroups.attr("transform", translateGroup);
}


d3.json("data.json").then(gotData)