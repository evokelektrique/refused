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
    chrome.webRequest.onBeforeRequest.addListener(
      this.blocker_handler,
      {urls: filters},
      ["blocking"]
    );
  }

  /**
   * @param  {object} details
   * @return {object}         
   */
  blocker_handler(details) {
    console.log("blocking:", details.url);
    return {
      cancel: true
    };
  }
}