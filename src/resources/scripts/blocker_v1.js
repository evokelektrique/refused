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
      this.blocker_listener,
      {urls: filters},
      ["blocking"]
    );
  }

  /**
   * @param  {object} details
   * @return {object}         
   */
  blocker_listener(details) {
    const parsed  = Helper.parse_url(details.url)
    if(parsed.status) {
      const counter = new CountDatabase({domain: parsed.domain, count: 1}).open()
    }

    browser.storage.local.get("total_blocks").then(data => {
      const new_total = parseInt(data.total_blocks) + 1
      browser.browserAction.setBadgeText({
        text: String(new_total)
      });
      browser.storage.local.set({total_blocks: new_total})
    })

    return {
      cancel: true
    }
  }
}
