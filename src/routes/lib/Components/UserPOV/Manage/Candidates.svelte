<script>
// @ts-nocheck

    import { fly, scale } from "svelte/transition";
    import OurButton from "../../../GeneralComponents/OurButton.svelte";
    import OurInputs from "../../../GeneralComponents/OurInputs.svelte";
    import SpecialAccordion from "./SpecialAccordion.svelte";

    import { userStates } from "../../../StateManagement/userStates";
    import { universalVars } from "../../../StateManagement/staticStates";

    //database calls and hooks
    import { auth, db } from "../../../DB/firebase";
    import {collection, onSnapshot, addDoc, serverTimestamp, setDoc, doc, query, orderBy, deleteDoc} from "firebase/firestore";
    import OurAccordion from "../../../GeneralComponents/OurAccordion.svelte";
    
    const thisCompoVars = {
        photoURL: ""
    }


    // hook snapshots of of position->description from DB to connect it to candidates
    onSnapshot(collection(db, "addedPositions"), snapshots => {
        let fbData = [];
        snapshots.docs.forEach(doc => {
            let data = {...doc.data(), id: doc.id};
            fbData = [data.description, ...fbData];
        })
        
        $userStates.fetchPositionArray = fbData;

    })

    // fetch data of added candidates to client
    onSnapshot(query(collection(db, "addedCandidates"), orderBy("createdAt", "asc")), snapshots => {
        let fbData = [];
        snapshots.docs.forEach(doc => {
            let data = {...doc.data(), id: doc.id};
            fbData = [data, ...fbData];
        })

        $userStates.addedCandidatesArray = fbData;
    })

    //add candidate to DB
    const addNewCandidate = () => {
        const callMe = () => {
            addDoc(collection(db, "addedCandidates"), {
            createdAt: serverTimestamp(),
                gender: $universalVars.gender,
                position: $universalVars.position,
                fullname: $universalVars.fullname.BINDTHIS,
                platform: $universalVars.platform,
                photoURL: thisCompoVars.photoURL,
            }).then(() => {
                $userStates.showNewCandidate = false;
                $universalVars.platform = "";
            })
        }

        if($universalVars.gender === "Male"){
            thisCompoVars.photoURL = "https://em-content.zobj.net/thumbs/120/facebook/65/man_1f468.png";
            callMe();   
        }else if($universalVars.gender === "Female"){
            thisCompoVars.photoURL = "https://em-content.zobj.net/thumbs/120/facebook/65/woman_1f469.png";
            callMe();
        }else{
            console.log("Form validation otw")
        }

        
    }

    //edit candidate to DB
    const editCandidate = refID => {

        setDoc(doc(collection(db, "addedCandidates"), refID), {
            position: $universalVars.position,
            gender: $universalVars.gender,
            fullname: $universalVars.fullname.BINDTHIS,
            platform: $universalVars.platform,
            modedAt: serverTimestamp(),
        }, {merge:true}).then(() => {
            $userStates.comparisonCandidate = 0.1;
            $universalVars.platform = "";
        })
    }

    //detelete candidate to DB
    const deleteCandidate = refID => {
        deleteDoc(doc(collection(db, "addedCandidates"), refID))
    }

</script>


