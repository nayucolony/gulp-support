// Plugin load
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const pug = require('gulp-pug')
const ejs = require('gulp-ejs')
const data = require('gulp-data')
const browserSync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')
const imageminPngquant = require('imagemin-pngquant')
const imageminMozjpeg = require('imagemin-mozjpeg')
const packageImporter = require('node-sass-package-importer')
const changed = require('gulp-changed')
const sourcemaps = require('gulp-sourcemaps')
const mqpacker = require('css-mqpacker')

// Setting
const path = {
  dist: './docs',
  distCSS: './docs/assets/styles',
  srcImg: 'src/images/**/*.{jpg,jpeg,png,gif,svg}',
  distImg: './docs/assets/images',
  distMedia: './docs/assets/medias'
}

const plumberOption = {
  errorHandler: notify.onError('<%= error.message %>')
}

const postcssOption = [autoprefixer({ grid: true }), mqpacker]

const sassOption = {
  importer: packageImporter({
    extensions: ['.scss', '.css']
  })
}

// Task
gulp.task('serve', (done) => {
  const browserSyncOption = {
    server: path.dist
  }
  browserSync.init(browserSyncOption)
  done()
})

gulp.task('img', () => {
  return gulp.src(path.srcImg)
    .pipe(changed(path.distImg))
    .pipe(imagemin([
      imageminMozjpeg({quality: '65-80'}),
      imagemin.gifsicle(),
      imageminPngquant({quality: '65-80'}),
      imagemin.optipng(),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest(path.distImg))
}
)

gulp.task('sass', () => {
  return gulp.src(['src/sass/*.scss', '!src/sass/_*.scss'])
    .pipe(plumber(plumberOption))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOption))
    .pipe(postcss(postcssOption))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(path.distCSS))
})

gulp.task('pug', () => {
  return gulp.src(['src/pug/**.pug', '!src/pug/_**.pug'])
    .pipe(plumber(plumberOption))
    .pipe(pug())
    .pipe(gulp.dest(path.dist))
})

gulp.task('ejs', () => {
  return gulp.src(['src/ejs/*.ejs', '!src/ejs/_*.ejs'])
    .pipe(plumber(plumberOption))
    .pipe(ejs('', '', {
      ext: '.html'
    }))
    .pipe(gulp.dest(path.dist))
})

gulp.task('copy', () => {
  return gulp.src(['src/media/**'])
    .pipe(gulp.dest(path.distMedia))
})

gulp.task('watch', (done) => {
  const browserReload = (done) => {
    browserSync.reload()
    done()
  }
  gulp.watch('./src/**/*.pug', gulp.parallel('pug'))
  gulp.watch('./src/**/*.ejs', gulp.parallel('ejs'))
  gulp.watch('./src/**/*.scss', gulp.parallel('sass'))
  gulp.watch(path.srcImg, gulp.parallel('img'))
  gulp.watch('./src/media/**/*', gulp.parallel('copy'))
  gulp.watch(['./docs/**/*.html', './docs/**/*.css', './dist/**/*.js'], browserReload)
})

gulp.task('pug-dev', gulp.series(
  gulp.parallel('pug', 'sass', 'img', 'copy'),
  'serve',
  'watch'))

gulp.task('default', gulp.series(
  gulp.parallel('ejs', 'sass', 'img', 'copy'),
  'serve',
  'watch'))
