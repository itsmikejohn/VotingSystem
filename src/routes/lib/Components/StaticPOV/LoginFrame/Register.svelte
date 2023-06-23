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
    

    const thisCompoVars = {
        dbDomReader: "",
        photoURL: "",
    }

    const signUp = () => {

        const callMe = () => {
            createUserWithEmailAndPassword(auth, $universalVars.email.BINDTHIS, $universalVars.password.BINDTHIS)
            .then( async userCred => {
                
                await updateProfile(userCred.user, {
                    displayName: $universalVars.username.BINDTHIS,
                    photoURL: thisCompoVars.photoURL,
                })

                await setDoc(doc(collection(db, "registeredVoters"), userCred.user.uid), {
                    votersID: userCred.user.uid,
                    voterPhoto: userCred.user.photoURL,
                    gender: $universalVars.gender,
                    fullname: userCred.user.displayName,
                    email: userCred.user.email,
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

        $logicGates.showLoading = true;

        if($universalVars.gender === "Male"){
            thisCompoVars.photoURL = "https://em-content.zobj.net/thumbs/120/facebook/65/man_1f468.png";
            callMe();  
            $logicGates.showLoading = false; 
        }else if($universalVars.gender === "Female"){
            thisCompoVars.photoURL = "https://em-content.zobj.net/thumbs/120/facebook/65/woman_1f469.png";
            callMe();
            $logicGates.showLoading = false;
        }else{
            thisCompoVars.dbDomReader = "Select Gender First";
        }

        $logicGates.showLoading = false;
        
        
    }

</script>

<main in:scale>
    <p class="text-2xl text-center font-bold p-10">Voting System</p>
    
    <div class="p-8 bg-slate-200 rounded-lg" in:fly={{y:200, duration:1000}}>
        <p class="text-center font-semibold text-red-600 italic">{thisCompoVars.dbDomReader}</p>
        <p class="text-2xl text-center font-bold">Voter's Registration</p>
        <div class="mt-5">
            <OurAccordion />
            <OurInputs LABEL="Fullname:" PLACEHOLDER="Fullname" bind:this={$universalVars.username}/>
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
