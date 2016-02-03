function loadLayer(layername, composition) {
  // var goToBooth;
  var promise = new Promise(function(resolve, reject) {
    try {

      var commuterRailLayer = L.geoJson(commuterRailJSON, {
        style: {
          "stroke": true,
          weight: 2,
          color: "#333",
          dashArray: [10, 4],
          "fill": false
        }
      }).addTo(map);


      var layer = L.geoJson(boothJSON, {
        style: function() {
          return {
            "fillColor": "#000",
            "fillOpacity": 0.35,
            "fill": true,
            "stroke": true,
            "color": "#000",
            "opacity": 1,
            "weight": 1,
            "dashArray": [3, 2]
          }
        },
        onEachFeature: onEachFeature
      }).addTo(map);


      function onEachFeature(feature, layer) {
        var ourStore = _.filter(composition.vendors.elements, {
          "Booth": feature.properties.name
        })[0];
    // //    if (ourStore) {
    //       //  console.log([layer._latlngs[0].lat, layer._latlngs[0].lng]);
    //       L.marker([layer.getBounds().getCenter().lat,layer.getBounds().getCenter().lng], {
    //         opacity: 0.01
    //       }).bindLabel(feature.properties.name, {
    //         noHide: true
    //       }).addTo(composition.map);
    // //   }
        if (localStorage.getItem(feature.properties.name) != null) {
          layer.setStyle({
            fillColor: "red",
            fillOpacity: .99
          });
        }

        if (ourStore) {
          if (!navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            layer.bindLabel(feature.properties.name + ": " + ourStore["Company"], {
              noHide: true
            }).addTo(map);
          }
          layer.bindPopup('<strong>' + "Store: " + '</strong>' + ourStore["Company"] + "<br>" + '<strong>' + "Owner: " + '</strong>' + ourStore["First"] + " " + ourStore["Last"] + "<br>" + '<strong>' + "Type: " + '</strong>' + ourStore["Type of Vendor"]);
        }
        else {
          layer.bindLabel(feature.properties.name, {
            noHide: true
          }).addTo(map);
          layer.setStyle({
            opacity: 0
          });
        }
      }

      highlightBooth = function(boothName) {
        layer.eachLayer(function(feature) {
          if (feature.feature.properties.name === boothName) {
            if (feature.options.fillColor == "red") {
              feature.setStyle({
                fillColor: "grey",
                fillOpacity: .99
              });
              localStorage.removeItem(boothName);
              $("[data-booth='" + boothName + "']").text("Highlight Booth on Map");
            }
            else {
              feature.setStyle({
                fillColor: "red",
                fillOpacity: .99
              });
              localStorage.setItem(boothName, boothName);
              $("[data-booth='" + boothName + "']").text("Remove Highlight");
            }
          }
        });
      };
      goToBooth = function(boothName) {
        if (navigator.userAgent.match(/iPhone|Android|iPod/i)) {
          var icon = $('.mdl-navigation').find(".material-icons");
          icon.text("dashboard");
          $('main.active')
            .fadeToggle(500)
            .css("pointer-events", "none");
        }
        layer.eachLayer(function(feature) {
          if (feature.feature.properties.name === boothName) {
            var ourBooth = _.filter(composition.vendors.elements, {
              "Booth": feature.feature.properties.name
            })[0];
            map.fitBounds(feature.getBounds());

            var lat = feature._latlngs[0].lat;
            var lng = feature._latlngs[0].lng;
            var popup = L.popup()
              .setLatLng([lat, lng])
              .setContent('<strong>' + "Store: " + '</strong>' + ourBooth["Company"] + "<br>" + '<strong>' + "Owner: " + '</strong>' + ourBooth["First"] + " " + ourBooth["Last"] + "<br>" + '<strong>' + "Type: " + '</strong>' + ourBooth["Type of Vendor"])
              .openOn(map);
            // L.control.sidebar('sidebar').close();
          }
          return false;
        });
      };

      resolve(composition);

      // omnivore.geojson('./kml/areas.json')
      //   .on('ready', function() {
      //     var areas = this;
      //     console.log(areas);

      // areaLayer.addTo(map);

      // var areaIDs = Object.keys(areas._layers);

      // var beacon = L.marker([42.572715, -70.771641]).addTo(map);
      //   beacon.bindPopup("Event happening here!").openPopup();
      //       L.edgeMarker({
      //         icon: L.icon({ // style markers
      //             iconUrl: 'img/edge-arrow-marker.png',
      //             clickable: true,
      //             iconSize: [48, 48],
      //             iconAnchor: [24, 24]
      //         }),
      //         rotateIcons: true, // rotate EdgeMarkers depending on their relative position
      //         layerGroup: L.layerGroup([beacon]) // you can specify a certain L.layerGroup to create the edge markers from.
      //       }).addTo(map);

      // areaIDs.forEach(function(areaID) {
      //   var area = areas._layers[areaID];
      //   area.setStyle({
      //     color: "green"
      //   });
      //   var areaData = area.feature;

      //   var lat = area._latlngs[0].lat;
      //   var lng = area._latlngs[0].lng;
      //   var areaMarker = new L.marker([lat, lng], {
      //     opacity: 0.01
      //   });
      //   areaMarker.bindLabel(areaData.properties.name, {
      //     noHide: true
      //   });
      //   areaMarker.addTo(map);

      //   area.on('click', function(e) {
      //     map.fitBounds(area.getBounds(), {
      //       paddingTopLeft: L.point(40, 0),
      //       paddingBottomRight: L.point(0, 0)
      //     });
      //   });
      // });

      // });
    }
    catch (e) {
      reject(e);
    }
  });

  return promise;
}


