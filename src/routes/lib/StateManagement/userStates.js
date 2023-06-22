import { writable } from "svelte/store";

export const userStates = writable({
    showNewVoter: false,
    showEditVoter: false,
    comparison: 0.1,

    showNewPosition: false,
    showEditPosition: false,
    comparisonPos: 0.1,

    addedVotersArray: [],
    addedPositionsArray: [],
})