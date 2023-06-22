<script>
// @ts-nocheck

    import { fly } from "svelte/transition";
    import { universalVars } from "../../../StateManagement/staticStates";

    //has user
    import Dashboard from "../../UserPOV/Reports/Dashboard.svelte";

    let logicSwitch = false;
    let display = "block";
    let firstDiv = "rotate-[0deg] relative";
    let secDiv = "rotate-[0deg]";
    let padding = "p-2";


    const showData = () => {
        logicSwitch = !logicSwitch;
        if(logicSwitch){
            display = "hidden";
            firstDiv = "rotate-[45deg] absolute";
            secDiv = "rotate-[-45deg]";
            padding = "px-2 py-3.5";
        }else{
            display = "block";
            firstDiv = "rotate-[0deg] relative";
            secDiv = "rotate-[0deg]";
            padding = "p-2";
        }
    }

    const collectData = event => {
        $universalVars.activeItem = event.target.textContent;
    }

    
</script>

<nav class="bg-[#3c8db9] p-2 fixed top-0 w-full">
    <button class="flex flex-col gap-1 {padding} bg-white rounded-full"
    on:click={showData}
    >
        <div class="w-4 border-b-2 border-black transition-all {firstDiv}"></div>
        <div class="w-4 border-b-2 border-black transition-all {display}"></div>
        <div class="w-4 border-b-2 border-black transition-all {secDiv}"></div>
    </button>
    
    {#if logicSwitch}
        <div class="fixed bottom-0 top-0 left-0 right-0  mt-10"
        on:keydown={() => {}}
        on:click={() => showData()}
        >
            <div class="fixed bg-[#3c8db9] mt-2 left-0" transition:fly={{x:-100, duration:200}}>
                <div class="flex gap-2 items-center text-white p-4">
                    <img src="https://em-content.zobj.net/thumbs/120/facebook/65/man_1f468.png" alt="loading" class="w-16 bg-slate-200 rounded-full" />
                    <div class="flex flex-col gap-2">
                        <p>Peter Pan Magic</p>
                        <div class="flex gap-2 items-center">
                            <div class="w-4 h-4 bg-green-700 rounded-full"></div><p>Online</p>
                        </div>
                    </div>
                </div>
    
                <p class="bg-[#1c1c1c] text-white px-4">REPORTS</p>
                <div class="">
                    <button class="p-2 w-full text-left cursor-pointer hover:bg-slate-600 transition-all hover:scale-95"
                    class:active={$universalVars.activeItem === "Dashboard"}
                    on:click={() => collectData(event)}
                    >Dashboard</button>
                    <button class="p-2 w-full text-left cursor-pointer hover:bg-slate-600 transition-all hover:scale-95"
                    class:active={$universalVars.activeItem === "Votes"}
                    on:click={() => collectData(event)}
                    >Votes</button>
                </div>
    
                <p class="bg-[#1c1c1c] text-white px-4">MANAGE</p>
                <div class="">
                    <button class="p-2 w-full text-left cursor-pointer hover:bg-slate-600 transition-all hover:scale-95"
                    class:active={$universalVars.activeItem === "Voters"}
                    on:click={() => collectData(event)}
                    >Voters</button>
                    <button class="p-2 w-full text-left cursor-pointer hover:bg-slate-600 transition-all hover:scale-95"
                    class:active={$universalVars.activeItem === "Positions"}
                    on:click={() => collectData(event)}
                    >Positions</button>
                    <button class="p-2 w-full text-left cursor-pointer hover:bg-slate-600 transition-all hover:scale-95"
                    class:active={$universalVars.activeItem === "Candidates"}
                    on:click={() => collectData(event)}
                    >Candidates</button>
                </div>
    
                <p class="bg-[#1c1c1c] text-white px-4">SETTINGS</p>
                <div class="">
                    <button class="p-2 w-full text-left cursor-pointer hover:bg-slate-600 transition-all hover:scale-95"
                    on:click={() => collectData(event)}
                    >Ballot Position</button>
                    <button class="p-2 w-full text-left cursor-pointer hover:bg-slate-600 transition-all hover:scale-95"
                    on:click={() => collectData(event)}
                    >Election Title</button>
                </div>
            </div>
        </div>
    {/if}
</nav>


<style>
    .active{
        background-color: grey;
    }
</style>