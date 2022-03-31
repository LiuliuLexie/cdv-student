let w = 900;
let h = 500;

let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    .style("outline", "solid black")
;

let data = [
  [
    [0,   100],
    [300, 400],
    [600, 300],
    [900, 350]
  ],
  [
    [0,   300],
    [230, 350],
    [900, 90 ]
  ]
]

let lineMaker=d3.line(); //same as the function below
console.log(lineMaker(data[0]))

// function getPath(d,i){
//   console.log(d)
//   let pathstring="";
//   for(let i=0;i<d.length;i++){
//     if(i==0){
//       pathstring+="M"
//     }else{
//       pathstring+="L"
//     }
//     pathstring += d[i].join(" ")
//     console.log(d[i])
//   }
//   console.log(pathstring)
//   return pathstring;
// }

let graphGroup = viz.append("g").attr("class", "graphGroup");

graphGroup.selectAll(".line").data(data).enter()
  .append("path")
    .attr("class","line")
    .attr("d",lineMaker)
    .attr("fill","none")
    .attr("stroke","black")
    .attr("stroke-width",5)
;