<script>
    import { fly } from "svelte/transition";


</script>

<main class="p-4 sm:max-w-7xl mx-auto" in:fly={{x:-200, duration:600}}>
    <p class="text-2xl font-semibold py-4">Dashboard</p>
    <div class="flex flex-col gap-4 sm:flex-row ">
        <div class="">
            <div class="bg-blue-500 p-10">
                <p class="text-white font-bold text-xl">0</p>
                <p class="">No. of Positions</p>
            </div>
    
            <p class="bg-blue-300 text-center font-semibold">More Info</p>
        </div>
    
        <div class="">
            <div class="bg-green-500 p-10">
                <p class="text-white font-bold text-xl">0</p>
                <p class="">No. of Candidates</p>
            </div>
    
            <p class="bg-green-300 text-center font-semibold">More Info</p>
        </div>
    
        <div class="">
            <div class="bg-orange-500 p-10">
                <p class="text-white font-bold text-xl">0</p>
                <p class="">Total Voters</p>
            </div>
    
            <p class="bg-orange-300 text-center font-semibold">More Info</p>
        </div>
    
        <div class="">
            <div class="bg-red-500 p-10">
                <p class="text-white font-bold text-xl">0</p>
                <p class="">Voters Voted</p>
            </div>
    
            <p class="bg-red-300 text-center font-semibold">More Info</p>
        </div>
    </div>
    

    
</main>