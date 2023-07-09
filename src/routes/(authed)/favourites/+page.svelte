<script lang="ts">
    import { currentTitle } from "$lib/stores/currentPage";
    import SkeletonBookDisplay from "$lib/components/SkeletonBookDisplay.svelte";
    import maginifying_glass from "$lib/icons/magnifying_glass.svg?raw";
    $currentTitle = "Favourites";
</script>

<div class="px-4 py-20 h-full overflow-hidden flex-grow">
    <div class="join w-full mt-4">
        <input class="input w-full input-bordered join-item rounded-l-full" placeholder="Name of the book, ISBN10, ISBN13"/>
        <button class="btn join-item rounded-r-full">
            <div class="w-5 h-5">{@html maginifying_glass}</div>
        </button>
    </div>
    <ul class="grid grid-cols-[repeat(auto-fill,_minmax(132px,_1fr))] gap-4 mt-2 h-20">
    <!-- <ul class="flex gap-x-4 mt-2 overflow-x-auto"> -->
        <li class="mx-auto"><SkeletonBookDisplay /></li>
        <li class="mx-auto"><SkeletonBookDisplay /></li>
        <li class="mx-auto"><SkeletonBookDisplay /></li>
        <li class="mx-auto"><SkeletonBookDisplay /></li>
        <li class="mx-auto"><SkeletonBookDisplay /></li>
        <li class="mx-auto"><SkeletonBookDisplay /></li>
        <li class="mx-auto"><SkeletonBookDisplay /></li>
    </ul>
</div>