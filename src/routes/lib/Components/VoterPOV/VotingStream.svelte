<script>
// @ts-nocheck
    import { scale } from "svelte/transition";
    import { userStates } from "../../StateManagement/userStates";

    //database calls and hooks
    import { auth, db } from "../../DB/firebase";
    import { collection, onSnapshot, query, orderBy, addDoc } from "firebase/firestore";

    //fetch positions
    onSnapshot(collection(db, "addedPositions"), snapshots => {
        let fbData = [];
        snapshots.docs.forEach(doc => {
            let data = {...doc.data(), id: doc.id};
            fbData = [data, ...fbData];
        })

        $userStates.fetchPositionStreamArray = fbData;
    })
   
    //fetch candidates
    onSnapshot(collection(db, "addedCandidates"), snapshots => {
        let fbData = [];
        snapshots.docs.forEach(doc => {
            let data = {...doc.data(), id: doc.id};
            fbData = [data, ...fbData];
        })

        $userStates.fetchCandidateStreamArray = fbData;
    })
    
   
    
    const grab = (position, fullname) => {
        if(document.getElementById(fullname).checked){
            console.log(fullname)
        }
    }

    
    

</script>
<form on:submit={grab}>
<main class="p-2 mx-auto sm:max-w-2xl ">
    <button>Submit</button>
    {#each $userStates.fetchPositionStreamArray as outerVal, outerIndex}
    <div class="border-2 border-black mt-2">
        <p class="border-b-2 p-2 font-semibold border-black">Running {outerVal.description}</p>
        <div class="">
            <p class="p-2 italic text-red-500">You may select up to 200 candidates</p>
            
        </div>
        
        {#each $userStates.fetchCandidateStreamArray as val, innerIndex}
            {#if val.position === outerVal.description}
            <div class="p-2 flex gap-2 items-center border-2 m-2 rounded-lg">
                <img src={val.photoURL} alt="loading" class="w-10 rounded-full bg-slate-600" />
                <div class="w-full">
                    <p>{val.fullname}</p>

                    {#if $userStates.platformComparison === innerIndex}
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
                    <button class="bg-blue-500 text-white px-2 font-semibold rounded-lg hover:underline"
                    on:click={() => $userStates.platformComparison = innerIndex}
                    >View Platform</button>
                </div>

                <div class="">
                    <input type="radio" id={val.fullname} name={val.position} value={val.fullname} />
                </div>
                
            </div>
            {/if}
        {/each}
        
        
    </div>
    {/each}
</main>
</form>