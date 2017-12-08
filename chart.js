    var margin = {top: 30, right: 0, bottom: 40, left: 60},
        width = 400 + margin.left + margin.right,
        height = 400 + margin.top + margin.bottom + 50;

    // Set the ranges
    var x = d3.scale.linear().range([0, width-margin.right-margin.left]);
    var y = d3.scale.linear().range([height-margin.top-70, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(24);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(10);

    // Define the line
    var startsLine = d3.svg.line()
        .x(function(d) { return x(d.hour); })
        .y(function(d) { return y(d.starts); });
    //      .attr("stroke": "green"); how to change color?
    var startsArea = d3.svg.area()
        .x(function(d) { return x(d.hour); })
        .y0(height-margin.top-70)
        .y1(function(d) { return y(d.starts); });

    var endsLine = d3.svg.line()
        .x(function(d) { return x(d.hour); })
        .y(function(d) { return y(d.ends); });

    var endsArea = d3.svg.area()
        .x(function(d) { return x(d.hour); })
        .y0(height-margin.top-70)
        .y1(function(d) { return y(d.ends); });


    // Adds the svg canvas


function updateGraph(station_id){
    // Get the data
    var svg = d3.select("#viz-container").append("svg")
    //    .append("svg")
            .attr("width", width)
            .attr("height", height)
          //  .attr("fill",  "#000000")
            .attr("padding-top", 20)
            .attr("padding-bottom",20)
          //  .attr("background-color", "black")
        .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

    var path = "./Data/stationflow/stationflow_" + station_id + ".csv" //just need to change this path in order to change graph
    d3.csv(path , function(error, data) {
        data.forEach(function(d) {
            d.hour = +d.hour;
            d.starts = +d.starts;
            d.ends = +d.ends;
            d.high = +d.high;
        });

        // Scale the range of the data
        x.domain([1,24]);
      //  y.domain([d3.min(data, function(d) { return d.starts; }),
        y.domain([0,
                  d3.max(data, function(d) { return d.high; })]);

        // Add the valueline path.
        svg.append("path")
                .attr("class", "endsArea")
                .attr("d", endsArea(data));

       svg.append("path")
                .attr("class", "startsArea")
                .attr("d", startsArea(data));

        svg.append("path")
            .attr("class", "startsLine")
            .attr("d", startsLine(data));

        svg.append("path")
            .attr("class", "endsLine")
            .attr("d", endsLine(data));
        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
//            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

    });
};
