import { constants } from "./constants"

const browser = require("webextension-polyfill")

/**
 * Refused inject script used to communicate
 * between background and vice versa
 *
 * @type {object}
 */
const RefusedWatcher = {

  css_path(el) {
    if (!(el instanceof Element)) {
      return;
    }

    const path = [];

    while (el.nodeType === Node.ELEMENT_NODE) {
      let selector = el.nodeName.toLowerCase();
      if (el.id) {
        selector += '#' + el.id;
        path.unshift(selector);
        break;
      } else {
        let sib = el, nth = 1;

        while (sib = sib.previousElementSibling) {
          if (sib.nodeName.toLowerCase() == selector)
            nth++;
        }

        if (nth != 1) {
          selector += ":nth-of-type("+nth+")";
        }
      }

      path.unshift(selector);
      el = el.parentNode;
    }

    return path.join(" > ");
  }

}

// Handle incoming messages and responds
browser.runtime.onMessage.addListener( message => {
  if(message.type === constants.hide_element) {
    const data = {}
    browser.runtime.sendMessage({ type: constants.hide_element, data: data })
  }

  return false;
})


window.refused = RefusedWatcher
