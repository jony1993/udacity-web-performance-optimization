'use strict'

var ngrok = require('ngrok');

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/js/perfmatters.js',
                dest: 'dist/js/perfmatters.min.js'
            }
        },
        cssmin: {
            target: {
                files: [{ //Main CSS Files
                    expand: true,
                    cwd: 'src/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }, { //Main CSS Files
                    expand: true,
                    cwd: 'src/views/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/views/css',
                    ext: '.min.css'
                }]
            }
        },
        image_resize: {
            resize: {
                options: {
                    width: 100,
                    height: 100,
                    overwrite: true
                },
                files: {
                    'src/views/images/pizzeria.jpg': 'src/views/images/pizzeria.jpg'
                }
            }
        },
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    // Set to true to enable the following options…
                    expand: true,
                    // cwd is 'current working directory'
                    cwd: 'src/img/',
                    src: ['**/*.png'],
                    // Could also match cwd line above. i.e. project-directory/img/
                    dest: 'dist/img/',
                    ext: '.png'
                }, {
                    // Set to true to enable the following options…
                    expand: true,
                    // cwd is 'current working directory'
                    cwd: 'src/views/images/',
                    src: ['**/*.png'],
                    // Could also match cwd line above. i.e. project-directory/img/
                    dest: 'dist/views/images/',
                    ext: '.png'
                }]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [{
                    // Set to true to enable the following options…
                    expand: true,
                    // cwd is 'current working directory'
                    cwd: 'src/img/',
                    src: ['**/*.jpg'],
                    // Could also match cwd. i.e. project-directory/img/
                    dest: 'dist/img/',
                    ext: '.jpg'
                }, {
                    // Set to true to enable the following options…
                    expand: true,
                    // cwd is 'current working directory'
                    cwd: 'src/views/images/',
                    src: ['**/*.jpg'],
                    // Could also match cwd. i.e. project-directory/img/
                    dest: 'dist/views/images/',
                    ext: '.jpg'
                }]
            }
        },
        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    'dist/index.html': 'src/index.html',
                    'dist/project-2048.html': 'src/project-2048.html',
                    'dist/project-mobile.html': 'src/project-mobile.html',
                    'dist/project-webperf.html': 'src/project-webperf.html',
                    'dist/views/pizza.html': 'src/views/pizza.html'
                }
            }
        },
        inline: {
        dist: {
            options:{
                cssmin: true,
                tag: ''
            },
            src: 'dist/*.html'
        }
    },
        pagespeed: {
            options: {
                nokey: true,
                locale: "en_GB",
                threshold: 40
            },
            local: {
                options: {
                    strategy: "desktop"
                }
            },
            mobile: {
                options: {
                    strategy: "mobile"
                }
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Load the plugin that provides the minify css task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //Load the plugin that provides the imagemin task.
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    //Image Rezie
    grunt.loadNpmTasks('grunt-image-resize');

    //Load the plugin that provides the html min task.
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    //Load the plugin for the pagespeed task
    grunt.loadNpmTasks('grunt-inline');

    //Load the plugin for the pagespeed task
    grunt.loadNpmTasks('grunt-pagespeed');

    // Register customer task for ngrok
    grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
        var done = this.async();
        var port = 8080;

        ngrok.connect(port, function(err, url) {
            if (err !== null) {
                grunt.fail.fatal(err);
                return done();
            }
            grunt.config.set('pagespeed.options.url', url);
            grunt.task.run('pagespeed');
            done();
        });
    });

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin', 'image_resize', 'imagemin', 'htmlmin', 'inline', 'psi-ngrok']);

};