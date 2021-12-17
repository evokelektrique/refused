<br />
<p align="center">
  <a href="https://github.com/evokelektrique/refused">
    <img src="./src/resources/images/96.png?raw=true" alt="Logo" width="96" height="96">
  </a>

  <h3 align="center">Refused</h3>

  <p align="center">
    Just another AdBlock but only for your favorite persian websites
    <br />
    <br />
    <a href="#download" title="Download Section">Download</a>
    &nbsp;-&nbsp;  
    <a href="https://github.com/evokelektrique/refused/issues">Report Bug</a>
    <br />
    <br />
    Translations:
    <b>EN</b>
    <a href="https://github.com/evokelektrique/refused/blob/master/README_FA.md">FA</a>
  </p>
</p>

![GitHub release (latest by date)](https://img.shields.io/github/v/release/evokelektrique/refused?color=gr&label=release&style=for-the-badge)
![Chrome Web Store](https://img.shields.io/chrome-web-store/users/omeglkgaklnjheplmjmmcgodhcnjckdf?color=blue&label=Chrome%20users&logo=Google%20Chrome&logoColor=white&style=for-the-badge)
![Mozilla Add-on](https://img.shields.io/amo/users/refused?color=orange&label=Firefox%20users&logo=firefox&logoColor=white&style=for-the-badge)

<br />
<br />

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#download">Download</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#statistics">Statistics</a></li>
    <li><a href="#requirements">Requirements</a></li>
    <li><a href="#build">Build</a></li>
    <li><a href="#dependencies">Dependencies</a></li>
    <li><a href="#support">Support</a></li>
  </ol>
</details>

## Download

*Click on your browser icon to download the extension*

<a href="https://chrome.google.com/webstore/detail/refused/omeglkgaklnjheplmjmmcgodhcnjckdf">
  <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/70.4.0/chrome/chrome.svg" width="50" />
</a>
&nbsp;&nbsp;
<a href="https://addons.mozilla.org/en-US/firefox/addon/refused/">
  <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/70.4.0/firefox/firefox.svg" width="50" />
</a>
&nbsp;&nbsp;
<a href="https://microsoftedge.microsoft.com/addons/detail/refused/nmeajbkhoplklklhkaggldgjflgaomog">
  <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/70.4.0/edge/edge.svg" width="50" />
</a>
&nbsp;&nbsp;
<a href="#">
  <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/70.4.0/opera/opera.svg" width="50" />
</a>

<br>
<br>

<a href="https://github.com/evokelektrique/refused/releases/latest">Manually from latest release</a>

## Features

  - [X] Block requests
  - [X] Hide elements
  - [X] Support Wildcards
  - [X] Support CSS Selectors
  - [ ] Support Opera Browser
  - [ ] Suppoer Microsoft Edge Browser
  - [ ] Save and hide elements from popup in local database

### Statistics

*Click to enlarge images*

<div style="display:flex">
  <img src="https://github.com/evokelektrique/refused/blob/master/data/images/charts/chart_data_usage_en.png?raw=true" width="256">
  <img src="https://github.com/evokelektrique/refused/blob/master/data/images/charts/chart_requests_en.png?raw=true" width="256">
  <img src="https://github.com/evokelektrique/refused/blob/master/data/images/charts/chart_seconds_en.png?raw=true" width="256">
</div>

### Requirements

- Firefox & Firefox Android >= 48
- NodeJS (Only for testing and building from source code)

### Build

A step by step installtion from soruce code:

> Make sure you have the <a href="#requirements">requirements</a> installed already.

1. Clone the repo
   ```sh
   git clone https://github.com/evokelektrique/refused.git
   ```
2. Install required NodeJS packages
   ```sh
   npm install
   ```
3. Build with
   ```sh
   npx mix
   ```
   Or you can add `--production` argument to minify the codes
4. Load extension on Firefox by opening the `about:debugging` url and by clicking on the `Load Temporary Add-on` button and then select the `manifest.json` file located in the root of `./build` folder

## Dependencies

In this section, A list of Libraries & Frameworks used in the development process of this project mentioned below.

* [webextension-polyfill](https://github.com/mozilla/webextension-polyfill)
* [laravel-mix](https://laravel-mix.com)
* [sass-loader](https://www.npmjs.com/package/sass-loader)
* [sass](https://www.npmjs.com/package/sass)
* [resolve-url-loader](https://www.npmjs.com/package/resolve-url-loader)
* [vazir-font](https://github.com/rastikerdar/vazir-font)
* [Dexie.js](https://github.com/dfahlander/Dexie.js)
  
## Support

If you have any questions you can file an issue [here](https://github.com/evokelektrique/refused/issues) and if you liked this project, please leave a star ⭐
