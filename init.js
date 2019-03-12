setTimeout(function() {
  console.log(`\n ----------------------------------------------------------------------------`);
  console.log(`\n | Success! 🤖\n`);
  console.log(` | Inside that directory, you can run several commands:\n`);
  console.log('\x1b[36m%s\x1b[0m', ' |  - yarn run dev');
  console.log('\x1b[36m%s\x1b[0m', ' |  - yarn run build');
  console.log('\x1b[36m%s\x1b[0m', ' |  - yarn run watch');
  process.stdout.write('\n | To start development: ');
  console.log('\x1b[36m%s\x1b[0m', 'yarn run dev');
  process.stdout.write('\n | To finalize the project for production: ');
  console.log('\x1b[36m%s\x1b[0m', 'yarn run build');
  process.stdout.write(
    '\n | To start server, watch files & rebuild them as they change: '
  );
  console.log('\x1b[36m%s\x1b[0m', 'yarn run watch');
  console.log('\n | Happy Coding! 🙃\n');
  console.log(` ----------------------------------------------------------------------------`);
}, 1000);
