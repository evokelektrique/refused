import { filters } from "./filters"
import { BlockerV1 } from "./blocker_v1"
import { Refused } from "./refused"

// Initialize a Refused class
// And setting up its handlers
const refused = new Refused()
refused.filters = filters
refused.blocker = BlockerV1

// Start the Adblock
refused.run()