// var storeLayer = omnivore.kml('./kml/Stores.kml')
//     .on('ready', function() {
//         var stores = this;
//         var storeIDs = Object.keys(stores._layers);
//         storeIDs.forEach(function(storeID) {

//             var store = stores._layers[storeID];

//             store.bindLabel(store.feature.properties.name, {
//                 noHide: true,
//                 direction: 'auto'
//             });
//             var popup = L.popup({
//                 autoPanPaddingTopLeft: L.point(40, 0),
//                 autoPanPaddingBottomRight: L.point(0, 0)
//             });

//             store.on('click', function(e) {
//                 var storeData = e.target.feature;
//                 var ourStore = _.filter(composition.vendors.elements, {
//                     "Booth": storeData.properties.name
//                 })[0];
//                 popup
//                     .setLatLng(e.latlng)
//                     .setContent('<strong>' + "Store: " + '</strong>' + '<strong>' + ourStore["Company"] + '</strong>' + "<br>" + "Owner: " + ourStore["First"] + " " + ourStore["Last"] + "<br>" + "Type: " + '<strong>' + ourStore["Type of Vendor"] + '</strong>')
//                     .openOn(map);
//             });
//         });
//     });


// var boothLayer = omnivore.geojson('./kml/Booths.json');

// boothLayer.on('ready', function() {
//   var booths = this;
//   var boothIDs = Object.keys(booths._layers);
//   boothIDs.forEach(function(boothID) {

//     var booth = booths._layers[boothID];
//     var boothInfo = booth.feature;
//     var boothSearch = _.filter(composition.vendors.elements, {
//       "Booth": boothInfo.properties.name
//     });
//     booth.setStyle({
//       color: "green"
//     });
//     if (boothSearch.length) {
//       booth.setStyle({
//         color: "blue"
//       });
//     }

//     var popup = L.popup({
//       autoPanPaddingTopLeft: L.point(40, 0),
//       autoPanPaddingBottomRight: L.point(0, 0)
//     });

//     booth.on('click', function(e) {
//       var boothData = e.target.feature;
//       var ourBooth = _.filter(composition.vendors.elements, {
//         "Booth": boothData.properties.name
//       })[0];

//       if (boothSearch.length) {
//         popup
//           .setLatLng(e.latlng)
//           .setContent('<strong>' + "Business: " + '</strong>' + ourBooth["Company"] + "<br>" + '<strong>' + "Owner: " + '</strong>' + ourBooth["First"] + " " + ourBooth["Last"] + "<br>" + '<strong>' + "Type of Vendor: " + '</strong>' + ourBooth["Type of Vendor"])
//           .openOn(map);
//       }
//       else {
//         popup
//           .setLatLng(e.latlng)
//           .setContent("Booth " + boothData.properties.name + " has not been claimed! Are you an artist? Contact Mike Storella at m.storella@comcast.net for booking information")
//           .openOn(map);
//       }
//     });
//   });
// });


// map.on("zoomend", function() { //Called when a user zooms
//   if (map.getZoom() >= 18) {
//     //map.addLayer(boothLayer); //Adds booths when below a certain zoom level
//     // map.addLayer(storeLayer);
//     //map.removeLayer(areaLayer);
//     var boothIDs = Object.keys(boothLayer._layers);
//     boothIDs.forEach(function(boothID) {
//       var booth = boothLayer._layers[boothID];
//       var boothInfo = booth.feature;
//       booth.bindLabel(boothInfo.properties.name, {
//         noHide: true
//       }).addTo(map);
//     });
//   }

//   else {
//     map.addLayer(areaLayer); //Adds areas when above a certain zoom level
//     map.removeLayer(boothLayer);
//     layerVisible = false;
//     // map.removeLayer(storeLayer);
//   }
// });
