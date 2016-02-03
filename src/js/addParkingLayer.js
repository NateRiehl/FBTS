"use strict";
var openParkingIcon;

function addParkingLayer(composition) {
  var promise = new Promise(function(resolve, reject) {
    try {
      L.marker([42.575051, -70.771045], {
        opacity: 0.01
      }).bindLabel("Central Street", {
        noHide: true
      }).addTo(composition.map);
      L.marker([42.573591, -70.770231], {
        opacity: 0.01
      }).bindLabel("Beach Street", {
        noHide: true
      }).addTo(composition.map);
      // Icons
      var parkingIcon = L.icon({
        iconUrl: './img/parking.png',
        iconSize: [40, 40],
      });

      var mbtaIcon = L.icon({
        iconUrl: './img/MBTA.png',
        iconSize: [40, 40],
      });

      var musicIcon = L.icon({
        iconUrl: './img/music.png',
        iconSize: [45, 45],
      });

      var beerIcon = L.icon({
        iconUrl: './img/beer.png',
        iconSize: [30, 30],
      });

      var townParkingLatLng = L.latLng(42.574342, -70.772190);
      var townParkingMarker = L.marker(townParkingLatLng, {
        icon: parkingIcon,
        opacity: 0.75
      }).addTo(composition.map);


      // var mascoParkingLatLng = L.latLng(42.571720, -70.770568);
      // var mascoParkingMarker = L.marker(mascoParkingLatLng, {
      //   icon: parkingIcon,
      //   opacity: 0.75
      // }).addTo(composition.map);

      var mbtaMarker = L.marker([42.574089, -70.768929], {
        icon: mbtaIcon,
        opacity: 0.75
      }).addTo(composition.map);

      var musicLatLng = L.latLng([42.571971, -70.769783]);
      var musicMarker = L.marker(musicLatLng, {
        icon: musicIcon,
        opacity: 0.9
      }).addTo(composition.map);

      var beerLatLng = L.latLng([42.572449, -70.768957]);
      var beerMarker = L.marker(beerLatLng, {
        icon: beerIcon,
        opacity: 0.9
      }).addTo(composition.map);

      var townParkingLink = "http://maps.google.com/?q=42.574342,-70.772190";
      // var tappanParkingLink = "http://maps.apple.com/?q=42.572636, -70.768207";
      var mascoParkingLink = "https://www.google.com/maps/?q=42.571941,-70.77050317";

      if (device.platform === "android") {
        var townParkingLink = "geo:42.574342,-70.772190";
        //    var tappanParkingLink = "geo:42.572636, -70.768207";
      }
      if (device.platform === "iOS") {
        var townParkingLink = "http://maps.apple.com/?q=42.574342,-70.772190";
        //    var tappanParkingLink = "http://maps.apple.com/?q=42.572636, -70.768207";
      }

      townParkingMarker.bindPopup('<h5>Town Lot</h5> Small availability* <br> <a href="' + townParkingLink + '" target="_system">Get directions</a>' + '<h5> MERHS </h5>' + 'Parking is encouraged at Manchester Essex High School. There will be frequent shuttles to downtown' + '<br><br>' + '<a href="https://www.google.com/maps/place/Manchester+Essex+Regional+Middle+High+School/@42.5818757,-70.7657933,18z/data=!3m1!4b1!4m2!3m1!1s0x89e33d1e722487ff:0x70a63a30ff133965" target="_system">Get directions to MERHS</a>', {
        offset: L.point(0, -10)
      });
      // tappanParkingMarker.bindPopup('<h5>Tappan St</h5><a href="'+tappanParkingLink+'"  target="_system">Get directions</a>', {
      //   offset: L.point(0, -10)
      // });
      mbtaMarker.bindPopup('<h5>Manchester Station</h5><a href="http://www.mbta.com/schedules_and_maps/rail/lines/?route=NBRYROCK&direction=O&timing=S" target="_system">See Schedule</a>', {
        offset: L.point(0, -10)
      });
      musicMarker.bindPopup("<h5>Gazebo Music Stage</h5>", {
        offset: L.point(0, -10)
      });

      beerMarker.bindPopup("<h5>Beer Garden</h5>", {
        offset: L.point(0, -10)
      });


      openParkingIcon = function() {
        // var tappanpopup = L.popup()
        //   .setLatLng([42.572636, -70.768207])
        //   .setContent('<h5>Tappan St</h5><a href="' + tappanParkingLink + '"  target="_system">Get directions</a>')
        //   .openOn(map);
        if (navigator.userAgent.match(/iPhone|iPod/i)) {
           var icon = $('.mdl-navigation').find(".material-icons");
           icon.text("dashboard");
          $('main.active')
            .fadeToggle(500)
            .css("pointer-events", "none");
        }
        var townpopup = L.popup()
          .setLatLng([42.574342, -70.772190])
          .setContent('<h5>Town Lot</h5> Small availability* <br> <a href="' + townParkingLink + '" target="_system">Get directions</a>' + '<h5> MERHS </h5>' + 'Parking is encouraged at Manchester Essex High School. There will be frequent shuttles to downtown' + '<br><br>' + '<a href="https://www.google.com/maps/place/Manchester+Essex+Regional+Middle+High+School/@42.5818757,-70.7657933,18z/data=!3m1!4b1!4m2!3m1!1s0x89e33d1e722487ff:0x70a63a30ff133965" target="_system">Get directions to MERHS</a>')
          .openOn(map);
      }
      resolve(composition);
    }
    catch (e) {
      reject(e)
    }
  });

  return promise;
}