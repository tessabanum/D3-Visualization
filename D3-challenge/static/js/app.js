/*
* Sources: http://bl.ocks.org/weiglemc/6185069 (Scatter graph example),
* https://observablehq.com/@d3/scatterplot
* */
$(document).ready(function(){

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    // setup x
    var xValue = function(d) { return d.poverty;}, // data -> value
        xScale = d3.scaleLinear().range([0, width]), // value -> display
        xMap = function(d) { return xScale(xValue(d));}, // data -> display
        xAxis = d3.axisBottom(xScale);

    // setup y
    var yValue = function(d) { return d.healthcare;}, // data -> value
        yScale = d3.scaleLinear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.axisLeft(yScale);

    // setup fill color
    var cValue = function(d) { return d.state;},
        color = d3.scaleOrdinal(d3.schemeCategory10);

    // add the graph canvas to the body of the webpage
    var svg = d3.select("#scatter")
        .append("svg").attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // add the tooltip area to the webpage
    // var tooltip = d3.select("#scatter").append("div")
    //     .attr("class", "tooltip")
    //     .style("opacity", 0);


    d3.csv("assets/data.csv").then(function(data){
        data.forEach(function(d){
            // change string (from CSV) into number format
            d.healthcare = +d.healthcare;
            d.poverty = +d.poverty;
        });

        // don't want dots overlapping axis, so add in buffer to data domain
        xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
        yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

        // x-axis
        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .append("text")
          .attr("class", "label")
          .attr("x", width/2)
          .attr("y", 28)
          .attr("stroke", "black")
          .style("text-anchor", "middle")
          .text("In Poverty (%)");

        // y-axis
        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", -35)
          .attr("x", 0 - height/2)
          .attr("dy", "1em")
          .attr("stroke", "black")
          .style("text-anchor", "middle")
          .text("Lacks Healthcare (%)");

        // get circle
        var circles = svg.selectAll(".dot").data(data).enter();

        circles.append("circle")
              .attr("class", "dot")
              .attr("r", 8)
              .attr("cx", xMap)
              .attr("cy", yMap)
              //.style("fill", function(d) { return color(cValue(d))});
              .style("fill", "lightblue");


        circles.append("text").text(function(d){
                 return d.abbr;
        }).attr("font-size", 7)
            .attr("stroke", "#fff")
            .attr("class", "stateText")
            .attr("x", xMap)
            .attr("y", yMap)
            .style("text-anchor", "middle")

    });

});