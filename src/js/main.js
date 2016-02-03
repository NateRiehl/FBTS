"use strict";

var sheetKey = "1-wNVqavssiuvCi_XpB8pDStihf7Icm1vuOO1O1PrJrA";
var goToBooth;
var highlightBooth;
document.addEventListener('deviceready', initialize, false);

function initialize(e) {
    if (device.platform !== 'browser') {
        window.analytics.startTrackerWithId('UA-65163500-2')
    }
    else {
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-65163500-1', 'auto');
        ga('send', 'pageview');
    }

    // if (device && device.platform !== "browser") {
    //     if (!localStorage.getItem('visited')) {
    //         window.location = "welcome.html";
    //     }
    // }

    var addAreaLayer = _.partial(loadLayer, "areas");
    var renderVendorList = _.partial(renderList, "vendors");
    var renderEventList = _.partial(renderList, "schedule");
    var renderSponsorsList = _.partial(renderList, "sponsors");
    getSheet(sheetKey)
        .then(initMap)
        .then(showCrowd)
        .then(addParkingLayer)
        .then(addAreaLayer)
        //.then(addCommuterRail)
        .then(renderVendorList)
        .then(renderEventList)
        .then(renderSponsorsList)
        .then(function(data) {
            console.log(data);
        }, function(err) {
            console.log(err), alert('Sorry, something seems to be wrong!');
        });
}