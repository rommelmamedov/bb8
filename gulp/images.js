import { src, dest, lastRun } from 'gulp';
import plugins from 'gulp-load-plugins';

//  Global Constants
const $ = plugins();
const paths = {
  src: './app/img/**/*',
  dest: './build/img/',
};

/**
 * Optimizing images.
 * For more about used image plugins here: {@link https://bit.ly/2XPqEin#img}
 **/
const img = () => {
  const svgOptions = {
      removeViewBox: false,
      collapseGroups: true,
      removeComments: true,
      removeEmptyAttrs: true,
      removeEmptyText: true,
      removeUnusedNS: true,
    },
    webpOptions = {
      lossless: true,
      quality: 70,
      alphaQuality: 90,
    };
  return (
    src(paths.src, { since: lastRun(img) })
      .pipe($.plumber())
      .pipe($.newer(paths.dest))
      .pipe($.imagemin([$.imagemin.gifsicle({ interlaced: true }), $.imagemin.optipng({ optimizationLevel: 5 }), $.imagemin.svgo({ plugins: [svgOptions] })]))
      //  .pipe($.webp(webpOptions))  // (Optional) enable if you want to convert images to WebP format.
      .pipe(dest(paths.dest))
      .pipe($.size({ title: 'Image Size:' }))
      .pipe($.debug({ title: 'Image File:' }))
  );
};

export default img;
