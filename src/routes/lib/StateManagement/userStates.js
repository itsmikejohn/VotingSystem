import { writable } from "svelte/store";

export const userStates = writable({
    showNewVoter: false,
    showEditVoter: false,
    comparison: 0.1,

    addedVotersArray: [],
})