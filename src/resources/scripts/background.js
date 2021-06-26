import { filters } from "./filters"
import { BlockerV1 } from "./blocker_v1"
import { Refused } from "./refused"
const browser = require("webextension-polyfill");

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
  port.onMessage.addListener(msg => {
  })
});

// Listener
browser.runtime.onMessage.addListener( (request,sender,sendResponse) => {
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

      sendResponse( { status: new_status} )
    })
  }

  return true
})
