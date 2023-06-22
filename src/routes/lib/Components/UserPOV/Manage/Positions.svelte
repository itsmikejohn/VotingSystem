<script>
// @ts-nocheck

    import { fly, scale } from "svelte/transition";
    import OurButton from "../../../GeneralComponents/OurButton.svelte";
    import OurInputs from "../../../GeneralComponents/OurInputs.svelte";
    import { userStates } from "../../../StateManagement/userStates";
    import { universalVars } from "../../../StateManagement/staticStates";

    //database calls and hooks
    import { auth, db } from "../../../DB/firebase";
    import {collection, doc, setDoc, onSnapshot, query, orderBy, serverTimestamp, deleteDoc, addDoc} from "firebase/firestore";

    onSnapshot(query(collection(db, "addedPositions"), orderBy("createdAt", "asc")), snapshots => {
        let fbData = [];
        snapshots.docs.forEach(doc => {
            let data = {...doc.data(), id: doc.id};
            fbData = [data, ...fbData];
        })
        $userStates.addedPositionsArray = fbData;
        console.log($userStates.addedPositionsArray)
    })

    //add new position to DB
    const addNewPosition = () => {
        addDoc(collection(db, "addedPositions"), {
            description: $universalVars.description.BINDTHIS,
            maximumVote: $universalVars.maximumVote.BINDTHIS,
            createdAt: serverTimestamp(),
        }).then(() => $userStates.showNewPosition = false)
    }

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
                            
                            <OurInputs LABEL="Description:" PLACEHOLDER="Description example.. President" bind:this={$universalVars.description}/>
                            <OurInputs TYPE="number" LABEL="Maximum Votes:" PLACEHOLDER="Enter a valid number of votes" bind:this={$universalVars.maximumVote}/>
                            
                            <div class="flex mt-4 border-t-2 pt-2">
                                <div class="w-full">
                                    <div class="max-w-fit">
                                        <OurButton TITLE="Cancel" on:click={() => $userStates.showNewPosition = false}/>
                                    </div>
                                </div>
                                
                                <div class="w-full">
                                    <div class="max-w-fit float-right">
                                        <OurButton TITLE="Save" on:click={addNewPosition}/>
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

            <div class="flex flex-col gap-2">
                {#each $userStates.addedPositionsArray as val, index}
                <div class="flex flex-col gap-2 bg-slate-300 p-4 rounded-lg sm:flex-row sm:items-center sm:p-0 ">
                    <p class=" px-2 bg-slate-200 font-semibold">Description</p>
                    <p class="w-[30%]">{val.description}</p>
                    <p class=" px-2 w-[18%] bg-slate-200 font-semibold">Maximum Votes</p>
                    <p class="w-[70%]">{val.maximumVote}</p>
                    <p class=" px-2 bg-slate-200 font-semibold">Tools</p>
                    <div class="flex gap-2">
                        <button class="bg-green-600 px-2 text-white font-semibold hover:bg-green-800"
                        on:click={() => $userStates.comparisonPos = index}
                        >Edit</button>
                        <button class="bg-red-600 px-2 text-white font-semibold hover:bg-red-800"
                        on:click={() => {}}
                        >Delete</button>
                    </div>
                </div>
                {/each}
            </div>
        </div>
    </div>
</main>
