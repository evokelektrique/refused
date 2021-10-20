<br />
<p align="center">
  <a href="https://github.com/evokelektrique/refused">
    <img src="./src/resources/images/96.png?raw=true" alt="Logo" width="96" height="96">
  </a>

  <h3 align="center">Refused</h3>

  <p align="center">
    اد بلاکی دیگر اما مخصوص سایت های محبوب فارسی شما
    <br />
    <br />
    <a href="https://chrome.google.com/webstore/detail/refused/omeglkgaklnjheplmjmmcgodhcnjckdf" title="Download for Chrome">Chrome</a>
    &nbsp;-&nbsp;
    <a href="https://addons.mozilla.org/en-US/firefox/addon/refused/" title="Download for Firefox">Firefox</a>
    &nbsp;-&nbsp;  
    <a href="https://github.com/evokelektrique/refused/issues">گزارش باگ</a>
    <br />
    <br />
    <a href="https://github.com/evokelektrique/refused/blob/master/README.md">EN</a>
    <b>FA</b>
    :ترجمه ها
  </p>
</p>

<br />
<br />

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>فهرست مطالب</summary>
  <ol>
    <li><a href="#features">امکانات</a></li>
    <li>
      <a href="#getting-started">مقدمات</a>
      <ul>
        <li><a href="#reports">گزارش ها</a></li>
        <li><a href="#requirments">نیازمندی ها</a></li>
        <li><a href="#installation">نصب</a></li>
      </ul>
    </li>
    <li><a href="#dependencies">وابستگی ها</a></li>
    <li><a href="#support">حمایت</a></li>
  </ol>
</details>

<!-- FEATURES -->
## Features

  - [X] مسدود کردن درخواست ها
  - [X] مخفی کردن المان ها
  - [X] پشتیبانی از Wildcard
  - [X] پشتیبانی از XPATH
  - [ ] پشتیبانی برای مرورگر Opera
  - [ ] پشتیبانی برای مرورگر Microsoft Edge Browser
  - [ ] ذخیره و مخفی کردن المان ها از پاپ آپ در دیتابیس

<!-- GETTING STARTED -->
## Getting Started

در این قسمت توضیحاتی در موارد زیر نوشته شده است.

### Reports

<div style="display:flex">
  <img src="https://github.com/evokelektrique/refused/blob/master/data/images/charts/chart_data_usage_fa.png?raw=true" width="300">
  <img src="https://github.com/evokelektrique/refused/blob/master/data/images/charts/chart_requests_fa.png?raw=true" width="300">
  <img src="https://github.com/evokelektrique/refused/blob/master/data/images/charts/chart_seconds_fa.png?raw=true" width="300">
</div>

*برای بزرگنمایی تصاویر کلیک کنید*

### Requirments
- Firefox & Firefox Android >= 48
- NodeJS (فقط برای تست و بیلد از سورس کد)

### Installation
- [Chrome](https://chrome.google.com/webstore/detail/refused/omeglkgaklnjheplmjmmcgodhcnjckdf)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/refused/)
- [Manually from latest release](https://github.com/evokelektrique/refused/releases/latest)

یا اینکه با استفاده از مقدمات توضیح داده شده زیر خودتان از سورس کد افزونه را بسازید
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
در این بخش لیستی از فریم ورک ها و کتاب خانه هایی که در پروسه ساخت این پروژه استفاده شده اند نام برده شده است.
* [webextension-polyfill](https://github.com/mozilla/webextension-polyfill)
* [laravel-mix](https://laravel-mix.com)
* [sass-loader](https://www.npmjs.com/package/sass-loader)
* [sass](https://www.npmjs.com/package/sass)
* [resolve-url-loader](https://www.npmjs.com/package/resolve-url-loader)
* [vazir-font](https://github.com/rastikerdar/vazir-font)
* [Dexie.js](https://github.com/dfahlander/Dexie.js)
  
<!-- Support -->
## Support
اگر سوالی برایتان پیش آمده است میتوانید در 
[اینجا](https://github.com/evokelektrique/refused/issues)
سوال خود را مطرح کرده و اگر از این پروژه خوشتان آمده و برایتان مفید واقع شده است لطفا یک ستاره ⭐ برای حمایت بزارید.

