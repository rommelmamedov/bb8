'use strict';

//  This gulpfile makes use of new JavaScript features.
//  Babel handles this without us having to do anything. It just works.

//  Required Modules
import del from 'del';
import gulp from 'gulp';
import sass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';
import plugins from 'gulp-load-plugins';

//  You can choose whether to use Dart Sass or Node Sass by setting the sass.compiler property.
//  You can read more about sass compilers here: https://www.npmjs.com/package/gulp-sass
sass.compiler = require('node-sass');

//  Global constants
const $ = plugins(),
  reload = browserSync.reload,
  paths = {
    app: {
      root: './app/',
      html: {
        main: './app/*.html',
        all: './app/**/*.html'
      },
      styles: {
        root: './app/sass/',
        main: './app/sass/main.scss',
        all: './app/sass/**/*.scss'
      },
      scripts: {
        main: './app/js/core.js',
        all: './app/js/**/*.js',
        libs: ['./app/js/lib/jquery.min.js']
      },
      images: {
        root: './app/img/',
        main: './app/img/**/*',
        svgIcons: './app/img/icons/*.svg',
        favicon: './app/credentials/favicon.png'
      },
      fonts: './app/fonts/**/*',
      credentials: {
        main: './app/credentials/',
        favicons: './app/credentials/favicons/'
      }
    },
    dist: {
      root: './dist/',
      js: './dist/js/',
      css: './dist/css/',
      img: {
        main: './dist/img/'
      },
      fonts: './dist/fonts/'
    }
  };

//  Removing production directory.
export const clear = () => {
  return del(paths.dist.root);
};

/**
 * Live reload and time-saving synchronized browser testing.
 * For more about options of BrowserSync: {@link https://browsersync.io/docs/api}
 **/
export const server = done => {
  browserSync.init({
    server: {
      baseDir: paths.dist.root
    },
    port: 2020,
    open: true,
    notify: false
//  https: true,
//  tunnel: true,
//  tunnel: 'BB8' //  Demonstration page: http://BB8.localtunnel.me
  });
  done();
};

//  Moving fonts to the production directory.
export const fonts = () => {
  return gulp
    .src(paths.app.fonts, { since: gulp.lastRun(fonts) })
    .pipe($.plumber())
    .pipe($.newer(paths.dist.fonts))
    .pipe(gulp.dest(paths.dist.fonts))
    .pipe($.size({ title: 'Font Size:' }))
    .pipe($.debug({ title: 'Font Files:' }))
    .on('end', reload);
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
    collapseGroups: true
  },
   webpOptions = {
    lossless: true,
    quality: 70,
    alphaQuality: 90
  };
  return (
    gulp
      .src(paths.app.images.main, { since: gulp.lastRun(img) })
      .pipe($.plumber())
      .pipe($.newer(paths.dist.img.main))
      .pipe(
        imagemin([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({ plugins: [svgOptions] })
        ])
      )
//    .pipe($.webp(webpOptions))  // (Optional) enable if you want to convert images to WebP format.
      .pipe(gulp.dest(paths.dist.img.main))
      .pipe($.size({ title: 'Image Size:' }))
      .pipe($.debug({ title: 'Image File:' }))
      .on('end', reload)
  );
};

/**
 * Generating favicons.
 * For more about options: {@link https://github.com/itgalaxy/favicons}
 **/
export const favicons = () => {
  const settings = {
      appName: 'BB8',
      appShortName: 'BB8',
      appDescription:
        'Starter kit for automating tasks in everyday front-end development.',
      developerName: 'Ramil Mamedov',
      dir: 'ltr',
      lang: 'en-US',
      background: '#fff',
      theme_color: '#fff',
      appleStatusBarStyle: 'black-translucent',
      icons: {
        android: true,
        windows: true,
        favicons: true,
        appleIcon: true,
        coast: false,
        yandex: false,
        firefox: false,
        appleStartup: false
      }
    },
    credentials = $.filter(['*.json', '*.ico', '*.xml'], {
      restore: true,
      passthrough: false
    }),
    stream = gulp
      .src(paths.app.images.favicon)
      .pipe($.plumber())
      .pipe($.newer(paths.app.credentials.favicons))
      .pipe($.favicons(settings))
      .pipe($.size({ title: 'Favicon Size:' }))
      .pipe($.debug({ title: 'Favicon Files:' }))
      // Filter a subset of the files
      .pipe(credentials)
      .pipe(gulp.dest(paths.app.credentials));

  // Use filtered files as a gulp file source
  credentials.restore.pipe(gulp.dest(paths.app.credentials.favicons));

  return stream;
};

/**
 * Creating SVG sprites.
 * For more about options: {@link https://github.com/jkphl/svg-sprite}
 **/
