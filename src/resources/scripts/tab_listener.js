import { Helper } from './helper'

const browser = require("webextension-polyfill")

/**
 * Custom listener for active tabs
 */
export class TabListener {

  static on_active = null
  static on_error  = null

  /**
   * Attach events
   *
   * @param  {function} on_active Event for on_active
   * @param  {function} on_error  Event for on_error
   * @return {void}
   */
  constructor(on_active, on_error) {
    TabListener.on_active = on_active
    TabListener.on_error  = on_error
  }

  /**
   * Listener to be attached to active tab and get information
   *
   * @param  {object} activeInfo
   * @return {void}
   */
  async listener(activeInfo) {
    // Note:
    //
    // Adding a timeout here to fix a bug related
    // to "user is dragging tab" issue with chrome.
    await Helper.sleep(500)

    // TODO: Remove
    console.log(`Tab ${activeInfo.tabId} was activated`);

    browser.tabs.query({ active: true }).then(
      TabListener.on_active,
      TabListener.on_error
    )
  }

}
