module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {// https://www.npmjs.org/package/grunt-contrib-jshint
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    L: true,
                    console: true
                }
            },
            files: 'leaflet.edgeMarker-raywalker.js'
        },
        uglify: {
            options: {
                banner: '/** <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.license %> License - <%= pkg.homepage %> */\n'
            },
            build: {
                src: 'leaflet.edgeMarker-raywalker.js',
                dest: 'leaflet.edgeMarker-raywalker.min.js'
            }
        },
        watch: {
            options: {
                spawn: false,
                reporter: require('jshint-stylish')
            },
            target: {
                files: 'leaflet.edgeMarker-raywalker.js',
                tasks: ['javascript']

            }
        }
    });

    // Javascript code quality assurance
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Javascript code quality assurance
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify']);

    grunt.registerTask('javascript', ['jshint', 'uglify']);

};