import { src, dest } from 'gulp';
import plugins from 'gulp-load-plugins';

//  Global Constants
const $ = plugins();

const paths = {
  sass: './app/sass/',
  images: './app/img/',
  icons: './app/img/icons/*.svg',
};

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
};

/**
 * Creating SVG sprites.
 * For creating SVG sprites you need to run `gulp sprites` command in terminal.
 * Default input file source for SVG icons @file `./app/img/icons/*.svg`.
 * Default output source for created sprite files @file `./app/img/sprite.svg`, @file `./app/sass/sprite.scss`.
 * For more about options: {@link https://github.com/jkphl/svg-sprite}
 **/
const sprites = () => {
  const scss = $.filter(['*.scss'], { restore: true, passthrough: false }),
    stream = src(paths.icons)
      .pipe($.plumber())
      .pipe($.svgSprite(config))
      .pipe($.size({ title: 'SVG Sprite Size:' }))
      .pipe($.debug({ title: 'SVG Sprite File:' }))
      // Filter a subset of the files
      .pipe(scss)
      .pipe(dest(paths.sass));

  // Use filtered files as a gulp file source
  scss.restore.pipe(dest(paths.images));

  return stream;
};

export default sprites;
