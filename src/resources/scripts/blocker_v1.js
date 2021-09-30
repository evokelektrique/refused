import { Helper } from './helper'
import { CountDatabase } from './databases/count'
import { SettingsDatabase } from './databases/settings'

const browser = require("webextension-polyfill");

/**
 * Blocker version one based on manifest_version 2
 * @class
 */
export class BlockerV1 {

  /**
   * Add a listener on before any request initiates.
   * If the URL includes in given 'filters', it will block it
   * @param  {array} filters
   */
  block_urls(filters) {
    browser.webRequest.onBeforeRequest.addListener(
      this.listener,
      {urls: filters},
      ["blocking"]
    );
  }

  /**
   * Listen and parse incoming requests to block
   *
   * @param  {object} details
   * @return {object}         
   */
  listener(details) {
    // Parse current URL
    const parsed = Helper.parse_url(details.url)

    // Validate request URL and increase the total blocked times counter
    if(parsed.status) {
      const config  = { domain: parsed.domain, count: 0 }
      const counter = new CountDatabase(config).increase().then(incremented => {
        Helper.set_badge(incremented.domain.count)
      })
    }

    // Block
    return { cancel: true }
  }
}
