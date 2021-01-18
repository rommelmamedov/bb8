import { src, dest } from 'gulp';
import plugins from 'gulp-load-plugins';
//
import { reload } from '../gulp/server';

//  Global Constants
const $ = plugins();
const paths = {
  src: './app/sass/main.scss',
  dest: './build/css/',
};

//  You can choose whether to use Dart Sass or Node Sass by setting the sass.compiler property.
//  You can read more about sass compilers here: https://www.npmjs.com/package/gulp-sass
$.sass().compiler = require('sass');

/**
 * Compiling SCSS, passing it through PostCSS plugins, cleaning unnecessary CSS parts, minifying and renaming the final file.
 * For more about used CSS here: {@link https://bit.ly/2XPqEin#css}
 **/
const styles = () => {
  const //  Files to search through for used classes (HTML, JS and etc., basically anything that uses CSS selectors).
    purifyContent = ['./build/js/*.js', './build/*.html'],
    styleLintSetting = {
      debug: true,
      reporters: [{ formatter: 'string', console: true }],
    },
    plugins = [
      require('autoprefixer')(),
      // require('css-mqpacker')({ sort: true }),
    ];
  return (
    src(paths.src)
      .pipe($.plumber())
      .pipe($.sass({ outputStyle: 'compressed' }))
      // .pipe($.purifycss(purifyContent)) // (Optional) disable if you don't want to cut unused CSS.
      // .pipe($.postcss(plugins)) // (Optional) disable if you don't want to use PostCSS plugins.
      // .pipe($.csso())
      .pipe($.rename({ suffix: '.min' }))
      //  .pipe($.stylelint(styleLintSetting)) // (Optional) enable if you need to lint final CSS file.
      .pipe(dest(paths.dest))
      .pipe($.size({ title: 'CSS Size:' }))
      .pipe($.debug({ title: 'CSS File:' }))
      .on('end', reload)
  );
};

export default styles;
