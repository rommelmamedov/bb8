import merge from 'merge-stream';
import plugins from 'gulp-load-plugins';
import { src, dest, lastRun } from 'gulp';
//
import { reload } from '../gulp/server';

//  Global Constants
const $ = plugins();
const paths = {
  src: ['./app/utils/**/*', '!./app/utils/favicon.{svg,png,jpg,jpeg}'],
  dest: './build/',
  src_fonts: './app/fonts/**/*',
  dest_fonts: './build/fonts/',
};

//  Moving website's utils, credentials, fonts, and etc. to the production directory.
export const utils = () => {
  const credentials = src(paths.src, { since: lastRun(utils) })
      .pipe($.plumber())
      .pipe(dest(paths.dest))
      .pipe($.size({ title: 'Utils Size:' }))
      .pipe($.debug({ title: 'Utils Files:' })),
    fonts = src(paths.src_fonts, { since: lastRun(utils) })
      .pipe($.plumber())
      .pipe(dest(paths.dest_fonts))
      .pipe($.size({ title: 'Font Size:' }))
      .pipe($.debug({ title: 'Font Files:' }))
      .on('end', reload);
  return merge(credentials, fonts);
};

export default utils;
