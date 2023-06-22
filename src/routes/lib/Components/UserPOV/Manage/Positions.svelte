<script>
    import { fly } from "svelte/transition";
    import OurButton from "../../../GeneralComponents/OurButton.svelte";
</script>


<main class="p-4" in:fly={{x:-200, duration:600}}>
    <p class="text-2xl font-semibold py-4">Positions</p>
    <div class="">
        <div class="border-t-4 border-2 p-2">
            <div class="flex gap-2 my-2">
                <div class="w-full">
                    <div class="max-w-fit">
                        <OurButton TITLE="+ New" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
