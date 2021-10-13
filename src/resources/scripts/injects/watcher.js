import { constants } from "../constants"

const browser = require("webextension-polyfill")

/**
 * Refused inject script used to communicate
 * between background and vice versa
 *
 * @type {object}
 */
const RefusedWatcher = {}

// Handle incoming messages and responds
browser.runtime.onMessage.addListener( message => {
  if(message.type === constants.hide_element) {
    const data = {}
    browser.runtime.sendMessage({ type: constants.hide_element, data: data })
  }

  return false;
})

