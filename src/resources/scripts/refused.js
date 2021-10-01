const browser = require("webextension-polyfill");
import { FilterDatabase } from "./databases/filter"

export class Refused {

  blocker = null

  constructor() {}

  /**
   * @param  {class} blocker 
   */
  set blocker(blocker) {
    this.blocker = blocker
  }

  /**
   * Starts blocking the ads
   */
  async start() {
    const filters = await new FilterDatabase().get_filters()
    if(!this.blocker) {
      throw new Error("Blocker is not set up")
    }

    if(!filters.length > 0) {
      throw new Error("No filter found")
    }

    // Initiate Blocker class
    // it will start blocking urls by its own handler
    new this.blocker().block_urls(filters)
  }

  /**
   * Stops blocking the ads, by removing its listener
   */
  stop() {
    browser.webRequest.onBeforeRequest.removeListener(new this.blocker().listener)
  }
}
