<script lang="ts">
    import { currentTitle } from "$lib/stores/currentPage";
    import SkeletonBookDisplay from "$lib/components/SkeletonBookDisplay.svelte";
    import BookDisplay from "$lib/components/BookDisplay.svelte";
    $currentTitle = "Home";
</script>

<div class="px-4 py-20 flex-grow">
    <header class="mt-4">
        <h1 class="text-2xl font-bold">Hello, Shawn Michael 👋</h1>
        <h2 class="font-bold text-gray-400 mt-2">What do you want to read today?</h2>
    </header>

    <!-- List of `favourite books` -->
    <section class="mt-8">
        <header>
            <h1 class="font-bold uppercase">Favourite Books</h1>
        </header>
        <ul class="flex gap-x-4 mt-2 overflow-x-hidden">
        <!-- <ul class="flex gap-x-4 mt-2 overflow-x-auto"> -->
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
        </ul>
    </section>

    <!-- List of `trending now` -->
    <section class="mt-6">
        <header>
            <h1 class="font-bold uppercase">Trending Now</h1>
        </header>
        <ul class="flex gap-x-4 mt-2 overflow-x-hidden">
        <!-- <ul class="flex gap-x-4 mt-2 overflow-x-auto"> -->
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
        </ul>
    </section>

    <!-- List of `recommended for you` -->
    <section class="mt-6">
        <header>
            <h1 class="font-bold uppercase">Recommended for You</h1>
        </header>
        <ul class="flex gap-x-4 mt-2 overflow-x-hidden">
        <!-- <ul class="flex gap-x-4 mt-2 overflow-x-auto"> -->
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
        </ul>
    </section>

    
    <!-- Miscellaneous recommended area -->
    <div class="h-full bg-base-200 p-4 drop-shadow min-h-[8rem] mt-8 rounded">
        <!-- List of `fantasy books for you` -->
        <section>
            <header>
                <h1 class="font-bold uppercase">Fantasy Books for You</h1>
            </header>
            <ul class="flex gap-x-4 mt-2 overflow-x-auto">
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
            </ul>
        </section>

        <!-- List of `horror books for you` -->
        <section class="mt-6">
            <header>
                <h1 class="font-bold uppercase">Horror Books for You</h1>
            </header>
            <ul class="flex gap-x-4 mt-2 overflow-x-auto">
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
            </ul>
        </section>

        <!-- List of `adventure books for you` -->
        <section class="mt-6">
            <header>
                <h1 class="font-bold uppercase">Adventure Books for You</h1>
            </header>
            <ul class="flex gap-x-4 mt-2 overflow-x-auto">
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
            </ul>
        </section>

        <!-- List of `romance books for you` -->
        <section class="mt-6">
            <header>
                <h1 class="font-bold uppercase">Romance Books for You</h1>
            </header>
            <ul class="flex gap-x-4 mt-2 overflow-x-auto">
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
            </ul>
        </section>

        <!-- List of `mystery books for you` -->
        <section class="mt-6">
            <header>
                <h1 class="font-bold uppercase">Mystery Books for You</h1>
            </header>
            <ul class="flex gap-x-4 mt-2 overflow-x-auto">
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
                <li><BookDisplay /></li>
            </ul>
        </section>
    </div>
</div>