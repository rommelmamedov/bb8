import browserSync from 'browser-sync';

//  Global Constants
export const reload = browserSync.reload;
const paths = { build_dest: './build/' };

/**
 * Live reload and time-saving synchronized browser testing.
 * For more about options of BrowserSync: {@link https://browsersync.io/docs/api}
 **/
const server = (done) => {
  browserSync.init({
    server: { baseDir: paths.build_dest },
    port: 2020,
    open: false,
    notify: false,
    //  https: true,
    //  tunnel: true,
    //  tunnel: 'BB8' //  Demonstration page: http://BB8.localtunnel.me
  });
  done();
};

export default server;
