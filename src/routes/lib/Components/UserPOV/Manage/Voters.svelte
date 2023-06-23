<script>
// @ts-nocheck

    import { fly, scale } from "svelte/transition";
    import { userStates } from "../../../StateManagement/userStates";
    import { universalVars } from "../../../StateManagement/staticStates";
    import OurButton from "../../../GeneralComponents/OurButton.svelte";
    import OurInputs from "../../../GeneralComponents/OurInputs.svelte";
    import OurAccordion from "../../../GeneralComponents/OurAccordion.svelte";

    //database calls and hooks
    import { auth, db } from "../../../DB/firebase";
    import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
    import { doc, collection, setDoc, serverTimestamp, onSnapshot, addDoc, deleteDoc, query, orderBy} from "firebase/firestore"

    
    
    onSnapshot(query(collection(db, "addedVoters"), orderBy("createdAt", "asc")), snapshots => {
        let fbData = [];
        snapshots.docs.forEach(doc => {
            let data = {...doc.data(), id: doc.id};
            fbData = [data, ...fbData];

        })
        $userStates.addedVotersArray = fbData;
        
    })

    //delete voter
    const deleteVoter = refID => {
        deleteDoc(doc(collection(db, "addedVoters"), refID))
    }

    //modifify voter
    const editVoter = refID => {
        let photoURL = "";
        if($universalVars.gender === "Male"){
            photoURL = "https://em-content.zobj.net/thumbs/120/facebook/65/man_1f468.png";
        }else{
            photoURL = "https://em-content.zobj.net/thumbs/120/facebook/65/woman_1f469.png";
        }
        setDoc(doc(collection(db, "addedVoters"), refID), {
            fullname: $universalVars.fullname.BINDTHIS,
            password: $universalVars.password.BINDTHIS,
            gender: $universalVars.gender,
            photoURL: photoURL,
            modedAt: serverTimestamp(),
        }, {merge:true}).then(() => $userStates.comparison = 0.1)
    }
    
    //add voter
    const addVoter = () => {
        let photoURL = "";

        if($universalVars.gender === "Male"){
            photoURL = "https://em-content.zobj.net/thumbs/120/facebook/65/man_1f468.png";
        }else{
            photoURL = "https://em-content.zobj.net/thumbs/120/facebook/65/woman_1f469.png";
        }

        addDoc(collection(db, "addedVoters"), {
            fullname: $universalVars.fullname.BINDTHIS,
            password: $universalVars.password.BINDTHIS,
            gender: $universalVars.gender,
            photoURL: photoURL,
            generatedUID: generatreUID(),
            createdAt: serverTimestamp(),
        }).then(() => $userStates.showNewVoter = false)
    }


    const newVoter = () => {
        $userStates.showNewVoter = true;
    }


    const generatreUID = () => {
        let uid ="";
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 6; i++) {
            let randomIndex = Math.floor(Math.random() * chars.length);
            uid += chars.charAt(randomIndex);
        }

        return uid;
    }
</script>

<main class="p-4 sm:max-w-7xl mx-auto" in:fly={{x:-200, duration:600}}>
    <p class="text-2xl font-semibold py-4">Voters List</p>
    <div class="">
        <div class="border-t-4 border-2 p-2">
            <div class="flex gap-2 my-2">
                <div class="w-full">
                    <div class="max-w-fit">
                        <OurButton TITLE="+ New" on:click={newVoter}/>
                    </div>
                {#if $userStates.showNewVoter}
                    <div class="fixed top-0 bottom-0 left-0 right-0 p-4" in:scale>
                        <div class="border-2 mx-auto max-w-2xl mt-[15vh] p-4 z-10 rounded-lg bg-slate-400">
                            <p class="text-white font-semibold">Add New Voter</p>
                            <div class="mt-2">
                                <OurAccordion />
                            </div>
                            <OurInputs LABEL="Fullname:" PLACEHOLDER="Voter Fullname" bind:this={$universalVars.fullname}/>
                            <OurInputs TYPE="password" LABEL="Password:" PLACEHOLDER="Voter Password" bind:this={$universalVars.password}/>
                            
                            <div class="flex mt-4 border-t-2 pt-2">
                                <div class="w-full">
                                    <div class="max-w-fit">
                                        <OurButton TITLE="Cancel" on:click={() => $userStates.showNewVoter = false}/>
                                    </div>
                                </div>
                                
                                <div class="w-full">
                                    <div class="max-w-fit float-right">
                                        <OurButton TITLE="Save" on:click={addVoter}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}

    


                </div>

                <div class="flex">
                    <input type="text" placeholder="Search" class="focus:outline-none px-2 border-2" />
                    <button class="bg-blue-500 px-2 text-white font-semibold active:bg-blue-300">Search</button>
                    
                    
                </div>
            </div>
            
            <div class="flex flex-col gap-2">
                {#each $userStates.addedVotersArray as val, index}
                    <div class="flex flex-col gap-2 bg-slate-300 p-4 rounded-lg sm:flex-row sm:items-center sm:p-0 sm:justify-center">
                        <p class=" px-2 bg-slate-200 font-semibold">Fullname</p>
                        <p class="sm:w-[40%]">{val.fullname}</p>

                        <p class=" px-2 bg-slate-200 font-semibold">Gender</p>
                        <p class="sm:w-[5%]">{val.gender}</p>

                        <p class=" px-2 bg-slate-200 font-semibold">Photo</p>
                        <img src={val.photoURL} alt="loading" class="w-10"/>

                        <p class="px-2  bg-slate-200 font-semibold">Voters ID</p>
                        <p class="sm:w-[7%]">{val.generatedUID}</p>

                        <p class=" px-2 bg-slate-200 font-semibold">Tools</p>
                        <div class="flex gap-2">
                            <button class="bg-green-600 px-2 text-white font-semibold hover:bg-green-800"
                            on:click={() => $userStates.comparison = index}
                            >Edit</button>
                            <button class="bg-red-600 px-2 text-white font-semibold hover:bg-red-800"
                            on:click={() => deleteVoter(val.id)}
                            >Delete</button>
                        </div>
                    </div>

                    {#if $userStates.comparison === index}
                    <div class="fixed top-0 bottom-0 left-0 right-0 p-4" transition:scale>
                        <div class="border-2 mx-auto max-w-2xl mt-[15vh] p-4 z-10 rounded-lg bg-green-400">
                            <p class="text-white font-semibold">Update target: <i class="text-black">{val.fullname}</i></p>
                            <div class="mt-2">
                                <OurAccordion />
                            </div>
                            <OurInputs LABEL="Update Fullname:" PLACEHOLDER="Update Voter Fullname" bind:this={$universalVars.fullname}/>
                            <OurInputs TYPE="password" LABEL="Update Password:" PLACEHOLDER="Update Voter Password" bind:this={$universalVars.password}/>
                            
                            <div class="flex mt-4 border-t-2 pt-2">
                                <div class="w-full">
                                    <div class="max-w-fit">
                                        <OurButton TITLE="Cancel" on:click={() => $userStates.comparison = 0.1}/>
                                    </div>
                                </div>
                                
                                <div class="w-full">
                                    <div class="max-w-fit float-right">
                                        <OurButton TITLE="Save" on:click={() => editVoter(val.id)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/if}
                {/each}
            </div>

            <div class="">
                
            </div>
        </div>
    </div>
</main>