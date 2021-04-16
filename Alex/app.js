// Step 1: Set up our chart
//= ================================
var svgWidth = 800;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 50,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the donuts.csv file
// =================================




var chosenLeftyAxis = "acousticness"

var chosenRightyAxis = "danceability"


  // Step 5: Create Scales
  //= ============================================
//   var xTimeScale = d3.scaleTime()

function xScale(yearData){
var xTimeScale = d3.scaleLinear()
    .domain(d3.extent(yearData, d => d.year))
    .range([0, width]);

    return xTimeScale
}


function LeftyScale(yearData, chosenLeftyAxis){
  var yLinearScale1 = d3.scaleLinear()
    .domain([0, d3.max(yearData, d => d[chosenLeftyAxis])])
    .range([height, 0]);

    return yLinearScale1
}





function RightyScale(yearData, chosenRightyAxis){
  var yLinearScale2 = d3.scaleLinear()
    .domain([0, d3.max(yearData, d => d[chosenRightyAxis])])
    .range([height, 0]);

    return yLinearScale2
}

// function renderXAxis(newXScale, xAxis) {
//   var bottomAxis = d3.axisBottom(newXScale);

//   xAxis.transition()
//     .duration(1000)
//     .call(bottomAxis);

//   return xAxis;
// }

function renderLeftyAxis(yLinearScale1, LeftyAxis){
  var leftAxis = d3.axisLeft(yLinearScale1);

    LeftyAxis.transition()
      .duration(1000)
      .call(leftAxis)

      return LeftyAxis
}

function renderRightyAxis(rightAxis, RightyAxis){
  var rightAxis = chartGroup.append("g").call(rightAxis);

    RightyAxis.transition()
      .duration(1000)
      .call(rightAxis)

      return RightyAxis
  
}

function renderline1(line1, xTimeScale, yLinearScale1, chosenLeftyAxis){
var line1 = d3
.line()
.x(d => xTimeScale(d.year))
.y(d => yLinearScale1(d[chosenLeftyAxis]));

return line1
}

function renderline2(line2, xTimeScale, yLinearScale2, chosenRightyAxis){
var line2 = d3
.line()
.x(d => xTimeScale(d.year))
.y(d => yLinearScale2(d[chosenRightyAxis]));

return line2
}



function updateline1Path(LeftLine, line1){
// Append a path for line1
LeftLine.transition()
.duration(1000)
.attr("d", line1)
.classed("line green", true);

return LeftLine
}

function updateline2path(RightLine, line2){
// Append a path for line2
RightLine.transition()
.duration(1000)
.attr("d", line2)
.classed("line orange", true);

return RightLine
}








d3.csv("../Resources/archive/data_by_year.csv").then(function(yearData, err) {
  if (err) throw err;
  console.log(yearData)
  
  
  
    // Step 4: Parse the data
  // Format the data and convert to numerical and date values
  // =================================
  // Create a function to parse date and time


  var parseTime = d3.timeParse("%Y");

  // Format the data

  yearData.forEach(function(data) {
    data.year = parseTime(data.year).getFullYear()
    data.acousticness = +data.acousticness;
    data.danceability = +data.danceability;
  });




 var xTimeScale = xScale(yearData)
 var yLinearScale1 =  LeftyScale(yearData, chosenLeftyAxis)
 var yLinearScale2 = RightyScale(yearData, chosenRightyAxis)





  // Step 6: Create Axes
  // =============================================
//   var bottomAxis = d3.axisBottom(xTimeScale.tickFormat(d3.timeFormat("%d-%b"));)
  var bottomAxis = d3.axisBottom(xTimeScale).tickFormat(d3.format("d"))
 
//  function renderLeftyAxis(LeftyLinearScale, LeftyAxis) {
  var leftAxis = d3.axisLeft(yLinearScale1);
  // LeftyAxis.transition()
  //   .duration(1000)
  //   .call(bottomAxis);

  // return LeftyAxis;
  
 
  
  var rightAxis = d3.axisRight(yLinearScale2);


  // Step 7: Append the axes to the chartGroup
  // ==============================================
  // Add bottomAxis
  var xAxis = chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

  // Add leftAxis to the left side of the display
  var LeftyAxis = chartGroup.append("g").call(leftAxis);

  // Add rightAxis to the right side of the display
  var RightyAxis = chartGroup.append("g").attr("transform", `translate(${width}, 0)`).call(rightAxis);


  // Step 8: Set up two line generators and append two SVG paths
  // ==============================================
  // Line generators for each line
  var line1 = d3
    .line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale1(d.acousticness));

  var line2 = d3
    .line()
    .x(d => xTimeScale(d.year))
    .y(d => yLinearScale2(d.danceability));


  // Append a path for line1
  var LeftLine = chartGroup.append("path")
    .data([yearData])
    .attr("d", line1)
    .classed("line green", true);

  // Append a path for line2
  var RightLine = chartGroup.append("path")
    .data([yearData])
    .attr("d", line2)
    .classed("line orange", true);


 // creating x-axis labels for clicking
 var xlabelsGroup = chartGroup.append("g")
 .attr("transform", `translate(${width / 2}, ${height + 20})`);

 var YearLabel = xlabelsGroup.append("text")
   .attr("x", 0)
   .attr("y", 19)
   .attr("class", "axisText")
   .attr("value", "poverty") // value to grab for event listener
   .classed("active", true)
   .text("Year");

  //  var LeftylabelsGroup = chartGroup.append("g")
  //  .attr("transform", `translate(${0 - margin.left + 10}, ${height/2 -70})`);

  //  var Acousticness = LeftylabelsGroup.append("text")
  // //  .attr("transform", "rotate(-90)")
  //  .attr("x", 0)
  //  .attr("y", 0)
  //  .attr("dy", "1em")
  //  .attr("class", "axisText")
  //  .attr("value", "healthcare") // value to grab for event listener
  //  .classed("active", true)
  //  .text("Acousticness");

  //  var RightylabelsGroup = chartGroup.append("g")
  //  .attr("transform", `translate(${0 + width + 45}, ${height/2 - 70} )`);

  //  var Danceability = RightylabelsGroup.append("text")
  // //  .attr("transform", "rotate(-90)")
  //  .attr("x", 0)
  //  .attr("y", 0)
  //  .attr("dy", "1em")
  //  .attr("class", "axisText")
  //  .attr("value", "healthcare") // value to grab for event listener
  //  .classed("active", true)
  //  .text("Danceability");

  d3.selectAll("#selDataset1").on("change", updateLeftAxis);

  // This function is called when a dropdown menu item is selected
  function updateLeftAxis() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset1");
    // Assign the value of the dropdown menu option to a variable
    var value = dropdownMenu.property("value");

    var chosenLeftyAxis = value



    // var xTimeScale = xScale(yearData)
 var yLinearScale1 =  LeftyScale(yearData, chosenLeftyAxis)
//  var yLinearScale2 = RightyScale(yearData, chosenRightyAxis)
   




    var LeftyAxis = renderLeftyAxis(yLinearScale1, LeftyAxis);
    
   var line1 = renderline1(line1, xTimeScale, yLinearScale1, chosenLeftyAxis)

   var LeftLine = updateline1Path(LeftLine, line1)


    // Initialize x and y arrays
    
  }




}).catch(function(error) {
  console.log(error);
});
