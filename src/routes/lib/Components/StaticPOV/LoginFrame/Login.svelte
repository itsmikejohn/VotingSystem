<script>
// @ts-nocheck

    import { logicGates, universalVars } from "../../../StateManagement/staticStates";
    import OurButton from "../../../GeneralComponents/OurButton.svelte";
    import OurInputs from "../../../GeneralComponents/OurInputs.svelte";
    import { scale, fly } from "svelte/transition";

    //database calls and hooks
    import { auth, db } from "../../../DB/firebase";
    import {signInWithEmailAndPassword} from "firebase/auth";
    import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

    const thisCompoVars = {
        dbDomReader: "",
    }

    const login = () => {
        $logicGates.showLoading = true;
        signInWithEmailAndPassword(auth, $universalVars.email.BINDTHIS, $universalVars.password.BINDTHIS)
        .then(userCred => {
            thisCompoVars.dbDomReader = "";
            setDoc(doc(collection(db, "registeredVoters"), userCred.user.uid), {
                gender: $universalVars.gender.BINDTHIS,
                username: $universalVars.username.BINDTHIS,
                email: $universalVars.email.BINDTHIS,
                password: $universalVars.password.BINDTHIS,
                modedAt: serverTimestamp(),
            }, {merge:true})
            localStorage.setItem("uid", userCred.user.uid);
            $logicGates.showLoading = false;
        })
        .catch(error => {
            thisCompoVars.dbDomReader = error.code;
            $logicGates.showLoading = false;
        })
    }
</script>

<main in:scale>
    <p class="text-2xl text-center font-bold p-10">Voting System</p>
    
    <div class="p-8 bg-slate-200 rounded-lg" in:fly={{y:-200, duration:1000}}>
        <p class="text-center font-semibold text-red-600 italic">{thisCompoVars.dbDomReader}</p>
        <div class="">
            <OurInputs LABEL="Email:" PLACEHOLDER="Voters Email" bind:this={$universalVars.email}/>
            <OurInputs TYPE="password" LABEL="Password:" PLACEHOLDER="Voters Password" bind:this={$universalVars.password}/>
        </div>

        <div class="max-w-fit mt-2">
            <OurButton TITLE="Sign in" on:click={login} LOGIC={$logicGates.showLoading} LOGIC_TITLE="Signing.."/>
        </div>
    </div>

    <div class="p-2 bg-slate-200 mt-5 rounded-lg" in:fly={{x:200, duration:1000}}>
        <div class="flex gap-2 justify-center">
            <p>Be a voter?</p>
            <button class="underline italic "
            on:click={() => $logicGates.showRegisterComp = true}
            >Register here</button>
        </div>
    </div>

    <div class="p-2 bg-slate-200 mt-5 rounded-lg" in:fly={{x:-200, duration:1000}}>
        <div class="flex gap-2 justify-center">
            <p>Forgot Password?</p>
            <button class="underline italic "
            on:click={() => $logicGates.showResetPassword = true}
            >Recover here</button>
        </div>
    </div>
</main>
