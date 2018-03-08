var map = L.map('map',{scrollWheelZoom: false}).setView([40.821102,-73.915128],13);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	// maxZoom:
  // 15
}).addTo(map);

var NQ = L.marker([40.821102,-73.915128]).bindPopup ('We Stay/ Nos Quedamos'). addTo(map);

//
const lookupIndustry = function(Industry) {
	console.log(Industry)
  switch(Industry) {
  case 'Secondhand Dealer - General':
    return {
      color: "#f4f455",
      description: 'Secondhand Dealer - General'
    }
    case 'Secondhand Dealer - Auto':
      return {
        color: "#f4f455",
        description: 'Secondhand Dealer - Auto'
      }
  case 'Cigarette Retail Dealer':
    return {
      color: "#f7d496",
      description: 'Cigarette Retail Dealer'
    }
  case 'Parking Lot':
    return {
      color: "#d36ff4",
      description: 'Parking Lot'
    }
  case 'Garage and Parking Lot':
      return {
        color: "#d36ff4f",
        description: 'Garage and Parking Lot'
      }
  case 'Home Improvement Contractor':
    return {
      color: "#f7cab",
      description: 'Home Improvement Contractor'
    }
  case 'Stoop Line Stand':
    return {
      color: "#ea6661",
      description: 'Stoop Line Stand'
    }
  case 'Laundry':
    return {
      color: "#dac0e8",
      description: 'Laundry'
    }
    case 'Laundries':
      return {
        color: "#dac0e8",
        description: 'Laundries'
      }
  case 'Electronic & Appliance Service':
    return {
      color: "#5CA2D1",
      description: 'Electronic & Appliance Service'
    }
case 'Electronics Store':
      return {
        color: "#5CA2D1",
        description: 'Electronics Store'
      }
  default:
    return {
      color: "black",
      description: 'Others'
    }
  }
}

// add geojson using jquery's $.getJSON()
$.getJSON('data/boundary.geojson', function(boundary) {
  L.geoJSON(boundary, {
    style: {
      dashArray: '3 10',
      color: '#000000',
      fillOpacity: 0,
    }
  }).addTo(map);
})

$.getJSON('data/dots.geojson', function(dots) {
	var dotsGeojson = L.geoJSON(dots,{
		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, {
        // Stroke properties
        color: '#cdcdcd',
        opacity: 0.75,
        weight: 1,

        // Fill properties
        fillColor: lookupIndustry(feature.properties.Industry).color,
        fillOpacity: 0.75,
        radius: 5
      });
		},
		onEachFeature: function(feature, layer) {
	   const description = lookupIndustry(feature.properties.Industry).description;

	   layer.bindPopup(`${feature.properties.BusinessName}<br/>${description}`, {
	     closeButton: false,
	     minWidth: 60,
	     offset: [0, -10]
	   });

	   layer.on('mouseover', function (e) {
	     this.openPopup();

	     e.target.setStyle({
	       weight: 3,
	       color: '#FFF',
	     });

	     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	         layer.bringToFront();
	     }
	   });
	   layer.on('mouseout', function (e) {
	     this.closePopup();
	     dotsGeojson.resetStyle(e.target);
		 })
	 }
	}).addTo(map);
})

//
// $.getJSON('data/dots.geojson', function(dots) {
//   L.geoJSON(dots, {
//     onEachFeature:function (feature, layer)
//     map.bindPopup(feature.properties.Industry);
//   },
//   pointToLayer: function (feature, Industry) {
//                             return L.circleMarker(Industry, {
//                                 // Stroke properties
//                                 color: '#5EA4D4',
//                                 opacity: 0.75,
//                                 weight: 2,
//
//                                 // Fill properties
//                                 fillColor: lookupIndustry (feature.properties.Industry).color,
//                                 fillOpacity: 0.25,
//                                 radius: 2
//       });
//     }
//     }).addTo(map);
//   })
    // onEachFeature: function(feature, layer) {
    //   const description = lookupIndustry(feature.properties.Industry).description;
    //
    //   layer.bindPopup(`${feature.properties.BusinessName}<br/>${description}`, {
    //     closeButton: false,
    //     minWidth: 60,
    //     offset: [0, -10]
    //   });
    //   layer.on('mouseover', function (e) {
    //     this.openPopup();
    //
    //     e.target.setStyle({
    //       weight: 3,
    //       color: '#FFF',
    //     });
    //
    //     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    //         layer.bringToFront();
    //     }
    //   });
    //   layer.on('mouseout', function (e) {
    //     this.closePopup();
    //     blocksGeojson.resetStyle(e.target);
