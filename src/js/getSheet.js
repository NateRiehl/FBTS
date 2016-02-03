var getSheet = function(documentKey, composition) {
  var promise = new Promise(function(resolve, reject) {
        try {
            Tabletop.init({
                key: documentKey,
                callback: function(data, tabletop) {
                    console.log(data);
                    resolve(data);
                },
                simpleSheet: false
            });

        } catch(e) {
            reject(e);
        }
  });
  return promise;
}