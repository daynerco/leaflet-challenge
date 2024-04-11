// Store  API endpoint as queryURL
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Use GET request to the query URL
d3.json(queryURL).then(function(data){
    // Once e get a response, send the data.features and data.features object to the createFeatures function.
    createFeatures(data.features);
  });