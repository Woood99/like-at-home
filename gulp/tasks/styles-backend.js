import browserSync from "browser-sync";
import autoprefixer from "gulp-autoprefixer";
import notify from "gulp-notify";
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import tailwindcss from "tailwindcss";

const sass = gulpSass(dartSass);

export const stylesBackend = () => {
	return app.gulp
		.src(app.paths.srcScss)
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
		.pipe(app.gulp.dest(app.paths.buildCssFolder))
		.pipe(browserSync.stream());
};
