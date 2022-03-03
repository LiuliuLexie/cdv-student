let w = 2400;
let h = 800;

let viz = d3.select("#container")
    .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lightblue");

function gotData(incomingData) {
    console.log(incomingData);

    //make 100 datagroups
    //
    let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
        .append("g") //a string
        .attr("class", "datagroup");

    //search for the max
    let maxHeight = d3.max(incomingData, function(datapoint) {
        return datapoint.height;
    });
    console.log(maxHeight);

    //min and max at once are called "extent"
    // let heightExtent = d3.extent(incomingData, function(datapoint) {
    //     return datapoint.height;
    // });
    // console.log(heightExtent);

    let padding = 20;
    //usually do scale here
    //           building scale       input domain       output range
    let yScale = d3.scaleLinear().domain([0, maxHeight]).range([0, h / 2 - padding]);
    //console.log(yScale(800));
    let colorScale = d3.scaleLinear().domain([0, 300, maxHeight]).range(["black", "brown", "SandyBrown"]);
    console.log(colorScale(300))

    function getHeight(d, i) {
        //console.log(d.height);
        let height = yScale(d.height);
        return height;
    }

    function getY(d, i) {
        //console.log(d.height);
        return -yScale(d.height);
    }

    function getColor(d, i) {
        return colorScale(d.height);
    }
    let towers = datagroups.append("rect")
        .attr("x", 0)
        .attr("y", getY)
        .attr("width", 20)
        .attr("height", getHeight)
        .attr("fill", getColor);

    function getName(d, i) {
        return d.name;
    }
    let labels = datagroups.append("text")
        .attr("x", 3)
        .attr("y", -5)
        .text(getName)
        .attr("transform", "rotate(90)")

    //position the datagroups
    function getPosition(d, i) {
        let x = i * (w / 100);
        let y = h / 2;
        return "translate(" + x + ", " + y + ")"
    }

    datagroups.attr("transform", getPosition)

}


d3.json("buildings.json").then(gotData);