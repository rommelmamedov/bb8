import { src, dest } from 'gulp';
import merge from 'merge-stream';
import plugins from 'gulp-load-plugins';
//
import { reload } from '../gulp/server';

//  Global Constants
const $ = plugins();
const paths = {
  src: './app/js/core.js',
  dest: './build/js/',
  libs_src: ['./app/js/lib/jquery.min.js'],
};

/**
 * Compiling the main script file with Babel.
 * Concatenating JavaScript libraries & minifying the final file.
 * For more about used JS here: {@link https://bit.ly/2XPqEin#js}
 **/
const scripts = () => {
  const main = src(paths.src)
      .pipe($.plumber())
      .pipe($.babel({ presets: ['@babel/preset-env'] }))
      .pipe(dest(paths.dest))
      //  .pipe($.eslint({ configFile: '.eslintrc.json' }))  // (Optional) enable if you need to lint core JS file.
      //  .pipe($.eslint.format())  // (Optional) enable if you need to lint core JS file.
      .pipe($.size({ title: 'JS Size:' }))
      .pipe($.debug({ title: 'JS Files:' })),
    libs = src(paths.libs_src)
      .pipe($.plumber())
      // .pipe($.uglify()) // (Optional) disable if you don't want to minify-uglify JS vendors.
      .pipe($.concat('vendors.min.js'))
      .pipe(dest(paths.dest))
      .pipe($.size({ title: 'JS Libs Size:' }))
      .pipe($.debug({ title: 'JS Libs Files:' }))
      .on('end', reload);
  return merge(main, libs);
};

export default scripts;
