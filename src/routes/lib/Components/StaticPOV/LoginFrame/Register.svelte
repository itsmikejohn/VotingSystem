<script>
    import { logicGates } from "../../../StateManagement/staticStates";
    import OurButton from "../../../GeneralComponents/OurButton.svelte";
    import OurInputs from "../../../GeneralComponents/OurInputs.svelte";
    import OurAccordion from "../../../GeneralComponents/OurAccordion.svelte";
    import { scale, fly } from "svelte/transition";

</script>

<main in:scale>
    <p class="text-2xl text-center font-bold p-10">Voting System</p>
    
    <div class="p-8 bg-slate-200 rounded-lg" in:fly={{y:200, duration:1000}}>
        <p class="text-2xl text-center font-bold">Voter's Registration</p>
        <div class="">
            <OurAccordion />
            <OurInputs LABEL="Username:" PLACEHOLDER="Username" />
            <OurInputs TYPE="email" LABEL="Email:" PLACEHOLDER="Voters Email"/>
            <OurInputs TYPE="password" LABEL="Password:" PLACEHOLDER="Voter's Password"/>
            <OurInputs TYPE="password" LABEL="Confirm Password:" PLACEHOLDER="Confirm Voter's Password"/>
        </div>

        <div class="max-w-fit mt-2">
            <OurButton TITLE="Sign Up"/>
        </div>
    </div>

    <div class="p-2 bg-slate-200 mt-5 rounded-lg" in:fly={{x:200, duration:1000}}>
        <div class="flex gap-2 justify-center">
            <p>Already a voter?</p>
            <button class="underline italic "
            on:click={() => $logicGates.showRegisterComp = false}
            >Login here</button>
        </div>
    </div>


</main>
