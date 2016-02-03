function renderList(sheetKey, composition) {
  var promise = new Promise(function(resolve, reject) {
    composition[sheetKey].elements.forEach(function(sheet) {
      var HTML = '';

      switch (sheetKey) {

        case "vendors":
          HTML += '<div class="mdl-card mdl-shadow--4dp">';
          HTML += '<div class="mdl-card__title">';
          HTML += '<h2 class="mdl-card__title-text">' + sheet.Company +'</h2>';
          HTML += '</div>';
          HTML +='<div class ="mdl-card__supporting-text">';
          HTML += '<p>'+ '<strong>' + sheet["Type of Vendor"] + "</p>";
          // HTML += '<br>' + '<strong>' + "Owner: "+'</strong>' + sheet.First + " " +sheet.Last+'</p>';
          HTML += '<a href="#" onclick="goToBooth(\''+ sheet.Booth + '\');">Go to Booth</a><br>';
          HTML += '<a href="#" data-booth="'+sheet.Booth+'" onclick="highlightBooth(\''+ sheet.Booth + '\');">Highlight Booth on Map</a>';
          HTML += '</div>';
          // HTML += '<div class="mdl-card__menu">';
          // HTML += '<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">';
          // HTML += '<i class="material-icons">share</i>';
          // HTML += '</button>';
          HTML += '</div>';
          HTML += '</div>';
          break;
        case "schedule":
          HTML += '<img src=' + sheet.Image + ' />';
        default:
          break;
        case "sponsors":
         HTML += '<div class="mdl-card mdl-shadow--4dp demo-card-wide">';
   //    HTML += '<img src=' + sheet.Image + ' />';
         HTML += '<div class="mdl-card__title">';
         HTML += '<h2 class="mdl-card__title-text">' + sheet.Company + '</h2>';
         HTML += '</div>';
         HTML += '<div class ="mdl-card__supporting-text">';
         HTML += '<a href=' + sheet.Site + ' target="_blank">Go to Sponsor Site</a>';
         HTML += '</div>';
        // HTML += '<div class="mdl-card__menu">';
        // HTML += '<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">';
        // HTML += '<i class="material-icons">share</i>';
        // HTML += '</button>';
        // HTML += '</div>';
         HTML += '</div>';
      }

      $("#" + sheetKey).append(HTML);
    });
    resolve(composition);
  });
  return promise;
}

