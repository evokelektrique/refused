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
      return await browser.runtime.sendMessage({
        type: constants.get_selectors,
        domain: parsed_url.domain
      })
    }
  },

  /**
   * Get extension status
   *
   * @return {object} Status
   */
  async get_status() {
    return await browser.runtime.sendMessage({ type: constants.get_status })
  },

  /**
   * Hide elements on current page
   *
   * @param  {array} selectors List of css selectors
   * @return {void}
   */
  hide_elements(selectors) {
    if(!selectors) {
      return;
    }

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector.path)
      Array.from(elements).forEach(element => {
        element.style.display = 'none'
      })
    })
  }

}

// Handle incoming messages and responds
browser.runtime.onMessage.addListener(message => {
  if(message.type === constants.hide_element) {
    const data = {}
    browser.runtime.sendMessage({
      type: constants.hide_element,
      data: data
    })
  }

  return false
});

RefusedWatcher.get_status().then(async response => {
  const status = response.status

  if(status) {
    const selectors = await RefusedWatcher.get_selectors()
    RefusedWatcher.hide_elements(selectors)
  }
})
