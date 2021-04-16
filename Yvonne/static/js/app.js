
// BY PLOTLY
var artist_data = "../Resources/Clean_Artists.csv"

var form = d3.select("form");

var button = d3.select("#filter-btn");

var filteredData

var inputValue

var inputElement

form.on("submit",runEnter);

button.on("click", runEnter);




var artist = d3.csv(artist_data).then(function(data){
  console.log(data)

  data.forEach(function(data){
    data.acousticness = +data.acousticness
    data.danceability = +data.danceability
    data.energy = +data.energy
    data.instrumentalness = +data.instrumentalness
    data.liveness = +data.liveness
    data.loudness = +data.loudness
    data.speechiness = +data.speechiness
    data.valence = +data.valence
    data.popularity = +data.popularity
    
  })
  artist = data
  return artist
  // inputValue = "Adrian Marcel"
  // console.log(inputValue)
  // filteredData = data.filter(d => d.artists == inputValue);
  // console.log(filteredData)
  // runEnter(data)

})
// console.log(artist)
function runEnter() {

  // Prevent the page from refreshing
  d3.event.preventDefault();
  
  // Select the input element and get the raw HTML node
  inputElement = d3.select("#artist-name");

  // Get the value property of the input element
  inputValue = inputElement.property("value");
  filteredData = artist.filter(d => d.artists == inputValue);
  console.log(filteredData[0].valence)
  
  // Print the value to the console
  // console.log(inputValue);
  
  // console.log(filteredData);
  // Clear out table
  // tbody.html("");
  
  // console.log(data)

  // filteredData.forEach((UFOSighting) => {
  //     var row = tbody.append("tr");
  //     Object.entries(UFOSighting).forEach(([key, value]) => {
  //       var cell = row.append("td");
  //       cell.text(value);
  //     });
  // });
  data = [{
    type: 'scatterpolar',
    r: [1, filteredData[0].danceability, filteredData[0].energy, filteredData[0].instrumentalness, filteredData[0].liveness, filteredData[0].speechiness, filteredData[0].valence, filteredData[0].acousticness],
    theta: ['Acousticness','Danceability','Energy', 'Instrumentalness', 'Liveness', 'Speechiness', 'Valence', 'Acousticness'],
    fill: 'toself'
  }]
  
  layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 1]
      }
    },
    showlegend: false
  }
  
  Plotly.newPlot("radar", data, layout)

}



// function update(value){
//   sample_index = sample_data.samples[value]

//   sample_values = sample_index.sample_values
//   otu_ids = sample_index.otu_ids
//   otu_ids_bar = sample_index.otu_ids.map(d => "OTU " + d)
//   otu_labels = sample_index.otu_labels
//   // otu_ids = otu_ids.toString();

//   sample_values.sort(function(a, b){
//     return parseFloat (b) - parseFloat(a)
// });

// data = sample_values.slice(0, 10);
// // Reverse the array due to Plotly's defaults
// data  = data.reverse();

// metavalue = sample_data.metadata[value]

// var meta = d3.selectAll("#sample-metadata");

// meta.html("");

// Object.entries(metavalue).forEach(([key, value])=>{
  
//   var demInfo = meta.append("div");
//   // meta.html(`<div class="panel-body">${key}: ${value}</div>`)
//   demInfo.text(`${key}: ${value}`)
// })
// // updateBar(value)
// }
// data = [{
//   type: 'scatterpolar',
//   r: [39, 28, 8, 7, 28, 39],
//   theta: ['A','B','C', 'D', 'E', 'A'],
//   fill: 'toself'
// }]

// layout = {
//   polar: {
//     radialaxis: {
//       visible: true,
//       range: [0, 50]
//     }
//   },
//   showlegend: false
// }

// Plotly.newPlot("myDiv", data, layout)
