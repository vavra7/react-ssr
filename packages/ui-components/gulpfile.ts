const gulp = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');
const paths = new Map();

paths.set('scripts', ['src/**/*.{ts,tsx,js}', '!src/**/*.stories.{js,ts,jsx,tsx}']);
paths.set('styles', ['src/assets/styles/**/*.scss']);

/**
 * Compiles typescript to javascript
 */
gulp.task('compile-tsc', () =>
  gulp.src(paths.get('scripts')).pipe(tsProject()).pipe(gulp.dest('lib'))
);

/**
 * Moves scss to the lib folder
 * without compilation
 */
gulp.task('move-scss', () => gulp.src(paths.get('styles')).pipe(gulp.dest('lib/scss')));

/**
 * Compiles typescript and it is watching for changes
 */
gulp.task('compile-tsc-watch', () => {
  gulp.series('compile-tsc')();
  gulp.watch(paths.get('scripts'), gulp.series('compile-tsc'));
});

/**
 * Moves scss to the lib folder and it is watching for changes
 */
gulp.task('move-scss-watch', () => {
  gulp.series('move-scss')();
  gulp
    .watch(paths.get('styles'))
    .on('change', file =>
      gulp.src(file, { base: 'src/assets/styles' }).pipe(gulp.dest('lib/scss'))
    );
});

/**
 * Builds package
 */
gulp.task('build', async () => await gulp.parallel('compile-tsc', 'move-scss')());

/**
 * Watch for changes in package and builds
 */
gulp.task('start', async () => await gulp.parallel('compile-tsc-watch', 'move-scss-watch')());
