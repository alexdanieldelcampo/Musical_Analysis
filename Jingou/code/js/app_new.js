var svgWidth = 660;
var svgHeight = 450;

var margin = {
    top: 20,
    right: 40,
    bottom: 50,
    left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


var chosenXAxis = "acousticness";
var chosenYAxis = "acousticness";


function xScale(data, chosenXAxis) {
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenXAxis]) ,
        d3.max(data, d => d[chosenXAxis])
      ])
      .range([0, width]);
  
    return xLinearScale;
}

function yScale(data, chosenYAxis) {
  var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[chosenYAxis]) ,
      d3.max(data, d => d[chosenYAxis]) 
      ])
      .range([height, 0]);

  return yLinearScale;
}

function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
}
  
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
  
    return yAxis;
}

function renderXCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));
  
    return circlesGroup;
}

function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d[chosenYAxis]));

  return circlesGroup;
}

function renderXCircleText(textCircles, newXScale, chosenXAxis) {

    textCircles.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[chosenXAxis]));
  
    return textCircles;
  }
  
function renderYCircleText(textCircles, newYScale, chosenYAxis) {
  
    textCircles.transition()
        .duration(1000)
        .attr("y", d => newYScale(d[chosenYAxis]));
  
    return textCircles;
}


function precise(x) {
  return Number.parseFloat(x).toPrecision(3);
}
/////////////////////////////////////////////////////////////////
d3.csv("code/data/top_51_genres.csv").then(function(data, err) {
    if (err) throw err;
  
    // parse data
    data.forEach(function(D) {
        D.energy = +D.energy;
        D.acousticness = +D.acousticness;
        D.loudness = +D.loudness;
        D.danceability = +D.danceability;
        D.instrumentalness = +D.instrumentalness;
        D.tempo = +D.tempo;
        D.liveness = +D.liveness;
        D.speechiness = +D.speechiness;
});

    var xLinearScale = xScale(data, chosenXAxis);
  
    // Create y 
    var yLinearScale = yScale(data, chosenYAxis);
  
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    // append y axis
    var yAxis = chartGroup.append("g")
      .classed("y-axis", true)
      .call(leftAxis);
    
    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 3)
    .classed("stateCircle", true);


    var textCircles = chartGroup.append("g")
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xLinearScale(d[chosenXAxis]))
    .attr("y", d => yLinearScale(d[chosenYAxis]))
    .classed("stateText", true)

    var xlabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);
  
    var XLabel = xlabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .classed("active", true)
    .text("Choose one factor you want to conpare :");

    //////////////////////////////////////////////////////////////
    
    d3.selectAll("#Xselect").on("change", updateX)
      
    function updateX(){
      // chosenXAxis = value;
      // xLinearScale = xScale(data, chosenXAxis);
      // xAxis = renderXAxes(xLinearScale, xAxis);
      
      var dropdownMenu = d3.select("#Xselect");
      chosenXAxis = dropdownMenu.property("value");

      circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis);
      textCircles = renderXCircleText(textCircles, xLinearScale, chosenXAxis);
      updateX(circlesGroup, textCircles, chosenXAxis)
    }



    d3.selectAll("#Yselect").on("change", updateY)

    function updateY(){
      var dropdownMenu = d3.select("#Yselect");
      chosenYAxis = dropdownMenu.property("value");
    }









 
  }).catch(function(error) {
    console.log(error);
  });
