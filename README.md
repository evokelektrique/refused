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
    <a href="https://github.com/evokelektrique/refused/issues">Report Bug</a>
  </p>
</p>

<br />
<br />

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#built-with">Built With</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#requirments">Requirments</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


### Built With
In this section, A list of Libraries & Frameworks used in the construction of this project mentioned below.
* [webextension-polyfill](https://github.com/mozilla/webextension-polyfill)
* [laravel-mix](https://laravel-mix.com)
* [sass-loader](https://www.npmjs.com/package/sass-loader)
* [sass](https://www.npmjs.com/package/sass)
* [resolve-url-loader](https://www.npmjs.com/package/resolve-url-loader)



<!-- GETTING STARTED -->
## Getting Started

In this section, explanations are written in the following cases.

### Requirments
- Firefox version >= 56
- NodeJS (Only for testing and building from source code)

### Installation
Currently waiting for Firefox add-on team to review the extension codes, but you can self install it your self by following instructions explained below
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
  
<!-- CONTACT -->
## Contact
If you have any questions you can email(evoke.lektrique@gmail.com) me or DM me on Telegram [@evoke](https://t.me/evoke)
