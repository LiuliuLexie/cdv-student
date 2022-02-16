let data = [

    {
        "timestamp": "2022-02-10T14:58:17.338Z",
        "chongqing": 5,
        "shanghai": 4,
        "beijing": 3,
        "wuhan": 3,
        "xian": 3,
        "chengdu": 5,
        "tianjin": 3,
        "guangzhou": 5,
        "guiyang": 3,
        "hangzhou": 3
    },
    {
        "timestamp": "2022-02-10T15:00:12.737Z",
        "chongqing": 5,
        "shanghai": 1,
        "beijing": 2,
        "wuhan": 3,
        "xian": 1,
        "chengdu": 5,
        "tianjin": 3,
        "guangzhou": 4,
        "guiyang": 4,
        "hangzhou": 3
    },
    {
        "timestamp": "2022-02-10T15:00:48.943Z",
        "chongqing": 3,
        "shanghai": 2,
        "beijing": 4,
        "wuhan": 2,
        "xian": 3,
        "chengdu": 4,
        "tianjin": 2,
        "guangzhou": 3,
        "guiyang": 2,
        "hangzhou": 1
    },
    {
        "timestamp": "2022-02-10T15:01:54.150Z",
        "chongqing": 5,
        "shanghai": 4,
        "beijing": 1,
        "wuhan": 3,
        "xian": 4,
        "chengdu": 5,
        "tianjin": 3,
        "guangzhou": 4,
        "guiyang": 3,
        "hangzhou": 3
    },
    {
        "timestamp": "2022-02-10T15:02:06.072Z",
        "chongqing": 5,
        "shanghai": 3,
        "beijing": 3,
        "wuhan": 4,
        "xian": 2,
        "chengdu": 3,
        "tianjin": 2,
        "guangzhou": 5,
        "guiyang": 4,
        "hangzhou": 5
    },
    {
        "timestamp": "2022-02-10T15:03:03.145Z",
        "chongqing": 4,
        "shanghai": 2,
        "beijing": 4,
        "wuhan": 3,
        "xian": 3,
        "chengdu": 4,
        "tianjin": 2,
        "guangzhou": 3,
        "guiyang": 2,
        "hangzhou": 4
    },
    {
        "timestamp": "2022-02-10T15:06:13.908Z",
        "chongqing": 3,
        "shanghai": 4,
        "beijing": 5,
        "wuhan": 3,
        "xian": 2,
        "chengdu": 3,
        "tianjin": 4,
        "guangzhou": 2,
        "guiyang": 2,
        "hangzhou": 4
    },
    {
        "timestamp": "2022-02-10T15:08:59.566Z",
        "chongqing": 5,
        "shanghai": 5,
        "beijing": 4,
        "wuhan": 3,
        "xian": 4,
        "chengdu": 4,
        "tianjin": 2,
        "guangzhou": 5,
        "guiyang": 1,
        "hangzhou": 5
    },
    {
        "timestamp": "2022-02-10T16:56:05.204Z",
        "chongqing": 4,
        "shanghai": 3,
        "beijing": 2,
        "wuhan": 3,
        "xian": 1,
        "chengdu": 4,
        "tianjin": 3,
        "guangzhou": 5,
        "guiyang": 5,
        "hangzhou": 3
    },
    {
        "timestamp": "2022-02-11T07:47:07.326Z",
        "chongqing": 5,
        "shanghai": 3,
        "beijing": 3,
        "wuhan": 2,
        "xian": 3,
        "chengdu": 5,
        "tianjin": 3,
        "guangzhou": 5,
        "guiyang": 2,
        "hangzhou": 2
    },
    {
        "timestamp": "2022-02-11T07:48:34.991Z",
        "chongqing": 5,
        "shanghai": 2,
        "beijing": 4,
        "wuhan": 2,
        "xian": 4,
        "chengdu": 5,
        "tianjin": 2,
        "guangzhou": 5,
        "guiyang": 1,
        "hangzhou": 2
    }
]

var emoji = "🥰";
var titleName = document.getElementById("titleName");

titleName.innerHTML = "How's China's 2021 Top 10 Tourist Cities in People's Eyes in 2022 " + emoji;

let transformedData = averageData(data);
console.log(transformedData);

//calculate and collect the newData(the average number of each object)
function averageData(data) {
    let newData = [];
    let keys = Object.keys(data[data.length - 1]);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let sum = 0;
        let num = 0;
        for (let j = 0; j < data.length; j++) {
            let datum = data[j];
            if (key in datum) {
                sum += datum[key];
                num++;
            }
        }
        let avg = sum / num;
        if (!isNaN(avg)) {
            let newDataPoint = { "name": key, "average": avg, 'numMeasurements': num };
            newData.push(newDataPoint);
        }
    }
    return newData;
}

//be careful with the marks!!
let container = document.getElementById("container");

for (let i = 0; i < transformedData.length; i++) {
    let datapoint = transformedData[i];
    let city = datapoint.name;
    let average = datapoint.average;

    console.log(datapoint);

    let bar = document.createElement("div");
    bar.className = "bar";
    bar.style.width = (average * 200) + "px";

    let barname = document.createElement("p");
    barname.innerHTML = city + " " + average;

    bar.appendChild(barname);

    container.appendChild(bar);
}