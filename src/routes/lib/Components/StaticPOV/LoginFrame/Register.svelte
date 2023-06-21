<script>
// @ts-nocheck

    import { logicGates, universalVars } from "../../../StateManagement/staticStates";
    import OurButton from "../../../GeneralComponents/OurButton.svelte";
    import OurInputs from "../../../GeneralComponents/OurInputs.svelte";
    import OurAccordion from "../../../GeneralComponents/OurAccordion.svelte";
    import { scale, fly } from "svelte/transition";

    //database calls and hooks
    import { auth,db } from "../../../DB/firebase";
    import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
    import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
    import { onMount } from "svelte";

    onMount(() => $universalVars.gender = "");

    const thisCompoVars = {
        dbDomReader: "",
    }

    const signUp = () => {
        $logicGates.showLoading = true;
        createUserWithEmailAndPassword(auth, $universalVars.email.BINDTHIS, $universalVars.password.BINDTHIS)
        .then(userCred => {
            
            if($universalVars.gender === "Male"){
                updateProfile(userCred.user, {
                    displayName: $universalVars.username,
                    photoURL: "https://em-content.zobj.net/thumbs/120/facebook/65/man_1f468.png"
                })
            }else if($universalVars.gender === "Female"){
                updateProfile(userCred.user, {
                    displayName: $universalVars.username,
                    photoURL: "https://em-content.zobj.net/thumbs/120/facebook/65/woman_1f469.png",
                })
            }else{
                updateProfile(userCred.user, {
                    displayName: $universalVars.username,
                    photoURL: "https://em-content.zobj.net/thumbs/120/facebook/65/woman_1f469.png",
                })
            }

            setDoc(doc(collection(db, "registeredVoters"), userCred.user.uid), {
                gender: $universalVars.gender,
                username: $universalVars.username.BINDTHIS,
                email: $universalVars.email.BINDTHIS,
                password: $universalVars.password.BINDTHIS,
                createdAt: serverTimestamp(),
            }, {merge:true})
            .then(() => {
                $logicGates.showLoading = false;
            })
            .catch(error => {
                thisCompoVars.dbDomReader = error.code;
                $logicGates.showLoading = false;
            })
        })
        .catch(error => {
            thisCompoVars.dbDomReader = error.code;
            $logicGates.showLoading = false;
        })
    }

</script>

<main in:scale>
    <p class="text-2xl text-center font-bold p-10">Voting System</p>
    
    <div class="p-8 bg-slate-200 rounded-lg" in:fly={{y:200, duration:1000}}>
        <p class="text-center font-semibold text-red-600 italic">{thisCompoVars.dbDomReader}</p>
        <p class="text-2xl text-center font-bold">Voter's Registration</p>
        <div class="mt-5">
            <OurAccordion />
            <OurInputs LABEL="Username:" PLACEHOLDER="Username" bind:this={$universalVars.username}/>
            <OurInputs TYPE="email" LABEL="Email:" PLACEHOLDER="Voters Email" bind:this={$universalVars.email}/>
            <OurInputs TYPE="password" LABEL="Password:" PLACEHOLDER="Voter's Password" bind:this={$universalVars.password}/>
            <OurInputs TYPE="password" LABEL="Confirm Password:" PLACEHOLDER="Confirm Voter's Password" bind:this={$universalVars.confirmPassword}/>
        </div>

        <div class="max-w-fit mt-2">
            <OurButton TITLE="Sign Up" on:click={signUp} LOGIC={$logicGates.showLoading} LOGIC_TITLE="Signing Up.."/>
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
