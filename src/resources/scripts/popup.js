import { SettingsDatabase } from './databases/settings'
import { Helper } from './helper'

const browser = require("webextension-polyfill");

// Find total_blocked ads from settings database
async function get_total_blocks(db) {
  const key = "total_blocks"
  const get = await db.settings.get({ key: key })

  return get.value
}

// Find status from settings database
async function get_power_status(db) {
  const key        = "status"
  const get        = await db.settings.get({ key: key })

  return get.value
}

// Initialize Configuration & Display
(async () => {

  // Elements
  const element_current_tab_url   = document.getElementById("current_tab_url")
  const element_current_power     = document.getElementById("power_button")
  const element_current_status    = document.getElementById("status")
  const element_block_information = document.getElementById("block_information")

  const lang_status_on  = browser.i18n.getMessage("status_on")
  const lang_status_off = browser.i18n.getMessage("status_off")

  // Set up current tab url
  const current_tab = await Helper.get_current_tab()
  element_current_tab_url.innerHTML = new URL(current_tab.url).host
  // Get power on/off switch status and add class to its element
  new SettingsDatabase().open().then(async db => {

    const status       = await get_power_status(db)
    const total_blocks = await get_total_blocks(db)

    if(status) {
      element_current_power.classList.add("power_on")
      element_block_information.classList.add("visible")
    } else {
      element_current_power.classList.add("power_off")
      element_block_information.classList.remove("visible")
    }

    element_current_status.innerHTML = lang_status_off

    if(status) {
      element_current_status.innerHTML = lang_status_on
    }
  })

  // Power Button Listener
  element_current_power.addEventListener("click", async e => {
    e.preventDefault()
    e.target.classList.toggle("power_on")
    element_block_information.classList.toggle("visible")

    if(element_current_status.innerHTML === lang_status_on) {
      element_current_status.innerHTML = lang_status_off
    } else {
      element_current_status.innerHTML = lang_status_on
    }
    
    const sender = await browser.runtime.sendMessage("toggle_status")
  })

})()