<main class="p-4 sm:max-w-7xl mx-auto" in:fly={{x:-200, duration:600}}>
    <p class="text-2xl font-semibold py-4">Candidate List</p>
    <div class="">
        <div class="border-t-4 border-2 p-2">
            <div class="flex gap-2 my-2">
                <div class="w-full">
                    <div class="max-w-fit">
                        <OurButton TITLE="+ New" on:click={() => $userStates.showNewCandidate = true}/>
                    </div>
                </div>

                {#if $userStates.showNewCandidate}
                    <div class="fixed top-0 bottom-0 left-0 right-0 p-4" in:scale>
                        <div class="border-2 mx-auto max-w-2xl mt-[15vh] p-4 z-10 rounded-lg bg-slate-400">
                            <p class="text-white font-semibold">Add New Candidate</p>

                            <div class="my-2">
                                <SpecialAccordion TITLE="Select Position" ARRAY_DATA={$userStates.fetchPositionArray}/>
                            </div>

                            <div class="my-2">
                                <OurAccordion />
                            </div>

                            <OurInputs LABEL="Fullname:" PLACEHOLDER="Fullname of candidate" bind:this={$universalVars.fullname}/>
                            <div class="mt-2">
                                <p class="font-semibold my-2">Platform:</p>
                                <textarea class="w-full p-2" placeholder="Your candidate platform/agenda etc.." bind:value={$universalVars.platform}/>
                            </div>
                            
                            <div class="flex mt-4 border-t-2 pt-2">
                                <div class="w-full">
                                    <div class="max-w-fit">
                                        <OurButton TITLE="Cancel" on:click={() => $userStates.showNewCandidate = false}/>
                                    </div>
                                </div>
                                
                                <div class="w-full">
                                    <div class="max-w-fit float-right">
                                        <OurButton TITLE="Save" on:click={addNewCandidate}/>
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
                {#each $userStates.addedCandidatesArray as val, index}
                <div class="flex flex-col gap-2 bg-slate-300 p-4 rounded-lg sm:flex-row sm:items-center sm:p-0 ">
                    <p class=" px-2 bg-slate-200 font-semibold">Fullname</p>
                    <p class="sm:w-[30%]">{val.fullname}</p>
                    <p class=" px-2 bg-slate-200 font-semibold">Position</p>
                    <p class="sm:w-[30%]">{val.position}</p>
                    <p class=" px-2 bg-slate-200 font-semibold">Platform</p>
                    {#if $userStates.platformComparison === index}
                        <div class="fixed top-0 bottom-0 left-0 right-0">
                            <dialog open class="border-2 border-black rounded-lg mt-[25vh] sm:mt-[30vh] bg-blue-400" transition:scale>
                                <div class="float-right">
                                    <button class=" p-1 py-2 rounded-full cursor-pointer hover:bg-slate-200"
                                    on:click={() => $userStates.platformComparison = 0.1}
                                    >
                                        <div class="w-4 border-b-2 border-black rotate-45 absolute"></div>
                                        <div class="w-4 border-b-2 border-black rotate-[-45deg]"></div>
                                    </button>
                                </div>
                                    
                                <div class="py-10 text-center">
                                    {val.platform}
                                </div>

                                <div class="text-center mt-2 font-semibold text-pink-800">
                                    <p>{val.fullname}, Platform</p>
                                </div>
                                
                                
                            </dialog>
                        </div>
                    {/if}
                    <button class="sm:w-[30%] bg-blue-400 hover:bg-blue-500 hover:underline font-semibold"
                    on:click={() => {$userStates.platformComparison = index}}
                    >
                        View Platform
                    </button>
                    <p class=" px-2 bg-slate-200 font-semibold">Tools</p>
                    <div class="flex gap-2">
                        <button class="bg-green-600 px-2 text-white font-semibold hover:bg-green-800"
                        on:click={() => $userStates.comparisonCandidate = index}
                        >Edit</button>
                        <button class="bg-red-600 px-2 text-white font-semibold hover:bg-red-800"
                        on:click={() => deleteCandidate(val.id)}
                        >Delete</button>
                    </div>
                </div> 
                {#if $userStates.comparisonCandidate === index}
                    <div class="fixed top-0 bottom-0 left-0 right-0 p-4" transition:scale>
                        <div class="border-2 mx-auto max-w-2xl mt-[15vh] p-4 z-10 rounded-lg bg-green-400">
                            <p class="text-white font-semibold">Update target: <i class="text-black">{val.fullname}</i></p>
                            <div class="my-2">
                                <SpecialAccordion TITLE="Select Position" ARRAY_DATA={$userStates.fetchPositionArray}/>
                            </div>

                            <div class="my-2">
                                <OurAccordion />
                            </div>

                            <OurInputs LABEL="Fullname:" PLACEHOLDER="Fullname of candidate" bind:this={$universalVars.fullname}/>
                            <div class="mt-2">
                                <p class="font-semibold my-2">Platform:</p>
                                <textarea class="w-full p-2" placeholder="Your candidate platform/agenda etc.." bind:value={$universalVars.platform}/>
                            </div>
                            
                            <div class="flex mt-4 border-t-2 pt-2">
                                <div class="w-full">
                                    <div class="max-w-fit">
                                        <OurButton TITLE="Cancel" on:click={() => $userStates.comparisonCandidate = 0.1}/>
                                    </div>
                                </div>
                                
                                <div class="w-full">
                                    <div class="max-w-fit float-right">
                                        <OurButton TITLE="Update" on:click={() => editCandidate(val.id)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}

                {/each}
            </div>
        </div>
    </div>
</main>