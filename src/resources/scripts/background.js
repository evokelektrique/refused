import { filters } from "./filters"
import { BlockerV1 } from "./blocker_v1"
import { Refused } from "./refused"
import { styles } from "./styles"
import { SettingsDatabase } from './databases/settings'

// Initialize default settings
new SettingsDatabase().set_settings()

const browser  = require("webextension-polyfill");
const base_url = "https://refused.ir"

// On Install Handler
function install_listener(details) {

  // Detect if the extension is installed or updated
  if(details.reason === "install") {
    browser.storage.local.set({ status: true })
    // browser.storage.local.set({ total_blocks: "0" })
  } else {
    chrome.tabs.create({url: base_url + "/update.html"})
  }
}
browser.runtime.onInstalled.addListener(install_listener)

// // Fetch Stats
// function fetch_stats_on_got(data) {
//   // Initialize Badge
//   browser.browserAction.setBadgeBackgroundColor({
//     color: styles.badge_color
//   });
//   const text = data.total_blocks !== undefined ? String(data.total_blocks) : "0";
//   // console.log(text)
//   // browser.browserAction.setBadgeText({
//   //   text: text
//   // });
// }
// const fetch_total_blocks = browser.storage.local.get("total_blocks")
// fetch_total_blocks.then(fetch_stats_on_got)

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
  if(request === "toggle_status") {
    new SettingsDatabase().open().then(async db => {
      // Find status from settings database
      const key        = "status"
      const get        = await db.settings.get({ key: key })
      const status     = get.value
      const new_status = !status
      await db.settings.update(get.id, {value: new_status})

      // Toggle blocker
      if(new_status) {
        refused.start()
      } else {
        refused.stop()
      }

      return Promise.resolve({ status: new_status })
    })
  }

  return true
})
