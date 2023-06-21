import { writable } from "svelte/store";

export const logicGates = writable({
    showRegisterComp: false,
    showResetPassword: false,

    showLoading: false,
})

export const universalVars = writable({
    gender: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",

})