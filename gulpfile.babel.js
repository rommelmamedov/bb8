//  This gulpfile makes use of new JavaScript features.
//  Babel handles this without us having to do anything. It just works.

//  Required Modules
import del from 'del';
// import requireDir from 'require-dir';
import plugins from 'gulp-load-plugins';
import { watch, series, parallel } from 'gulp';
//  Gulp Tasks
import htmlTask from './gulp/html';
import utilsTask from './gulp/utils';
import serverTask from './gulp/server';
import imagesTask from './gulp/images';
import stylesTask from './gulp/styles';
import scriptsTask from './gulp/scripts';
import spritesTask from './gulp/sprites';
import faviconsTask from './gulp/favicons';

// requireDir('./gulp');

//  Global Constants
const $ = plugins();
const paths = {
  build_dest: './build/',
  images: './app/img/**/*',
  fonts: './app/fonts/**/*',
  scripts: './app/js/**/*.js',
  styles: './app/sass/**/*.scss',
};

//  You can choose whether to use Dart Sass or Node Sass by setting the sass.compiler property.
//  You can read more about sass compilers here: https://www.npmjs.com/package/gulp-sass
$.sass().compiler = require('sass');
//  Removing the production directory.
export const clearBuild = () => del(paths.build_dest);

//  Watching HTML, CSS, JS & media files for changes.
export const watchFiles = () => {
  watch(paths.images, images);
  watch(paths.styles, styles);
  watch(paths.scripts, scripts);
  watch('./app/html/**/*', html);
};

//  Export Complex Tasks
export const html = htmlTask;
export const utils = utilsTask;
export const server = serverTask;
export const images = imagesTask;
export const styles = stylesTask;
export const scripts = scriptsTask;
export const sprites = spritesTask;
export const favicons = faviconsTask;

export const credentials = series(favicons, utils, images);
export const main = parallel(images, utils, html, scripts, styles);
export const watcher = parallel(watchFiles, server);
export const build = series(clearBuild, main);
export const dev = series(main, watcher);

exports.default = dev;
