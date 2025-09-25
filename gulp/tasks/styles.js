import browserSync from "browser-sync";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import gulpif from "gulp-if";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import tailwindcss from "tailwindcss";

const sass = gulpSass(dartSass);

export const styles = () => {
	return app.gulp
		.src(app.paths.srcScss, { sourcemaps: !app.isProd })
		.pipe(
			plumber(
				notify.onError({
					title: "SCSS",
					message: "Error: <%= error.message %>"
				})
			)
		)
		.pipe(sass())
		.pipe(postcss([tailwindcss()]))
		.pipe(
			autoprefixer({
				cascade: false,
				grid: true,
				overrideBrowserslist: ["last 5 versions"]
			})
		)
		.pipe(
			gulpif(
				app.isProd,
				cleanCSS({
					level: 2
				})
			)
		)
		.pipe(app.gulp.dest(app.paths.buildCssFolder, { sourcemaps: "." }))
		.pipe(browserSync.stream());
};
