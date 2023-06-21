<script>
// @ts-nocheck
    import { universalVars } from "../StateManagement/staticStates";
    import { slide } from "svelte/transition";

    let ARRAY_DATA = ["Male", "Female"];
    let TITLE = "Gender";
    let rotator = "rotate-[45deg]";
    let logicRotator = false;

    const showData = () => {
        logicRotator = !logicRotator;
        logicRotator ? rotator = "rotate-[225deg]" : rotator = "rotate-[45deg]";
    }

    const sendData = val => {
        TITLE = val;
        $universalVars.gender = val;
        showData();
    }
</script>

<button class="bg-white w-full flex gap-1 px-2 items-center"
on:click={showData}
>
    <div class="w-full">
        <p class="text-left font-semibold ">{TITLE}</p>
    </div>

    <div class="transition-all w-2 border-b-2 h-2 border-r-2 border-black {rotator} "></div>
</button>

{#if logicRotator}
    <div class="" transition:slide>
        {#each ARRAY_DATA as val}
            <button class="bg-white border-x-2 mt-2 text-left p-2 w-full buttonx-2 hover:scale-95 transition-all cursor-pointer "
            on:click={() => sendData(val)}
            >{val}</button>
        {/each}
    </div>
{/if}