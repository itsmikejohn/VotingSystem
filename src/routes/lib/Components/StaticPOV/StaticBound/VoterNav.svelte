<script>
    import OurButton from "../../../GeneralComponents/OurButton.svelte";


    //database calls and hooks
    import { auth, db } from "../../../DB/firebase";
    import { signOut } from "firebase/auth";
    
</script>

<nav class="bg-[#3c8db9] p-2 fixed top-0 w-full flex items-center justify-center gap-2">
    <div class="flex items-center gap-2 text-white font-semibold w-full">
        <img src={auth.currentUser?.photoURL} alt="loading" class="w-10 rounded-full bg-blue-300"/>
        <p>{auth.currentUser?.displayName}</p>
    </div>

    <div class="">
        <OurButton TITLE="Logout" on:click={() => signOut(auth)}/>
    </div>
</nav>