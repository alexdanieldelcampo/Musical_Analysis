var svgWidth = 990;
var svgHeight = 600;

var margin = {
  top:20,
  right: 90,
  bottom: 85,
  left: 120
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


var artist_data = "../Resources/Clean_Artists.csv"

var chart = RadarChart.chart();
var svg = d3.select('body').append('svg')
  .attr('width', 600)
  .attr('height', 800);

// draw one
svg.append('g').classed('focus', 1).datum(artist_data).call(chart);

// draw many radars
var game = svg.selectAll('g.game').artist_data(
  [
    data,
    data,
    data,
    data
  ]
);
game.enter().append('g').classed('game', 1);
game
  .attr('transform', function(d, i) { return 'translate(150,600)'; })
  .call(chart);
// d3.csv(artist_data).then(function(data){
//     console.log(data)
// })