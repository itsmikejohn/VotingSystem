<script>
    import { fly, scale } from "svelte/transition";
    import OurButton from "../../../GeneralComponents/OurButton.svelte";
    import OurInputs from "../../../GeneralComponents/OurInputs.svelte";
    import { userStates } from "../../../StateManagement/userStates";

</script>


<main class="p-4 sm:max-w-7xl mx-auto" in:fly={{x:-200, duration:600}}>
    <p class="text-2xl font-semibold py-4">Positions</p>
    <div class="">
        <div class="border-t-4 border-2 p-2">
            <div class="flex gap-2 my-2">
                <div class="w-full">
                    <div class="max-w-fit">
                        <OurButton TITLE="+ New" on:click={() => $userStates.showNewPosition = true}/>
                    </div>
                </div>

                {#if $userStates.showNewPosition}
                    <div class="fixed top-0 bottom-0 left-0 right-0 p-4" in:scale>
                        <div class="border-2 mx-auto max-w-2xl mt-[15vh] p-4 z-10 rounded-lg bg-slate-400">
                            <p class="text-white font-semibold">Add New Position</p>
                            
                            <OurInputs LABEL="Description:" PLACEHOLDER="Description example.. President" />
                            <OurInputs TYPE="number" LABEL="Maximum Votes:" PLACEHOLDER="Enter a valid number of votes" />
                            
                            <div class="flex mt-4 border-t-2 pt-2">
                                <div class="w-full">
                                    <div class="max-w-fit">
                                        <OurButton TITLE="Cancel" on:click={() => $userStates.showNewPosition = false}/>
                                    </div>
                                </div>
                                
                                <div class="w-full">
                                    <div class="max-w-fit float-right">
                                        <OurButton TITLE="Save" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}

                <div class="flex">
                    <input type="text" placeholder="Search" class="focus:outline-none px-2 border-2" />
                    <button class="bg-blue-500 px-2 text-white font-semibold active:bg-blue-300">Search</button>
                    
                    
                </div>
            </div>
        </div>
    </div>
</main>
