import cheerio from "gulp-cheerio";
import replace from "gulp-replace";
import svgSprite from "gulp-svg-sprite";
import svgmin from "gulp-svgmin";

export const svgSprites = () => {
    return app.gulp
        .src(app.paths.srcSvg, { encoding: false })
        .pipe(
            svgmin({
                js2svg: {
                    pretty: true
                }
            })
        )
        .pipe(
            cheerio({
                run: function ($) {
                    // Заменяем fill на CSS переменные
                    $("[fill]").each(function () {
                        const fill = $(this).attr("fill");
                        if (fill && fill !== "none") {
                            $(this).attr("fill", "var(--icon-color, currentColor)");
                        }
                    });

                    $("[stroke]").each(function () {
                        const stroke = $(this).attr("stroke");
                        if (stroke && stroke !== "none") {
                            $(this).attr("stroke", "var(--icon-stroke, currentColor)");
                        }
                    });
                },
                parserOptions: {
                    xmlMode: true
                }
            })
        )
        .pipe(replace("&gt;", ">"))
        .pipe(
            svgSprite({
                mode: {
                    stack: {
                        sprite: "../sprite.svg"
                    }
                }
            })
        )
        .pipe(app.gulp.dest(app.paths.buildImgFolder));
};
