<script>
    import { logicGates, universalVars } from "./lib/StateManagement/staticStates";

    //static landing
    import MainFrame from "./lib/Components/StaticPOV/LoginFrame/MainFrame.svelte";

    //admin landing
    import UserMainFrame from "./lib/Components/UserPOV/UserMainFrame.svelte";
    
    //voter or users landing
    import VoterMainFrame from "./lib/Components/VoterPOV/VoterMainFrame.svelte";

    //database calls and hooks
    import { auth, db } from "./lib/DB/firebase";
    import { onAuthStateChanged } from "firebase/auth";
    import { onMount } from "svelte";

    onMount(() => onAuthStateChanged(auth, userCred => {
        if(userCred){
            if(userCred.uid === "Y7W59myPi8hZfFddeHFZdsQpJKT2"){
                $logicGates.hasAdmin = true;
                $logicGates.hasVoter = false;
            }else{
                $logicGates.hasAdmin = false;
                $logicGates.hasVoter = true;
            }
        }else{
            $logicGates.hasAdmin = false;
            $logicGates.hasVoter = false;
        }
    }))

</script>

<main class="text-xs sm:text-base">
    {#if $logicGates.hasAdmin}
        <UserMainFrame />
    {:else if $logicGates.hasVoter}
        <VoterMainFrame />
    {:else}
        <MainFrame />
    {/if}
</main>