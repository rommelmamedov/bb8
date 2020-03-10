# BB8 - Starter Kit <img src="https://user-images.githubusercontent.com/38986496/54271996-20433180-459c-11e9-8ba1-198fa1147ef4.png" alt="BB8" width="38" height="38"/>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/RamilMamedo/bb8/pulls)
[![dependencies Status](https://david-dm.org/RamilMamedo/bb8/status.svg)](https://david-dm.org/RamilMamedo/bb8)
[![devDependencies Status](https://david-dm.org/RamilMamedo/bb8/dev-status.svg)](https://david-dm.org/RamilMamedo/bb8?type=dev)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/RamilMamedo/bb8/blob/master/LICENCE)


Starter kit for automating tasks in everyday front-end development. 👨🏻‍💻 ⚡️ 🛠  ✨ 🤖

## Installation ⬇️

**1.** Make sure you have a recent version of [node.js](https://nodejs.org/en/) installed.

**2.** Install  [yarn](https://yarnpkg.com/en/docs/install).

> Yarn is a new, modern dependency management tool for JavaScript. It caches every package it downloads so it never needs to download it again. The easiest way to install:

```bash
❯ $ npm install -g yarn
```

**3.** Clone repository either with SSH or with HTTPS.

```bash
❯ $ git clone git@github.com:RamilMamedo/bb8.git
❯ $ git clone https://github.com/RamilMamedo/bb8
```

**4.** Install [gulp](https://gulpjs.com/).

> Gulp is a toolkit for automating painful or time-consuming tasks in your development workflow, so you can stop messing around and build something. The easiest way to install:

```bash
❯ $ yarn global add gulp-cli
```

**5.** Go to the downloaded folder.

```bash
❯ $ cd bb8
```

**6.** To get start immediately.

```bash
❯ $ yarn start
```

> If you don’t want to install or configure tools, plugins or any other dependencies. So that you can focus on the code, just create a project, and you’re good to go.

## Development & Production 🚀

![Dev Mode](https://user-images.githubusercontent.com/38986496/54272233-aeb7b300-459c-11e9-8eeb-82c21ca5fb62.png)

> You can custom setup the project at any time and specify the dependencies that you need in the file **package.json**

**1.**  To install dependencies manually.

```bash
❯ $ yarn
```

**2.** To start development.

```bash
❯ $ yarn dev
```

> If you did everything correctly, it should open a browser with a local server on port **[2020](http://localhost:2020)** and a working **browser-sync**.

**3.** To finalize the project for production.

```bash
❯ $ yarn build
```

## Folder Structures 📂

The last command will create a directory called **`build`** inside the current folder.<br>
No configuration or complicated folder structure, just the ready files you need for production:

```
./build/
├── css
│   └── main.min.css
├── fonts
│   ├── Fontello
│   │   └── *.{eot,svg,ttf,woff,woff2}
│   └── StarJedi
│       └── *.{woff,woff2}
├── img
│   └── icons
│       └── *.svg
├── js
│   ├── core.js
│   └── vendors.min.js
├── index.html
├── robots.txt
└── service-worker.js
```
> 7 directories, 16 files

## Plugins 🔌

![Plugins](https://user-images.githubusercontent.com/38986496/54272234-aeb7b300-459c-11e9-9547-9633ec15e51c.png)

- [del](https://www.npmjs.com/package/del) — for deleting files and folders;
- [browser-sync](https://browsersync.io/docs/gulp) — time-saving synchronized browser testing and live webpage reload when making changes to your project files;
- [merge-stream](https://www.npmjs.com/package/merge-stream) — for merging multiple streams into one interleaved stream;
- [gulp-size](https://www.npmjs.com/package/gulp-size) — Logs out the total size of files in the stream and optionally the individual file-sizes;
- [gulp-newer](https://www.npmjs.com/package/gulp-newer) — for passing through only those source files that are newer than corresponding destination files;
- [gulp-debug](https://www.npmjs.com/package/gulp-debug) — debug Vinyl file streams to see what files are run through your Gulp pipeline;
- [gulp-rename](https://www.npmjs.com/package/gulp-rename) — for renaming files easily, adding suffixes and prefixes;
- [gulp-filter](https://www.npmjs.com/package/gulp-filter) — enables you to work on a subset of the original files by filtering them using glob patterns;
- [gulp-concat](https://www.npmjs.com/package/gulp-concat) — for concating files in the order that they are specified in the **gulp.src** function;
- [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) — prevent pipe breaking caused by errors from gulp plugins;
- [gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins) — loads gulp plugins from package dependencies and attaches them to an object of your choice;
- [gulp-batch-replace](https://www.npmjs.com/package/gulp-batch-replace) — for replacing a batch of strings in the stream;

#### HTML
- [gulp-nunjucks-render](https://www.npmjs.com/package/gulp-nunjucks-render) — is a build time HTML templating engine based on Python Django syntax;
- [gulp-htmllint](https://www.npmjs.com/package/gulp-htmllint) — linter for identifying and reporting on HTML code;
  - for more: [htmllint](https://github.com/htmllint/htmllint/);
- [gulp-htmlmin](https://www.npmjs.com/package/gulp-htmlmin) — for minifying HTML files;
- [gulp-html-beautify](https://www.npmjs.com/package/gulp-html-beautify) — for beautifying HTML files;
- [gulp-w3c-html-validator](https://www.npmjs.com/package/gulp-w3c-html-validator) — plugin to validate HTML using the [W3C Markup Validation Service](https://validator.w3.org/);


#### CSS
- [csso](https://www.npmjs.com/package/csso) —  CSS minifier, cleaner, compressor, and restructurer;
- [cssnano](https://www.npmjs.com/package/cssnano) — is a modern, modular compression tool written on top of the PostCSS ecosystem, which allows us to use a lot of powerful features in order to compact CSS appropriately;
- [gulp-sass](https://www.npmjs.com/package/gulp-sass) — SCSS to CSS compiler;
- [css-mqpacker](https://www.npmjs.com/package/css-mqpacker) — packing same CSS media query rules into one using PostCSS;
- [css-declaration-sorter](https://www.npmjs.com/package/css-declaration-sorter) — sorting CSS declarations based on their property names;
- [gulp-postcss](https://www.npmjs.com/package/gulp-postcss) — gulp plugin to pipe CSS through several plugins, but parse CSS only once;
  - for more: [postcss](https://github.com/postcss/postcss);
- [gulp-stylelint](https://www.npmjs.com/package/gulp-stylelint) — a mighty, modern linter that helps you avoid errors and enforce conventions in your styles;
  - for more: [stylelint](https://stylelint.io/);
- [gulp-purifycss](https://www.npmjs.com/package/gulp-purifycss) — for removing unused styles;
  - for more: [purifycss](https://github.com/purifycss/purifycss);
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) — automatically places vendor prefixes in CSS according to the [Can I Use](https://caniuse.com/) service;
  - for more: [autoprefixer](https://github.com/postcss/autoprefixer/);

#### JS
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) — for minifying JavaScript with UglifyJS3;
- [gulp-babel](https://www.npmjs.com/package/gulp-babel) — to support modern JS (ES6) in browsers;
  - for more: [babel](https://babeljs.io/);
- [gulp-eslint](https://www.npmjs.com/package/gulp-eslint) — identifying and reporting on patterns found in ECMAScript/JavaScript code;
  - for more: [eslint](https://eslint.org/);

#### IMG
- [gulp-webp](https://www.npmjs.com/package/gulp-webp) — converting images into a modern format WebP.
- [gulp-favicons](https://github.com/evilebottnawi/favicons) — favicons generator based on node.js;
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) — image compression PNG, JPG, GIF and SVG (including additional plugins for optimization);
  - for more: [imagemin](https://github.com/imagemin/imagemin);
- [gulp-svg-sprites](https://www.npmjs.com/package/gulp-svg-sprites) — for creating SVG sprites;


> Read more about image optimization here: [[imagemin-to-compress-images](https://web.dev/fast/use-imagemin-to-compress-images), [imagemin-plugins-difference](http://pointlessramblings.com/posts/pngquant_vs_pngcrush_vs_optipng_vs_pngnq)];
>
> Read more about webfont optimization here: [Web Font Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization);
>
> Simple [online tool](https://transfonter.org/) for generating CSS @font-face and transforming difference font formats;

## Browser Support :computer:

At present, BB8 supports the last two versions of the following browsers:

- Chrome
- Edge
- Firefox
- Safari
- Opera
- Internet Explorer

This doesn't mean that BB8 cannot be used in older browsers, just that it's focus ensure compatibility with the ones mentioned above.

## Contributing & Troubleshooting :bug:

Contributions, questions, and comments are all welcome and encouraged.

If you find yourself running into issues during installation or running the tools, please open an issue. BB8 would be happy to discuss how they can be solved.

- [Bug Reports](https://github.com/RamilMamedo/bb8/issues)
- [Pull Requests](https://github.com/RamilMamedo/bb8/pulls)

## License :scroll:

The code is available under the [MIT license](https://github.com/RamilMamedo/bb8/blob/master/LICENCE) Copyright © 2019.
