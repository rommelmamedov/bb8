'use strict';

//  This gulpfile makes use of new JavaScript features.
//  Babel handles this without us having to do anything. It just works.

//  Required Modules
import del from 'del';
import merge from 'merge-stream';
import browserSync from 'browser-sync';
import plugins from 'gulp-load-plugins';
import { src, dest, watch, series, parallel, lastRun } from 'gulp';
// import validator from 'gulp-w3c-html-validator';

//  Global Constants
const $ = plugins(),
  reload = browserSync.reload,
  paths = {
    app: {
      root: './app/',
      html: {
        main: './app/html/',
        all: './app/html/pages/*.html',
      },
      styles: {
        root: './app/sass/',
        main: './app/sass/main.scss',
        all: './app/sass/**/*.scss',
      },
      scripts: {
        main: './app/js/core.js',
        all: './app/js/**/*.js',
        //  You can specify the path to JavaScript libs that you're going to use in this `libs` array,
        //  so gulp will concat and minifying them into the one final file.
        //  prettier-ignore
        libs: [
          './app/js/lib/jquery.min.js',
        ],
        jsonData: './app/js/*.json',
      },
      images: {
        root: './app/img/',
        main: './app/img/**/*',
        svgIcons: './app/img/icons/*.svg',
      },
      fonts: './app/fonts/**/*',
      utils: {
        root: './app/utils/',
        main: ['./app/utils/**/*', '!./app/utils/favicon.{svg,png,jpg,jpeg}'],
      },
      favicons: {
        main: './app/utils/favicon.png',
        generated: './app/img/favicons/',
      },
    },
    build: {
      root: './build/',
      js: './build/js/',
      img: './build/img/',
      css: './build/css/',
      fonts: './build/fonts/',
      utils: {
        main: './build/utils/',
        favicons: './build/img/favicons/',
      },
    },
  };

//  You can choose whether to use Dart Sass or Node Sass by setting the sass.compiler property.
//  You can read more about sass compilers here: https://www.npmjs.com/package/gulp-sass
$.sass().compiler = require('sass');

//  Removing the production directory.
export const clearBuild = () => del(paths.build.root);

//  Create docs directory for GitHub pages.
export const createDocsFolder = () => src('./build/**/*').pipe(dest('./docs/'));

//  Moving website's utils, credentials, fonts, and etc. to the production directory.
export const utils = () => {
  const credentials = src(paths.app.utils.main, { since: lastRun(utils) })
      .pipe($.plumber())
      .pipe(dest(paths.build.root))
      .pipe($.size({ title: 'Utils Size:' }))
      .pipe($.debug({ title: 'Utils Files:' })),
    fonts = src(paths.app.fonts, { since: lastRun(utils) })
      .pipe($.plumber())
      .pipe(dest(paths.build.fonts))
      .pipe($.size({ title: 'Font Size:' }))
      .pipe($.debug({ title: 'Font Files:' }))
      .on('end', reload);
  return merge(credentials, fonts);
};

/**
 * Generating favicons.
 * For generating favicons and their associated files you need to run `gulp favicons` command in terminal.
 * Default input file source for favicon @file `./app/utils/favicon.png`.
 * Default output source for favicons icons @file `./app/img/favicon/`.
 * For more about options: {@link https://github.com/itgalaxy/favicons}
 **/
export const favicons = () => {
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
    },
    replacePaths = [
      ['/android', './img/favicons/android'],
      ['/firefox', './img/favicons/firefox'],
      ['/mstile', './img/favicons/mstile'],
    ],
    utils = $.filter(['*', '!*.png'], {
      restore: true,
      passthrough: false,
    }),
    stream = src(paths.app.favicons.main)
      .pipe($.plumber())
      .pipe($.newer(paths.app.favicons.generated))
      .pipe($.favicons(settings))
      .pipe($.size({ title: 'Favicon Size:' }))
      .pipe($.debug({ title: 'Favicon Files:' }))
      // Filter a subset of the files
      .pipe(utils)
      .pipe($.batchReplace(replacePaths))
      .pipe(dest(paths.app.utils.root));

  // Use filtered files as a gulp file source
  utils.restore.pipe(dest(paths.app.favicons.generated));
  return stream;
};

/**
 * Creating SVG sprites.
 * For creating SVG sprites you need to run `gulp sprites` command in terminal.
 * Default input file source for SVG icons @file `./app/img/icons/*.svg`.
 * Default output source for created sprite files @file `./app/img/sprite.svg`, @file `./app/sass/sprite.scss`.
 * For more about options: {@link https://github.com/jkphl/svg-sprite}
 **/
export const sprites = () => {
  const config = {
      dest: './',
      shape: {
        // Set maximum dimensions
        dimension: {
          maxWidth: 48,
          maxHeight: 48,
        },
        // Add padding
        spacing: {
          padding: 10,
        },
      },
      mode: {
        css: {
          dest: '.',
          sprite: 'sprite.svg',
          layout: 'vertical',
          bust: false,
          dimensions: true,
          render: {
            scss: true,
          },
        },
      },
    },
    scss = $.filter(['*.scss'], {
      restore: true,
      passthrough: false,
    }),
    stream = src(paths.app.images.svgIcons)
      .pipe($.plumber())
      .pipe($.svgSprite(config))
      .pipe($.size({ title: 'SVG Sprite Size:' }))
      .pipe($.debug({ title: 'SVG Sprite File:' }))
      // Filter a subset of the files
      .pipe(scss)
      .pipe(dest(paths.app.styles.root));

  // Use filtered files as a gulp file source
  scss.restore.pipe(dest(paths.app.images.root));

  return stream;
};

