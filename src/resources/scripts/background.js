import { SettingsDatabase } from "./databases/settings"
import { SelectorDatabase } from "./databases/selector"
import { MessageListener } from "./message_listener"
import { FilterDatabase } from "./databases/filter"
import { TabManager } from "./tab_manager"
import { BlockerV1 } from "./blocker_v1"
import { constants } from "./constants"
import { Refused } from "./refused"
import { styles } from "./styles"
import { Helper } from "./helper"

const browser = require("webextension-polyfill");

// Initialize tab manager
const tab_manager = new TabManager()

new SettingsDatabase().set_settings()

// Initialize alarms
browser.alarms.create(constants.alarm_selectors, constants.alarm_options);
browser.alarms.create(constants.alarm_filters, constants.alarm_options);
browser.alarms.onAlarm.addListener(Refused.handle_alarms);

// Handle install or updates
browser.runtime.onInstalled.addListener(Refused.upgrade_listener)

// Initialize Badge
browser.browserAction.setBadgeBackgroundColor({
  color: styles.badge_color
})

// Initialize a Refused class
// And setting up its handlers
const refused   = new Refused()
refused.blocker = BlockerV1

// Start Blocking Ads On Install
refused.start()

// Open communication port
browser.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(msg => null)
})

// Listener
browser.runtime.onMessage.addListener((message) => MessageListener(refused, message))
