const mix = require('laravel-mix');

mix.setPublicPath('build')

mix.js('src/resources/scripts/background.js', 'build')
mix.js('src/resources/scripts/popup.js', 'build')

mix.sass('src/resources/styles/popup.scss', 'build')

// Copy Necessary Files
mix.copy([
  "manifest.json",
  "src/*.html",
], "build")

mix.copyDirectory("_locales", "build/_locales/")