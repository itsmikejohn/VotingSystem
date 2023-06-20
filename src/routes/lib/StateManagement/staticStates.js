import { writable } from "svelte/store";

export const logicGates = writable({
    showRegisterComp: false,
    showResetPassword: false,
})