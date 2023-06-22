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
    import { doc, collection, setDoc, serverTimestamp, onSnapshot} from "firebase/firestore"

    onSnapshot(collection(db, "addedVoters"), snapshots => {
        let fbData = [];
        snapshots.docs.forEach(doc => {
            let data = {...doc.data(), id: doc.id};
            fbData = [data, ...fbData];

        })
        $userStates.addedVotersArray = fbData;
        
    })

    
    
    const addVoter = () => {
        createUserWithEmailAndPassword(auth, $universalVars.email.BINDTHIS, $universalVars.password.BINDTHIS)
        .then(userCred => {

            if($universalVars.gender === "Male"){
                updateProfile(userCred.user, {
                    displayName: $universalVars.fullname,
                    photoURL: "https://em-content.zobj.net/thumbs/120/facebook/65/man_1f468.png"
                })
            }else if($universalVars.gender === "Female"){
                updateProfile(userCred.user, {
                    displayName: $universalVars.fullname,
                    photoURL: "https://em-content.zobj.net/thumbs/120/facebook/65/woman_1f469.png",
                })
            }else{
                updateProfile(userCred.user, {
                    displayName: $universalVars.fullname,
                    photoURL: "https://em-content.zobj.net/thumbs/120/facebook/65/woman_1f469.png",
                })
            }

            setDoc(doc(collection(db, "addedVoters"), userCred.user.uid), {
                fullname: $universalVars.fullname.BINDTHIS,
                email: $universalVars.email.BINDTHIS,
                password: $universalVars.password.BINDTHIS,
                createdAt: serverTimestamp(),

            }, {merge:true})
            .then(() => $userStates.showNewVoter = false)
        })
        .catch(error => {
            console.log(error)
        })
    }


    const newVoter = () => {
        $userStates.showNewVoter = true;
    }
</script>

<main class="p-4" in:fly={{x:-200, duration:600}}>
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
                            <OurInputs TYPE="email" LABEL="Email:" PLACEHOLDER="Voter Email" bind:this={$universalVars.email}/>
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
            
            <div class="flex gap-2">
                <p class="w-full border-2 p-2 font-semibold">Lastname</p>
                <p class="w-full border-2 p-2 font-semibold">Firstname</p>
                <p class="w-full border-2 p-2 font-semibold">Photo</p>
                <p class="w-full border-2 p-2 font-semibold">Voters ID</p>
                <p class="w-full border-2 p-2 font-semibold">Tools</p>
            </div>

            <div class="">
                
            </div>
        </div>
    </div>
</main>