import { src, dest } from 'gulp';
import plugins from 'gulp-load-plugins';

//  Global Constants
const $ = plugins();

const paths = {
  utils: './app/utils/',
  main: './app/utils/favicon.png',
  generated: './app/img/favicons/',
};

const settings = {
  appName: 'BB8',
  appShortName: 'BB8',
  appDescription: 'Starter pack for automating tasks in everyday front-end development. 🤖',
  dir: 'ltr',
  lang: 'en-US',
  background: '#fff',
  theme_color: '#fff',
  appleStatusBarStyle: 'black-translucent',
  start_url: '.',
  icons: {
    android: true,
    firefox: true,
    windows: true,
    favicons: true,
    appleIcon: true,
    coast: false,
    yandex: false,
    appleStartup: false,
  },
};

/**
 * Generating favicons.
 * For generating favicons and their associated files you need to run `gulp favicons` command in terminal.
 * Default input file source for favicon @file `./app/utils/favicon.png`.
 * Default output source for favicons icons @file `./app/img/favicon/`.
 * For more about options: {@link https://github.com/itgalaxy/favicons}
 **/
const favicons = () => {
  const replacePaths = [
      ['/android', './img/favicons/android'],
      ['/firefox', './img/favicons/firefox'],
      ['/mstile', './img/favicons/mstile'],
    ],
    utils = $.filter(['*', '!*.png'], {
      restore: true,
      passthrough: false,
    }),
    stream = src(paths.main)
      .pipe($.plumber())
      .pipe($.newer(paths.generated))
      .pipe($.favicons(settings))
      .pipe($.size({ title: 'Favicon Size:' }))
      .pipe($.debug({ title: 'Favicon Files:' }))
      // Filter a subset of the files
      .pipe(utils)
      .pipe($.batchReplace(replacePaths))
      .pipe(dest(paths.app.utils));

  // Use filtered files as a gulp file source
  utils.restore.pipe(dest(paths.generated));
  return stream;
};

export default favicons;
