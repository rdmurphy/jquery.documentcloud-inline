module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js']
        },
        uglify: {
            options: {
                report: 'gzip'
            },
            minified: {
                files: {
                    'temp/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js'
                }
            },
            full: {
                options: {
                    beautify: true,
                    compress: false,
                    mangle: false
                },
                files: {
                    'temp/<%= pkg.name %>.js': 'src/<%= pkg.name %>.js'
                }
            }
        },
        csslint: {
            files: 'src/**/*.css'
        },
        cssmin: {
            options: {
                report: 'gzip'
            },
            minified: {
                files: {
                    'temp/<%= pkg.name %>.min.css': 'src/<%= pkg.name %>.css'
                }
            }
        },
        concat: {
            options: {
                banner: '/* <%= pkg.name %> - <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                process: {
                    data: {
                        version: '<%= pkg.version %>'
                    }
                }
            },
            js: {
                files: {
                    'dest/<%= pkg.name %>.js': 'temp/<%= pkg.name %>.js',
                    'dest/<%= pkg.name %>.min.js': 'temp/<%= pkg.name %>.min.js'
                }
            },
            css: {
                files: {
                    'dest/<%= pkg.name %>.css': 'src/<%= pkg.name %>.css',
                    'dest/<%= pkg.name %>.min.css': 'temp/<%= pkg.name %>.min.css'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['jshint', 'csslint', 'uglify', 'cssmin', 'concat']);
};
