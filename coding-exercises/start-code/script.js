//create and svg as the first thing
//global variable viz for that svg
let viz = d3.select("#viz-container")
    .append("svg")
    .attr("id", "viz")
    .attr("width", 600)
    .attr("height", 400)
    .style("background-color", "lavender");

//data function to produce...
//...random values between 0 and 600
function randomX(d, i) {
    return Math.random() * 600;
}

//...random values between 0 and 400
function randomY(d, i) {
    return Math.random() * 400;
}

function translateGroup(d, i) {
    //return "translate(200,200)";
    let x = Math.random() * 600;
    let y = Math.random() * 400;
    return "translate(" + x + "," + y + ")"
}

function getText(d, i) {
    return d.timestamp;
}

//use incomingData
function gotData(incomingData) {
    console.log("the incoming data is:", incomingData)

    //     //               0               7           7
    //     viz.selectAll(".blackCircle").data(incomingData).enter().append("circle")
    //         .attr("class", "blackCircle") //class function!!
    //         .attr("cx", randomX)
    //         //.attr("cx", ()=>Math.random()*600) //would only be used once but still a function
    //         .attr("cy", randomY)
    //         .attr("r", 10)
    //         .attr("fill", "black")
    // 
    //     viz.selectAll(".redCircle").data(incomingData).enter().append("circle")
    //         .attr("class", "redCircle")
    //         .attr("cx", randomX)
    //         .attr("cy", randomY)
    //         .attr("r", 10)
    //         .attr("fill", "red")

    //                    0                7               7        g-group //now we have a group tag fro each datapoint
    let datagroups = viz.selectAll(".datagroup").data(incomingData).enter().append("g")
        .attr("class", "datagroup");

    console.log(datagroups);

    datagroups.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 50)
        .attr("fill", "black");

    datagroups.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 20)
        .attr("fill", "red");

    datagroups.append("text")
        .text(getText)
        .attr("x", -50)
        .attr("y", 70)

    //move around the whole group
    //datagroups.attr("transform", "translate(200,200)")
    datagroups.attr("transform", translateGroup); //can also use function


}


d3.json("data.json").then(gotData)