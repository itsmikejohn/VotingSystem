import { writable } from "svelte/store";

export const userStates = writable({
    showNewVoter: false,
    showEditVoter: false,
    comparison: 0.1,

    showNewPosition: false,
    showEditPosition: false,
    comparisonPos: 0.1,

    showNewCandidate: false,
    showEditCandidate: false,
    comparisonCandidate: 0.1,
    platformComparison: 0.1,

    addedVotersArray: [],
    addedPositionsArray: [],
    fetchPositionArray: [],
    addedCandidatesArray: [],


    
})