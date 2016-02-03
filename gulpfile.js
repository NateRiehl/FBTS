var exec = require("child_process").exec,
    concat = require('gulp-concat'),
    csslint = require('gulp-csslint'),
    gulp = require('gulp'),
    htmlhint = require('gulp-htmlhint'),
    merge = require('merge-stream'),
    minifyHTML = require('gulp-minify-html'),
    minifyCSS = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    watch = require('gulp-watch');

gulp.task('files', function() {
    exec('rm -rf www');

    var fonts = gulp.src(fontFiles)
        .pipe(gulp.dest('www/fonts'));

    var html = gulp.src(['src/index.html'])
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter())
        .pipe(minifyHTML({
            conditionals: true
        }))
        .pipe(gulp.dest('www'));

    var images = gulp.src(['src/img/*', 'src/bower_components/leaflet/dist/images/*'])
        .pipe(gulp.dest('www/img'));

    var appCSS = gulp.src(appCSSFiles)
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('www/css'));

    var vendorCSS = gulp.src(vendorCSSFiles)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('www/css'));

    var appJS = gulp.src(jsAppFiles)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('www/js'));

    var libJS = gulp.src(jsLibFiles)
        .pipe(concat('libraries.js'))
        .pipe(gulp.dest('www/js'));

    var pluginJS = gulp.src(jsPluginFiles)
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('www/js'));

    return merge(appCSS, vendorCSS);
    //return merge(fonts, html, images, css, appJS, libJS, pluginJS);
});

gulp.task('buildBrowser', ['files'], function() {
    exec('cordova build browser');
});

gulp.task('watch', function() {
    var allFiles = [
        appCSSFiles, vendorCSSFiles, jsAppFiles, jsLibFiles, jsPluginFiles, fontFiles,
        'src/*.html', 'src/img/*'
    ];

    return gulp.watch(allFiles, ['files', 'buildBrowser']);
});

gulp.task('default', ['files', 'buildBrowser', 'watch']);


/************ File Manifest ********************/

var vendorCSSFiles = [
    "src/bower_components/leaflet/dist/leaflet.css",
    "src/bower_components/Leaflet.label/dist/leaflet.label.css",
    "src/bower_components/font-awesome/css/font-awesome.min.css",
    "src/css/vendor/leaflet-sidebar.css"
];

var appCSSFiles = [
    "src/css/style.css"
];

var jsLibFiles = [
    "src/bower_components/jquery/dist/jquery.min.js",
    "src/bower_components/leaflet/dist/leaflet.js",
    "src/bower_components/lodash/lodash.min.js",
    "src/bower_components/bluebird/js/browser/bluebird.min.js",
    "src/bower_components/tabletop/src/tabletop.js",
    "src/bower_components/moment/moment.js"
];

var jsPluginFiles = [
    "src/bower_components/ajaxchimp/jquery.ajaxchimp.min.js",
    "src/bower_components/jquery.countdown/dist/jquery.countdown.min.js",
    "src/bower_components/leaflet-omnivore/leaflet-omnivore.min.js",
    "src/bower_components/leaflet.markercluster/dist/leaflet.markercluster.js",
    "src/bower_components/Leaflet.label/dist/leaflet.label.js",
    "src/bower_components/bxslider-4/dist/jquery.bxslider.min.js",
    // "src/js/vendor/leaflet-sidebar.js",
    "src/js/vendor/leaflet-easyButton.js",
    "src/js/vendor/tile.stamen.js",
    "src/js/vendor/OSMBuildings.js"
]

var jsAppFiles = [
    "src/geojson/commuter_rail.js",
    "src/geojson/map.js",
    "src/js/guid.js",
    "src/js/jquery_events.js",
    "src/js/getSheet.js",
    "src/js/openSidebar.js",
    "src/js/renderList.js",
    "src/js/initMap.js",
    "src/js/showCrowd.js",
    "src/js/addParkingLayer.js",
    "src/js/loadGeoJSONLayer.js",
    "src/js/main.js"

];

var fontFiles = [
    'src/fonts/*',
    'src/bower_components/font-awesome/fonts/*'
];