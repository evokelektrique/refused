import { Helper } from './helper'
import { TabListener } from './tab_listener'
import { CountDatabase } from './databases/count'

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
  async on_active(tabs) {
    // Fetch and attach current tab
    const tab = tabs[0]
    TabManager.current_tab = tab

    // Parse and validate current tab url
    const parsed = Helper.parse_url(tab.url)

    if(parsed.status) {

      // Get current domain counter
      const config  = { domain: parsed.domain, count: 0 }
      const counter = await new CountDatabase(config).get_domain(parsed.domain)

      if(counter) {
        Helper.set_badge(counter.count)
      } else {
        Helper.set_badge(config.count)
      }
    }

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
