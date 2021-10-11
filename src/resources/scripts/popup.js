import { SettingsDatabase } from './databases/settings'
import { Helper } from './helper'

const browser = require("webextension-polyfill");

// Find total_blocked ads from settings database
async function get_total_blocks(db) {
  const key = "total_block"
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
  const current_tab = await Helper.get_current_tab()

  // Set up current tab url
  document.getElementById("current_tab_url").innerHTML = new URL(current_tab.url).host

  const lang_status_on  = browser.i18n.getMessage("status_on")
  const lang_status_off = browser.i18n.getMessage("status_off")
  const element_status  = document.getElementById("status")

  // Get power on/off switch status and add class to its element
  new SettingsDatabase().open().then(async db => {

    const status       = await get_power_status(db)
    const total_blocks = await get_total_blocks(db)

    const power_element = document.getElementById("power_button")
    if(status) {
      power_element.classList.add("power_on")
      document.getElementById("block_information").classList.add("visible")
    } else {
      power_element.classList.add("power_off")
      document.getElementById("block_information").classList.remove("visible")
    }

    element_status.innerHTML = lang_status_off

    if(status) {
      element_status.innerHTML = lang_status_on
    }
  })

  // Power Button Listener
  document.getElementById("power_button").addEventListener("click", async e => {
    e.preventDefault()
    e.target.classList.toggle("power_on")
    document.getElementById("block_information").classList.toggle("visible")
    if(element_status.innerHTML === lang_status_on) {
      element_status.innerHTML = lang_status_off
    } else {
      element_status.innerHTML = lang_status_on
    }
    
    const sender = await browser.runtime.sendMessage("toggle_status")
  })

  // browser.storage.local.get("total_blocks").then(data => {
  //   document.getElementById("total_blocks").innerHTML = data.total_blocks
  // })



})()
