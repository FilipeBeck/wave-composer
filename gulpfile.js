const gulp = require('gulp')
const { build } = require('pipe-builder')
const typescript = require('gulp-typescript')
const sass = require('gulp-sass')

const ts = typescript.createProject('tsconfig.json')


gulp.task('default', () => {
	return build([{
		src: ['./src/**/*.ts', './src/**/*.tsx'],
		dest: './app',
		tasks: {
			'typescript': s => s.pipe(ts())
		}
	}, {
		src: './src/**/*.scss',
		dest: './app',
		tasks: {
			'sass': s => s.pipe(sass()).on('error', sass.logError)
		}
	}, {
		src: './src/index.html',
		dest: './app',
		tasks: {
			'index.html': null
		}
	}])
})