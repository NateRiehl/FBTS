function initMap(composition) {

  var promise = new Promise(function(resolve, reject) {
    try {
      L.Icon.Default.imagePath = './img';

      map = new L.Map("map", {
        center: new L.LatLng(42.573727, -70.772177),
        zoom: 17,
        maxZoom: 19,
        zoomControl: false
      });
      var stamen = new L.StamenTileLayer('watercolor');
      map.addLayer(stamen);

      var osmb = new OSMBuildings(map).load();
      osmb.style({
        wallColor: 'rgba(43,37,30,.05)',
        roofColor: 'rgba(187,205,229,.05)',
        shadows: true
      });
      osmb.date(new Date());

      console.log(osmb);

      new L.Control.Zoom({
        position: 'topright'
      }).addTo(map);

      L.easyButton("fa-crosshairs", function() {
        navigator.geolocation.getCurrentPosition(function(loc) {
          map.setView(L.latLng(loc.coords.latitude, loc.coords.longitude));
        }, function() {}, {
          maximumAge: 3000,
          timeout: 5000,
          enableHighAccuracy: true
        });
      }, "Where am I?", map);

      // L.easyButton("fa-compass", function() {
      //   navigator.compass.getCurrentHeading(function(heading) {
      //     alert(heading)
      //   }, function() {}, {
      //     maximumAge: 3000,
      //     timeout: 5000,
      //     enableHighAccuracy: true
      //   });
      // }, "Where am I?", map);


      composition.map = map;
      resolve(composition);
    }
    catch (e) {
      reject(e);
    }
  });
  return promise;
}