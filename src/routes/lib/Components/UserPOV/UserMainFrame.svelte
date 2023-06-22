<script>
    import Nav from "../StaticPOV/StaticBound/Nav.svelte";
    import Dashboard from "./Reports/Dashboard.svelte";
    import { universalVars } from "../../StateManagement/staticStates";
    import Voters from "./Manage/Voters.svelte";


</script>

<main>
    <Nav />

    {#if $universalVars.activeItem === "Dashboard"}
        <div class="mt-20">
            <Dashboard />
        </div>
    {:else if $universalVars.activeItem === "Votes"}
        <div class="mt-20">
            Votes
        </div>
    {:else if $universalVars.activeItem === "Voters"}
        <div class="mt-20">
            <Voters />
        </div>
    {:else if $universalVars.activeItem === "Positions"}
        <div class="mt-20">
            positions
        </div>
    {:else if $universalVars.activeItem === "Candidates"}
        <div class="mt-20">
            Candidates
        </div>
    {/if}

</main>