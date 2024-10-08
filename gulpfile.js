//###[ IMPORTS ]########################################################################################################

import fs from 'node:fs';
import yargs from 'yargs';
import log from 'fancy-log';
import {deleteAsync as del} from 'del';
import gulp from'gulp';
import rename from 'gulp-rename';
import shell from 'gulp-shell';

import sourcemaps from 'gulp-sourcemaps';
import connect from 'gulp-connect';
import * as dartSass from 'sass';
import nodeSass from 'node-sass';
import gulpSass from 'gulp-sass';
import stylus from 'gulp-stylus';



//###[ CONSTANTS ]######################################################################################################

const
	// keep DEBUG on false normally, to keep building production assets
	DEBUG = false,
	PACKAGE_CONFIG = JSON.parse(fs.readFileSync('./package.json', {encoding : 'utf-8'})),
	ARGV = yargs(process.argv).argv,

	SOURCE_DIR = './source',
	DOCS_DIR = './docs',
	EXAMPLES_DIR = `${DOCS_DIR}/examples`,
	DOCUMENTATION_DIR = `${DOCS_DIR}/documentation`,
	NODE_DIR = './node_modules',
	LIB_SOURCE_DIR = `${SOURCE_DIR}/lib`,

	SCSS_SOURCE_DIR = `${SOURCE_DIR}/scss`,
	SCSS_EXAMPLES_DIR = `${EXAMPLES_DIR}/scss`,
	SCSS_ENTRY = `${SCSS_EXAMPLES_DIR}/main.scss`,
	SCSS_SOURCES = [
		`${SCSS_SOURCE_DIR}/**/*.scss`,
		`${SCSS_EXAMPLES_DIR}/**/*.scss`,
	],
	SCSS_INCLUDES = [
		SCSS_SOURCE_DIR,
		LIB_SOURCE_DIR
	],
	SCSS_OUT_DIR = `${EXAMPLES_DIR}/css`,

	SCSS_LEGACY_SOURCE_DIR = `${SOURCE_DIR}/scss-legacy`,
	SCSS_LEGACY_EXAMPLES_DIR = `${EXAMPLES_DIR}/scss-legacy`,
	SCSS_LEGACY_ENTRY = `${SCSS_LEGACY_EXAMPLES_DIR}/main.scss`,
	SCSS_LEGACY_SOURCES = [
		`${SCSS_LEGACY_SOURCE_DIR}/**/*.scss`,
		`${SCSS_LEGACY_EXAMPLES_DIR}/**/*.scss`,
	],
	SCSS_LEGACY_INCLUDES = [
		SCSS_LEGACY_SOURCE_DIR,
		LIB_SOURCE_DIR
	],
	SCSS_LEGACY_OUT_DIR = `${EXAMPLES_DIR}/css`,

	STYLUS_SOURCE_DIR = `${SOURCE_DIR}/stylus`,
	STYLUS_EXAMPLES_DIR = `${EXAMPLES_DIR}/stylus`,
	STYLUS_ENTRY = `${STYLUS_EXAMPLES_DIR}/main.styl`,
	STYLUS_SOURCES = [
		`${STYLUS_SOURCE_DIR}/**/*.styl`,
		`${STYLUS_EXAMPLES_DIR}/**/*.styl`,
	],
	STYLUS_INCLUDES = [
		STYLUS_SOURCE_DIR,
		LIB_SOURCE_DIR
	],
	STYLUS_OUT_DIR = `${EXAMPLES_DIR}/css`
;



//###[ FUNCTIONS ]######################################################################################################

