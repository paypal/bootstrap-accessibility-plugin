module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n' ,

		jshint: {
			files: ['plugins/js/bootstrap-accessibility.js'],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		uglify: {
			options: {
				banner: '<%= banner %>',
				mangle: false
			},
			dist: {
				files: {
					'plugins/js/bootstrap-accessibility.min.js': 'plugins/js/bootstrap-accessibility.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('default', ['jshint', 'uglify']);
};