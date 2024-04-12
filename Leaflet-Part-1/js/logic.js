// store the API endpoint 
const link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// GET request to the query URL
d3.json(link, function(data) {
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3> Where: " + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<br><h2> Magnitude: " + feature.properties.mag + "</h2>");
  }

  // Create a GeoJSON layer with an array containing the features on the earthquakeData object
  function createCircleMarker(feature,latlng){
    let options = {
        radius:feature.properties.mag*5,
        fillColor: chooseColor(feature.properties.mag),
        color: chooseColor(feature.properties.mag),
        weight: 1,
        opacity: .8,
        fillOpacity: 0.35
    }
    return L.circleMarker(latlng, options);
}
  
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: createCircleMarker
  });
  
  // Send earthquakes layer to the createMap function
  createMap(earthquakes);
}

// Color circles based on mag
function chooseColor(mag) {
  switch(true) {
      case (1.0 <= mag && mag <= 2.5):
        return "#0071BC";
      case (2.5 <= mag && mag <= 4.0):
        return "#35BC00";
      case (4.0 <= mag && mag <= 5.5):
        return "#BCBC00";
      case (5.5 <= mag && mag <= 8.0):
        return "#BC3500";
      case (8.0 <= mag && mag <= 20.0):
        return "#BC0000";
      default:
        return "#E2FFAE";
  }
}

let legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend'),
        grades = [1.0, 2.5, 4.0, 5.5, 8.0],
        labels = [];

    // loop through density intervals
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + chooseColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

