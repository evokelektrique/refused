import { Helper } from './helper'
import { CountDatabase } from './databases/count'

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
    const parsed  = Helper.parse_url(details.url)
    if(parsed.status) {
      const config  = { domain: parsed.domain, count: 0 }
      const counter = new CountDatabase(config).increase().then(incremented => {
        browser.browserAction.setBadgeText({
          text: String(incremented.domain.count)
        });
      })
    }

    return {
      cancel: true
    }
  }
}
