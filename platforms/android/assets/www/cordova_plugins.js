cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "id": "cordova-plugin-console.logger",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "id": "cordova-plugin-console.console",
        "clobbers": [
            "console"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
        "id": "cordova-plugin-dialogs.notification_android",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-google-analytics/www/analytics.js",
        "id": "cordova-plugin-google-analytics.UniversalAnalytics",
        "clobbers": [
            "analytics"
        ]
    },
    {
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "id": "cordova-plugin-vibration.notification",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/org.apache.cordova.statusbar/www/statusbar.js",
        "id": "org.apache.cordova.statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "android.support.v4": "21.0.1",
    "com.google.playservices": "19.0.0",
    "cordova-plugin-console": "1.0.1",
    "cordova-plugin-device": "1.0.1",
    "cordova-plugin-dialogs": "1.1.2-dev",
    "cordova-plugin-geolocation": "1.0.0",
    "cordova-plugin-google-analytics": "0.7.1",
    "cordova-plugin-vibration": "1.2.1-dev",
    "cordova-plugin-whitelist": "1.0.0",
    "de.appplant.cordova.common.registerusernotificationsettings": "1.0.1",
    "org.apache.cordova.statusbar": "0.1.10"
}
// BOTTOM OF METADATA
});