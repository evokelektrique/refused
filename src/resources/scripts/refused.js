import { FilterDatabase } from "./databases/filter"
import { constants } from "./constants"

const browser = require("webextension-polyfill");

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

    // Apply filters
    const filters = await new FilterDatabase().set_filters()

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

  /**
   * Handle extension updates or install
   *
   * @param  {object} details Contains reason and previous extension version
   * @return {void}
   */
  static upgrade_listener(details) {
    // On install
    if(details.reason === "install") {}

    // On update
    if(details.reason === "update") {
      browser.tabs.create({ url: constants.base_url + "/update.html" })
    }
  }

}
