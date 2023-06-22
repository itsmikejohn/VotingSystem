<svelte:options accessors />

<script>   
    export let TYPE = "text";
    export let PLACEHOLDER = "placeholder";
    export let LABEL = "label";
    export let BINDTHIS = "";
    
</script>

{#if TYPE === "text"}
    <label>
        <p class="py-2 font-semibold">{LABEL}</p>
        <input type="text" placeholder={PLACEHOLDER} class="w-full px-2 py-1 focus:outline-none border-2"
        bind:value={BINDTHIS}
        />
    </label>
{:else if TYPE === "email"}
    <label>
        <p class="py-2 font-semibold">{LABEL}</p>
        <input type="email" placeholder={PLACEHOLDER} class="w-full px-2 py-1 focus:outline-none border-2"
        bind:value={BINDTHIS}
        />
    </label>
{:else if TYPE === "number"}
    <label>
        <p class="py-2 font-semibold">{LABEL}</p>
        <input type="number" placeholder={PLACEHOLDER} class="w-full px-2 py-1 focus:outline-none border-2"
        bind:value={BINDTHIS}
        />
    </label>
{:else if TYPE === "password"}
    <label>
        <p class="py-2 font-semibold">{LABEL}</p>
        <input type="password" placeholder={PLACEHOLDER} class="w-full px-2 py-1 focus:outline-none border-2"
        bind:value={BINDTHIS}
        />
    </label>
{/if}
    