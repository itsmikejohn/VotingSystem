import { writable } from "svelte/store";

export const logicGates = writable({
    showRegisterComp: false,
    showResetPassword: false,

    showLoading: false,
    
})

export const universalVars = writable({
    gender: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",

    description: "",
    maximumVote: 0,

    position: "",
    platform: "",
    positionArray: [],

    activeItem: "Dashboard",

})

