import { src, dest } from 'gulp';
import plugins from 'gulp-load-plugins';
// import validator from 'gulp-w3c-html-validator';
//
import { reload } from '../gulp/server';

//  Global Constants
const $ = plugins();
const paths = {
  src: './app/html/pages/*.html',
  dest: './build/',
  scope: './app/html/',
};

/**
 * Concatenation partials of HTML files and minify-beautify them by choice.
 * For more about used HTML here: {@link https://bit.ly/2XPqEin#html}
 **/
function html() {
  return (
    src(paths.src)
      .pipe($.plumber())
      .pipe($.nunjucksRender({ path: [paths.scope] }))
      // .pipe($.htmlBeautify({ indent_size: 2, preserve_newlines: false }))
      //  .pipe($.htmlmin({ collapseWhitespace: true }))  // (Optional) enable if you want to minify html files for production.
      //  .pipe($.htmllint()) // (Optional) enable if you need to lint your HTML files.
      //  .pipe(validator())  // (Optional) enable if you need to check the markup validity by W3C.
      //  .pipe(validator.reporter()) // (Optional) enable if you need to check the markup validity by W3C.
      .pipe(dest(paths.dest))
      .pipe($.size({ title: 'HTML Size:' }))
      .pipe($.debug({ title: 'HTML File:' }))
      .on('end', reload)
  );
}

export default html;
