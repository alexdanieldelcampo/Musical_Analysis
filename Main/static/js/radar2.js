var form1 = d3.select("#form1");
var button1 = d3.select("#filter1-btn");

var filteredData1
var inputValue1
var inputElement1

form1.on("submit",runEnter1);

button1.on("click", runEnter1);

var base_url = "https://zmyd1nzqug.execute-api.us-west-1.amazonaws.com/dev/api/v1.0/data_by_artist_clean/"
var filteredData1 = []
var filteredData2 = []
function input1(inputValue1){
    
    d3.json(base_url+inputValue1).then(function(data){
        // console.log(data)
        filteredData1=data

        console.log(filteredData1)
        var name1 = d3.selectAll("#name1")
        name1.html("");
        var nameDiv = name1.append("div")
        nameDiv.text(filteredData1[0].artists)

        var artist_info = d3.selectAll("#artist1-info");
        artist_info.html("");
        // var artDiv = artist_info.append("div")
        // artDiv.text(`Artist Name: ${filteredData1[0].artists}`)
        var artDiv = artist_info.append("div")
        artDiv.text(`Song Count: ${filteredData1[0].count}`)
        var artDiv = artist_info.append("div")
        artDiv.text(`Popularity: ${filteredData1[0].popularity}`)
        var artDiv = artist_info.append("div")
        artDiv.text(`Avg Song Duration: ${filteredData1[0].duration_min} min`)
        var artDiv = artist_info.append("div")
        artDiv.text(`Avg Tempo: ${filteredData1[0].tempo} bpm`)
        console.log(filteredData1[0])

        if (inputValue2 == undefined){
            var name2 = d3.selectAll("#name2")
            name2.html("");
        
            var artist_info2 = d3.selectAll("#artist2-info");
            artist_info2.html("");
        
            data = [{
              type: 'scatterpolar',
              r: [filteredData1[0].acousticness, filteredData1[0].danceability, filteredData1[0].energy, filteredData1[0].instrumentalness, filteredData1[0].liveness, filteredData1[0].speechiness, filteredData1[0].valence, filteredData1[0].loudness_scale, filteredData1[0].acousticness],
              theta: ['Acousticness','Danceability','Energy', 'Instrumentalness', 'Liveness', 'Speechiness', 'Valence', 'Loudness', 'Acousticness'],
              fill: 'toself',
              fillOpacity: 0.02,
              name: filteredData1[0].artists,
              line: {
                color: 'red'
              }
            }]
            
            layout = {
              title: {
                text: filteredData1[0].artists,
                font: {
                  family: 'Arial',
                  size: 24
                }},
              polar: {
                radialaxis: {
                  visible: true,
                  range: [0, 1]
                }
              },
              showlegend: true
            }
            
            Plotly.newPlot("radar", data, layout)
          } else {
          var trace1 = {
            type: 'scatterpolar',
            r: [filteredData1[0].acousticness, filteredData1[0].danceability, filteredData1[0].energy, filteredData1[0].instrumentalness, filteredData1[0].liveness, filteredData1[0].speechiness, filteredData1[0].valence, filteredData1[0].loudness_scale, filteredData1[0].acousticness],
            theta: ['Acousticness','Danceability','Energy', 'Instrumentalness', 'Liveness', 'Speechiness', 'Valence', 'Loudness', 'Acousticness'],
            fill: 'toself',
            fillOpacity: 0.02,
            name: filteredData1[0].artists,
            line: {
              color: 'red'
            }
          }
          var trace2 = {
            type: 'scatterpolar',
            r: [filteredData2[0].acousticness, filteredData2[0].danceability, filteredData2[0].energy, filteredData2[0].instrumentalness, filteredData2[0].liveness, filteredData2[0].speechiness, filteredData2[0].valence, filteredData2[0].loudness_scale, filteredData2[0].acousticness],
            theta: ['Acousticness','Danceability','Energy', 'Instrumentalness', 'Liveness', 'Speechiness', 'Valence', 'Loudness', 'Acousticness'],
            fill: 'toself',
            fillOpacity: 0.02,
            name: filteredData2[0].artists,
            line: {
              color: 'blue'
            }
          }
          
          data = [trace1, trace2]
          
          layout = {
            title: {
              text: `${filteredData1[0].artists} vs ${filteredData2[0].artists} Comparison`,
              font: {
                family: 'Arial',
                size: 24
              }},
            polar: {
              radialaxis: {
                visible: true,
                range: [0, 1]
              }
            },
            showlegend: true
          }
          
          Plotly.newPlot("radar", data, layout)
        }

    })
}

function runEnter1(){
    d3.event.preventDefault();
    inputElement1 = d3.select("#artist1-name");

    // Get the value property of the input element
    inputValue = inputElement1.property("value");
    input1(inputValue);
    // console.log(artist1)
}