function compileNormalize(){
	return gulp.src(`${NODE_DIR}/@csstools/normalize.css/normalize.css`)
		.pipe(sourcemaps.init())
			.pipe(gulpSass(nodeSass)({
				outputStyle : 'compressed'
			})).on('error', function(err){
				log(err);
				this.emit('end');
			})
			.pipe(rename(function(path){
				path.basename = 'index';
				path.extname = '.css';
			}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(`${LIB_SOURCE_DIR}/normalize`))
	;
}



function compileScss(){
	return gulp.src(SCSS_ENTRY)
		.pipe(sourcemaps.init())
			.pipe(gulpSass(dartSass).sync({
				outputStyle : 'compressed',
				includePaths : SCSS_INCLUDES
			})).on('error', function(err){
				log(err);
				this.emit('end');
			})
			.pipe(rename(function(path){
				path.basename = 'scss';
				path.extname = '.css';
			}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(SCSS_OUT_DIR))
		;
}



function compileScssLegacy(){
	return gulp.src(SCSS_LEGACY_ENTRY)
		.pipe(sourcemaps.init())
			.pipe(gulpSass(nodeSass)({
				outputStyle : 'compressed',
				includePaths : SCSS_LEGACY_INCLUDES
			})).on('error', function(err){
				log(err);
				this.emit('end');
			})
			.pipe(rename(function(path){
				path.basename = 'scss-legacy';
				path.extname = '.css';
			}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(SCSS_LEGACY_OUT_DIR))
	;
}



function compileStylus(){
	return gulp.src(STYLUS_ENTRY)
		.pipe(sourcemaps.init())
			.pipe(stylus({
				compress : true,
				'include css' : true,
				include : STYLUS_INCLUDES,
			})).on('error', function(err){
				log(err);
				this.emit('end');
			})
			.pipe(rename(function(path){
				path.basename = 'stylus';
				path.extname = '.css';
			}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(STYLUS_OUT_DIR))
	;
}



function serveExamples(done){
	connect.server({
		https : true,
		host : '0.0.0.0',
		root : EXAMPLES_DIR,
		port : 3000,
		livereload : {
			port : 3001
		},
		/*middleware(connect, opt){
			return [
				serveStatic({
					path : DOCS_DIR,
					url : '/',
					// otherwise connect produces a content encoding error
					gzip : false
				})
			];
		}*/
	});

	done();
}



function reload(source){
	return gulp.src(source)
		.pipe(connect.reload())
	;
}



function clearDocumentation(){
	return del(`${DOCUMENTATION_DIR}/**/*`);
}



//###[ TASKS ]##########################################################################################################

gulp.task('watch', function(done){
	const watchConfig = {
		usePolling : true,
		interval : 1000,
		binaryInterval : 1000
	};

	gulp.watch(
		[...SCSS_SOURCES, ...SCSS_LEGACY_SOURCES],
		watchConfig,
		gulp.series(compileScss, compileScssLegacy, function reloadCss(){ return reload(`${EXAMPLES_DIR}/**/*.css`); })
	);

	gulp.watch(
		STYLUS_SOURCES,
		watchConfig,
		gulp.series(compileStylus, function reloadCss(){ return reload(`${EXAMPLES_DIR}/**/*.css`); })
	);

	gulp.watch(
		`${EXAMPLES_DIR}/index.html`,
		watchConfig,
		gulp.series(function reloadExamples(){ return reload(`${EXAMPLES_DIR}/index.html`); })
	);

	gulp.watch(
		`${EXAMPLES_DIR}/css/main.css`,
		watchConfig,
		gulp.series(function reloadExamples(){ return reload(`${EXAMPLES_DIR}/css/main.css`); })
	);

	done();
});

gulp.task('documentation-scss', shell.task('jsdoc -c jsdoc.config.scss.json --verbose'));
gulp.task('documentation-scss-legacy', shell.task('jsdoc -c jsdoc.config.scss-legacy.json --verbose'));
gulp.task('documentation-stylus', shell.task('jsdoc -c jsdoc.config.stylus.json --verbose'));
gulp.task('documentation', gulp.series(
	clearDocumentation,
	'documentation-scss',
	'documentation-scss-legacy',
	'documentation-stylus'
));

gulp.task('build', gulp.series(compileNormalize, compileScss, compileScssLegacy, compileStylus));

gulp.task('examples', gulp.series('build', serveExamples, 'watch'));

gulp.task('default', gulp.series('build'));