/**
 * Live reload and time-saving synchronized browser testing.
 * For more about options of BrowserSync: {@link https://browsersync.io/docs/api}
 **/
export const server = (done) => {
  browserSync.init({
    server: { baseDir: paths.build.root },
    port: 2020,
    open: false,
    notify: false,
    //  https: true,
    //  tunnel: true,
    //  tunnel: 'BB8' //  Demonstration page: http://BB8.localtunnel.me
  });
  done();
};

/**
 * Optimizing images.
 * For more about used image plugins here: {@link https://bit.ly/2XPqEin#img}
 **/
export const img = () => {
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
    src(paths.app.images.main, { since: lastRun(img) })
      .pipe($.plumber())
      .pipe($.newer(paths.build.img))
      .pipe($.imagemin([$.imagemin.gifsicle({ interlaced: true }), $.imagemin.optipng({ optimizationLevel: 5 }), $.imagemin.svgo({ plugins: [svgOptions] })]))
      //  .pipe($.webp(webpOptions))  // (Optional) enable if you want to convert images to WebP format.
      .pipe(dest(paths.build.img))
      .pipe($.size({ title: 'Image Size:' }))
      .pipe($.debug({ title: 'Image File:' }))
  );
};

/**
 * Concatenation partials of HTML files and minify-beautify them by choice.
 * For more about used HTML here: {@link https://bit.ly/2XPqEin#html}
 **/
export const html = () => {
  return (
    src(paths.app.html.all)
      .pipe($.plumber())
      .pipe($.nunjucksRender({ path: [paths.app.html.main] }))
      // .pipe($.htmlBeautify({ indent_size: 2, preserve_newlines: false }))
      //  .pipe($.htmlmin({ collapseWhitespace: true }))  // (Optional) enable if you want to minify html files for production.
      //  .pipe($.htmllint()) // (Optional) enable if you need to lint your HTML files.
      //  .pipe(validator())  // (Optional) enable if you need to check the markup validity by W3C.
      //  .pipe(validator.reporter()) // (Optional) enable if you need to check the markup validity by W3C.
      .pipe(dest(paths.build.root))
      .pipe($.size({ title: 'HTML Size:' }))
      .pipe($.debug({ title: 'HTML File:' }))
      .on('end', reload)
  );
};

/**
 * Compiling SCSS, passing it through PostCSS plugins, cleaning unnecessary CSS parts, minifying and renaming the final file.
 * For more about used CSS here: {@link https://bit.ly/2XPqEin#css}
 **/
export const css = () => {
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
    src(paths.app.styles.main)
      .pipe($.plumber())
      .pipe($.sass({ outputStyle: 'compressed' }))
      // .pipe($.purifycss(purifyContent)) // (Optional) disable if you don't want to cut unused CSS.
      // .pipe($.postcss(plugins)) // (Optional) disable if you don't want to use PostCSS plugins.
      // .pipe($.csso())
      .pipe($.rename({ suffix: '.min' }))
      //  .pipe($.stylelint(styleLintSetting)) // (Optional) enable if you need to lint final CSS file.
      .pipe(dest(paths.build.css))
      .pipe($.size({ title: 'CSS Size:' }))
      .pipe($.debug({ title: 'CSS File:' }))
      .on('end', reload)
  );
};

/**
 * Compiling the main script file with Babel.
 * Concatenating JavaScript libraries & minifying the final file.
 * For more about used JS here: {@link https://bit.ly/2XPqEin#js}
 **/
export const js = () => {
  const main = src(paths.app.scripts.main)
      .pipe($.plumber())
      .pipe($.babel({ presets: ['@babel/preset-env'] }))
      .pipe(dest(paths.build.js))
      //  .pipe($.eslint({ configFile: '.eslintrc.json' }))  // (Optional) enable if you need to lint core JS file.
      //  .pipe($.eslint.format())  // (Optional) enable if you need to lint core JS file.
      .pipe($.size({ title: 'JS Size:' }))
      .pipe($.debug({ title: 'JS Files:' })),
    libs = src(paths.app.scripts.libs)
      .pipe($.plumber())
      // .pipe($.uglify()) // (Optional) disable if you don't want to minify-uglify JS vendors.
      .pipe($.concat('vendors.min.js'))
      .pipe(dest(paths.build.js))
      .pipe($.size({ title: 'JS Libs Size:' }))
      .pipe($.debug({ title: 'JS Libs Files:' }))
      .on('end', reload);
  return merge(main, libs);
};

//  Watching HTML, CSS, JS & media files for changes.
export const watchFiles = () => {
  watch(paths.app.images.main, img);
  watch(paths.app.styles.all, css);
  watch(paths.app.scripts.all, js);
  watch('./app/html/**/*', html);
};

//  Export Complex Tasks
export const credentials = series(favicons, utils, img);
export const main = parallel(img, utils, html, js, css);
export const watcher = parallel(watchFiles, server);
export const build = series(clearBuild, main);
export const dev = series(main, watcher);
exports.default = dev;
