import { SelectorDatabase } from "./databases/selector"
import { constants } from "./constants"
import { Helper } from "./helper"

const browser = require("webextension-polyfill")

/**
 * Refused inject script used to communicate
 * between background and vice versa
 *
 * @type {object}
 */
const RefusedWatcher = {

  /**
   * Get css path from DOM elements
   *
   * @param  {element} el Target element
   * @return {string}     CSS Path
   */
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
  },

  /**
   * Fetch current page css selectors from background page
   *
   * @return {array} CSS Selectors
   */
  async get_selectors() {
    const current_url = window.location.href
    const parsed_url = Helper.parse_url(current_url)
    if(parsed_url.status) {
      return await browser.runtime.sendMessage({ type: 'get_selectors', domain: parsed_url.domain })
    }
  }

}

// Handle incoming messages and responds
browser.runtime.onMessage.addListener(message => {
  if(message.type === constants.hide_element) {
    const data = {}
    browser.runtime.sendMessage({ type: constants.hide_element, data: data })
  }

  return false;
})

RefusedWatcher.get_selectors().then(selectors => {
  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector.path)
    Array.from(elements).forEach(element => {
      element.style.display = 'none'
    })
  })
})
