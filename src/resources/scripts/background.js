import { filters } from "./filters"
import { BlockerV1 } from "./blocker_v1"
import { Refused } from "./refused"
const browser = require("webextension-polyfill");

// Fetch Stats
function fetch_stats_on_got(data) {
  if(Object.keys(data).length === 0) {
    browser.storage.local.set({total_blocks: 0})
  }

  // Initialize Badge
  browser.browserAction.setBadgeBackgroundColor({
    color: "#f44336"
  });
  browser.browserAction.setBadgeText({
    text: String(data.total_blocks)
  });
}

const fetch_total_blocks = browser.storage.local.get("total_blocks")
fetch_total_blocks.then(fetch_stats_on_got)


// On Install Handler
function install_listener() {
  browser.storage.local.set({
    status: false
  })
}
browser.runtime.onInstalled.addListener(install_listener)

// Initialize a Refused class
// And setting up its handlers
const refused = new Refused()
refused.filters = filters
refused.blocker = BlockerV1

// Open communication port
browser.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(msg => console.log(msg)) 
})

// Listener
browser.runtime.onMessage.addListener( (request, sender, send_response) => {
  console.log(request)
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

      send_response( { status: new_status} )
    })
  }

  return true
})
