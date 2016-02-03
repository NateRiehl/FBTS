// var interval = setInterval(function () { checkEvents(); }, 15000); //checks events every two minutes

    function checkEvents() {
        //Get current time
        var timeNow = moment().format();
        //Cycle through events
        composition.Schedule.elements.forEach(function(event) {
            var diff = moment.utc(event.Time).diff(timeNow);

            if (diff <= 0) { //Call notify function if event is occurring
                notify(event);
            }
        });
    }

    function notify(event) {
        //Push event notification to phone
        if (device && device.platform === "browser") {
            addEventBeacon(event);
        }
        else {
            navigator.notification.alert(
                event.Description,
                addEventBeacon(event),
                "Event Happening Soon!",
                "Ok");
        }
    }

    function addEventBeacon(event) {
    var beacon = L.marker([42.572715, -70.771641]).addTo(map);
    beacon.bindPopup("Event!").openPopup();
    L.edgeMarker({
        icon: L.icon({ // style markers
            iconUrl: 'img/edge-arrow-marker.png',
            clickable: true,
            iconSize: [48, 48],
            iconAnchor: [24, 24]
        }),
        rotateIcons: true, // rotate EdgeMarkers depending on their relative position
        layerGroup: L.layerGroup([beacon]) // you can specify a certain L.layerGroup to create the edge markers from.
    }).addTo(map);

}