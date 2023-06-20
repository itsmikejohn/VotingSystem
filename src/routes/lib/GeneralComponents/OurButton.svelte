<script>
    export let LOGIC = false;
    export let LOGIC_TITLE = "Modify me";
    export let TITLE = "Modify Me";

</script>

<button class="bg-buttonColor text-white font-semibold px-2 py-1 w-full transition-all hover:bg-buttonSubColor active:scale-95"
on:click
>
    {#if LOGIC}
        <div class="flex items-center gap-2 justify-center">
            <p>{LOGIC_TITLE}</p>
            <div class="w-3 h-3 border-2 border-b-white border-slate-400 rounded-full transition-all animate-spin"></div>
        </div>
    {:else}
        <p>{TITLE}</p>
    {/if}
    
</button>