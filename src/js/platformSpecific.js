function platformSpecificTweaks(composition) {
    var promise = new Promise(function(resolve, reject) {
        try {

            if (device && device.platform != "browser") {
                map.fitBounds(this.getBounds(), {
                  paddingTopLeft: L.point(40, 0),
                  paddingBottomRight: L.point(0, 0)
                });
              }

            resolve(composition);
        } catch(e) {
            reject(e);
        }
    });

    return promise;
}