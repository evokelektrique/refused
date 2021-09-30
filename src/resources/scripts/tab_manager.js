import { TabListener } from './tab_listener'

const browser = require("webextension-polyfill")

/**
 * Manage and manipulate tabs
 */
export class TabManager {

  static current_tab = null
  listener = null

  /**
   * Add a custom listener to current tab if already not exists
   *
   * @return {void}
   */
  constructor() {
    this.listener = new TabListener(this.on_active, this.on_error).listener

    if(!this.has_listener()) {
      browser.tabs.onActivated.addListener(this.listener)
    }
  }

  /**
   * Determine if listener exists or already added
   *
   * @return {Boolean}
   */
  has_listener() {
    return browser.tabs.onActivated.hasListener(this.listener)
  }

  /**
   * Trigger event on when current tab is activated
   *
   * @param  {array} tabs List of tabs in current window
   * @return {void}
   */
  on_active(tabs) {
    TabManager.current_tab = tabs[0]
    console.log(TabManager.current_tab)
  }

  /**
   * Trigger event on when an error occurred in current tab
   *
   * @param  {string} error Error message
   * @return {void}
   */
  on_error(error) {
    console.log(`Error: ${error}`)
  }

}
