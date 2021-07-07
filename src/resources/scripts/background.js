import { filters } from "./filters"
import { BlockerV1 } from "./blocker_v1"
import { Refused } from "./refused"
const browser = require("webextension-polyfill");

// On Install Handler
function install_listener(details) {
  console.log(details)
  if(details.reason === "install") {
    browser.storage.local.set({ status: true })
    browser.storage.local.set({ total_blocks: "0" })
  } else {
    chrome.tabs.create({url:"https://refused.ir/update.html"})
  }
}
browser.runtime.onInstalled.addListener(install_listener)

// Fetch Stats
function fetch_stats_on_got(data) {

  // Initialize Badge
  browser.browserAction.setBadgeBackgroundColor({
    color: "#f44336"
  });

  const text = data.total_blocks !== undefined ? String(data.total_blocks) : "0";
  console.log(text)
  browser.browserAction.setBadgeText({
    text: text
  });
}

const fetch_total_blocks = browser.storage.local.get("total_blocks")
fetch_total_blocks.then(fetch_stats_on_got)

// Initialize a Refused class
// And setting up its handlers
const refused = new Refused()
refused.filters = filters
refused.blocker = BlockerV1
// Start Blocking Ads On Install
refused.start()

// Open communication port
browser.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(msg => console.log(msg)) 
})

// Listener
browser.runtime.onMessage.addListener( request => {
  // console.log(request)
  if( request === "toggle_status" ) {
    browser.storage.local.get("status").then(data => {
      // Store new status received from `popup.js`
      const new_status = !data.status
      browser.storage.local.set({status: new_status})

      // Toggle blocker
      if(new_status === false) {
        refused.stop()
      } else {
        refused.start()
      }

      return Promise.resolve( { status: new_status} )
    })
  }

  return true
})
