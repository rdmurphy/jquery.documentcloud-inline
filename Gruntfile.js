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
                    'dest/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js'
                }
            },
            full: {
                options: {
                    beautify: true,
                    compress: false,
                    mangle: false
                },
                files: {
                    'dest/<%= pkg.name %>.js': 'src/<%= pkg.name %>.js'
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
                    'dest/<%= pkg.name %>.min.css': 'src/<%= pkg.name %>.css'
                }
            }
        },
        copy: {
            css: {
                files: {
                    'dest/<%= pkg.name %>.css': 'src/<%= pkg.name %>.css'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jshint', 'csslint', 'uglify', 'cssmin', 'copy']);
};
