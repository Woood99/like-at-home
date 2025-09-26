import { paths } from "./gulp/config/paths.js";
import { cacheTask } from "./gulp/tasks/cache.js";
import { clean } from "./gulp/tasks/clean.js";
import { htmlInclude } from "./gulp/tasks/html-include.js";
import { htmlMinify } from "./gulp/tasks/html-minify.js";
import { images } from "./gulp/tasks/images.js";
import { resources } from "./gulp/tasks/resources.js";
import { rewrite } from "./gulp/tasks/rewrite.js";
import { scriptsBackend } from "./gulp/tasks/scripts-backend.js";
import { scripts } from "./gulp/tasks/scripts.js";
import { svgSprites } from "./gulp/tasks/sprite.js";
import { stylesBackend } from "./gulp/tasks/styles-backend.js";
import { styles } from "./gulp/tasks/styles.js";
import { webpImages } from "./gulp/tasks/webp.js";
import { zipFiles } from "./gulp/tasks/zip.js";
import browserSync from "browser-sync";
import gulp from "gulp";

global.app = {
	gulp,
	isProd: process.argv.includes("--build"),
	paths
};

const watcher = () => {
	browserSync.init({
		server: {
			baseDir: `${app.paths.base.build}`
		},
		notify: false,
		port: 3000
	});

	gulp.watch(app.paths.srcScss, styles);
	gulp.watch(`${app.paths.base.src}/*.html`, styles);
	gulp.watch(`${app.paths.srcPartialsFolder}/**/*.html`, styles);

	gulp.watch(app.paths.srcFullJs, scripts);
	gulp.watch(`${app.paths.srcPartialsFolder}/**/*.html`, htmlInclude);
	gulp.watch(`${app.paths.base.src}/*.html`, htmlInclude);
	gulp.watch(`${app.paths.resourcesFolder}/**`, resources);
	gulp.watch(`${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`, images);
	gulp.watch(`${app.paths.srcImgFolder}/**/**.{jpg,jpeg,png}`, webpImages);
	gulp.watch(app.paths.srcSvg, svgSprites);
};

const dev = gulp.series(clean, htmlInclude, scripts, styles, resources, images, webpImages, svgSprites, watcher);
const backend = gulp.series(clean, htmlInclude, scriptsBackend, stylesBackend, resources, images, webpImages, svgSprites);
const build = gulp.series(clean, htmlInclude, scripts, styles, resources, images, webpImages, svgSprites);
const cache = gulp.series(cacheTask, rewrite);
const zip = zipFiles;

export { dev };
export { build };
export { backend };
export { cache };
export { zip };

gulp.task("default", dev);
