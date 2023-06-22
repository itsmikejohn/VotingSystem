import { writable } from "svelte/store";

export const userStates = writable({
    showNewVoter: false,

    addedVotersArray: [],
})