export const sprites = () => {
  const config = {
      dest: './',
      shape: {
        // Set maximum dimensions
        dimension: {
          maxWidth: 48,
          maxHeight: 48
        },
        // Add padding
        spacing: {
          padding: 10
        }
      },
      mode: {
        css: {
          dest: '.',
          sprite: 'sprite.svg',
          layout: 'vertical',
          bust: false,
          dimensions: true,
          render: {
            scss: true
          }
        }
      }
    },
    scss = $.filter(['*.scss'], {
      restore: true,
      passthrough: false
    }),
    stream = gulp
      .src(paths.app.images.svgIcons)
      .pipe($.plumber())
      .pipe($.svgSprite(config))
      .pipe($.size({ title: 'SVG Sprite Size:' }))
      .pipe($.debug({ title: 'SVG Sprite File:' }))
      // Filter a subset of the files
      .pipe(scss)
      .pipe(gulp.dest(paths.app.styles.root));

  // Use filtered files as a gulp file source
  scss.restore.pipe(gulp.dest(paths.app.images.root));

  return stream;
};

/**
 * Concatenation partials of HTML files and minify-beautify them by choice.
 * For more about used html here: {@link https://bit.ly/2XPqEin#html}
 **/
export const html = () => {
  return (
    gulp
      .src(paths.app.html.main)
      .pipe($.plumber())
      .pipe($.rigger())
      .pipe($.htmlBeautify({ indent_size: 2, preserve_newlines: false }))
//    .pipe($.htmlmin({ collapseWhitespace: true }))  // (Optional) enable if you want to minify html files for production.
      .pipe(gulp.dest(paths.dist.root))
      .pipe($.size({ title: 'HTML Size:' }))
      .pipe($.debug({ title: 'HTML File:' }))
      .on('end', reload)
  );
};

/**
 * Compiling SCSS, passing it through PostCSS plugins, cleaning unnecessary CSS parts, minifying and renaming the final file.
 * For more about used css here: {@link https://bit.ly/2XPqEin#css}
 **/
export const css = () => {
  const styleLintSetting = {
      debug: true,
      reporters: [{ formatter: 'string', console: true }]
    },
    plugins = [
      require('autoprefixer')({ browsers: ['last 3 version'] }),
      require('css-mqpacker')({ sort: true }),
      require('cssnano')({ safe: true }),
      require('css-declaration-sorter')({ order: 'smacss' })
    ];
  return (
    gulp
      .src(paths.app.styles.main)
      .pipe($.plumber())
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe($.purifycss([paths.app.scripts.main, paths.app.html.all])) // (Optional) disable if you don't want to cut unused CSS.
      .pipe($.postcss(plugins)) // (Optional) disable if you don't want to use PostCSS plugins.
      .pipe($.csso())
      .pipe($.rename({ suffix: '.min' }))
      .pipe(gulp.dest(paths.dist.css))
//    .pipe($.stylelint(styleLintSetting)) // (Optional) enable if you need to lint final CSS file.
      .pipe($.size({ title: 'CSS Size:' }))
      .pipe($.debug({ title: 'CSS File:' }))
      .on('end', reload)
  );
};

/**
 * Compiling core script file with Babel.
 * For more about used css here: {@link https://bit.ly/2XPqEin#js}
 **/
export const js = () => {
  return (
    gulp
      .src(paths.app.scripts.main)
      .pipe($.plumber())
      .pipe($.babel({ presets: ['@babel/preset-env'] }))
      .pipe(gulp.dest(paths.dist.js))
  //  .pipe($.eslint({ configFile: '.eslintrc.json' }))  // (Optional) enable if you need to lint core JS file.
  //  .pipe($.eslint.format())  // (Optional) enable if you need to lint core JS file.
      .pipe($.size({ title: 'JS Size:' }))
      .pipe($.debug({ title: 'JS Files:' }))
      .on('end', reload)
  );
};

//  Concatenating JavaScript libraries & minifying the final file.
export const jsLibs = () => {
  return gulp
    .src(paths.app.scripts.libs)
    .pipe($.plumber())
    .pipe($.uglify()) // (Optional) disable if you don't want to minify-uglify JS vendors.
    .pipe($.concat('vendors.min.js'))
    .pipe(gulp.dest(paths.dist.js))
    .pipe($.size({ title: 'JS Libs Size:' }))
    .pipe($.debug({ title: 'JS Libs Files:' }))
    .on('end', reload);
};

//  Watching HTML, CSS, JS & media files for changes.
export const watchFiles = () => {
  gulp.watch(paths.app.images.main, img);
  gulp.watch(paths.app.styles.all, css);
  gulp.watch(paths.app.scripts.all, javascript);
  gulp.watch(paths.app.html.all, html);
};

//  Export Complex Tasks
export const javascript = gulp.series(jsLibs, js);
export const watch = gulp.parallel(watchFiles, server);
export const main = gulp.parallel(css, img, fonts, html, javascript);
export const build = gulp.series(clear, main);
export const dev = gulp.series(main, watch);
exports.default = dev;
