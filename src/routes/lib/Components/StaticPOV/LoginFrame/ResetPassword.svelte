<script>
    import { logicGates } from "../../../StateManagement/staticStates";
    import OurButton from "../../../GeneralComponents/OurButton.svelte";
    import OurInputs from "../../../GeneralComponents/OurInputs.svelte";
    import { scale, fly } from "svelte/transition";


</script>

<main in:scale>
    <p class="text-2xl text-center font-bold p-10">Voting System</p>
    
    <div class="p-8 bg-slate-200 rounded-lg" in:fly={{y:-200, duration:1000}}>
        <p class="text-xl text-center font-bold">Password Recovery</p>
        <div class="">
            <OurInputs LABEL="Email:" PLACEHOLDER="Enter Your Email"/>
        </div>

        <div class="max-w-fit mt-2">
            <OurButton TITLE="Send Password Reset"/>
        </div>
    </div>

    <div class="p-2 bg-slate-200 mt-5 rounded-lg" in:fly={{x:200, duration:1000}}>
        <div class="flex gap-2 justify-center">
            <p>Got recovered already?</p>
            <button class="underline italic "
            on:click={() => $logicGates.showResetPassword = false}
            >Login here</button>
        </div>
    </div>


</main>
