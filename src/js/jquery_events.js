$("#countdown")
    .countdown("2015/08/01 10:00:00", function(event) {
        $(this).text(
            event.strftime('Aug 1, 10AM : %-D days %-H:%M:%S')
        );
    });

$('#mc-form').ajaxChimp({
    url: 'http://markroberthenderson.us7.list-manage.com/subscribe/post?u=3e662b3b4a2e577ec25141d1f&amp;id=4ba77ea67d'
});

$('[role="switch"]').on('click', function(e) {
    var targetRel = $(this).attr("href").substr(1);
    $('.active').removeClass('active');
    $('[rel="' + targetRel + '"]')
        .addClass('active');

    $('.active').each(function(e, f, b) {
        $(this).attr("style", "");
    });
    if ($('.mdl-layout__drawer.is-visible').length > 0) {
        $('.mdl-layout__obfuscator').click()
    }
});

$("#view-map").on('click', function() {
    var icon = $(this).find(".material-icons");

    switch (icon.text()) {
        case "explore":
            icon.text("dashboard");
            $('main.active')
                .fadeToggle(500)
                .css("pointer-events", "none");
            break;
        case "dashboard":
            icon.text("explore");
            $('main.active')
                .fadeToggle(500, function() {
                    $(this).attr("style", "");
                });
            break;
        default:
            break;
    }
})