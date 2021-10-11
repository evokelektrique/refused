const browser = require("webextension-polyfill")

export class Injector {
  constructor(tab) {
    // We use onUpdated listener to inject JS/CSS into tabs
    browser.tabs.onUpdated.addListener(this.listener);
  }

  listener(tab_id, change, tab) {
    // TODO: Add validation for tab url to start only with 'http(s)://'
    if(change.status !== "complete") {
      return;
    }

    const js_file = '/injects/test.js'
    console.log("Injecting " + js_file + " into", tab)

    browser.tabs.executeScript(tab_id, {
      file: js_file
    })
  }

}
