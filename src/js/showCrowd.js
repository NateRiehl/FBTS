// Location Stuff

function showCrowd(composition) {
  var promise = new Promise(function(resolve, reject) {
    try {
      // TODO: Show notification if there is no location

      var dotLayer = L.layerGroup().addTo(composition.map);

      setInterval(function() {
        navigator.geolocation.getCurrentPosition(processLocation, function() {}, {
          maximumAge: 3000,
          timeout: 5000,
          enableHighAccuracy: true
        });
      }, 5000);

      function processLocation(loc) {
        $.post("http://endpoints-aphelionz.c9.io/crowd/fbts", {
            acc: loc.coords.accuracy,
            alt: loc.coords.altitude,
            altAcc: loc.coords.altitudeAccuracy,
            head: loc.coords.heading,
            speed: loc.coords.speed,
            ts: loc.timestamp,
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
            id: localStorage.getItem('uuid')
          })
          .done(function(data) {
            var uuid = localStorage.getItem('uuid');

            dotLayer.clearLayers();

            _.forOwn(data['fbts'], function(point) {
                dotLayer.addLayer(L.circle([point.lat, point.lng], 1, {
                    stroke: false,
                    fillColor: '#000',
                    fillOpacity: 1
                }));
            });
          });
      }

      resolve(composition);
    } catch (e) {
      reject(e);
    }
  });

  return promise;
}
