<script>
 
    import { logicGates } from "../../../StateManagement/staticStates";
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";
    import ResetPassword from "./ResetPassword.svelte";

    import OurAccordion from "../../../GeneralComponents/OurAccordion.svelte";
    

</script>

<main class="mx-auto sm:max-w-2xl mt-[10vh] px-5">
    
    {#if $logicGates.showRegisterComp}
        <Register />
    {:else if $logicGates.showResetPassword}
        <ResetPassword />
    {:else}
        <Login />
    {/if}
    
</main>


