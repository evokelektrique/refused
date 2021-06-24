
const mix = require('laravel-mix');

mix.js('src/resources/scripts/background.js', 'build').setPublicPath('build')

// Copy Necessary Files
mix.copy([
  "manifest.json",
  "src/*.html",
], "build")