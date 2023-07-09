<script lang="ts">
    import { currentTitle } from "$lib/stores/currentPage";
    import SkeletonBookDisplay from "$lib/components/SkeletonBookDisplay.svelte";
    import BookDisplay from "$lib/components/BookDisplay.svelte";
    import { jwtToken, userID } from "$lib/stores/jwt";
    $currentTitle = "Home";

    const getUserProfile = async () => {
        const req = await fetch("http://localhost:8080/api/v1/users/profile/get", {
            headers: {
                "Accept": "application/json",
                "Authorization": $jwtToken,
                "userID": $userID
            }
        });
        const res = await req.json();

        return res.data;
    }

    const getFavouriteBooks = async () => {
        const req = await fetch("http://localhost:8080/api/v1/books/favourite/list", {
            headers: {
                "Accept": "application/json",
                "Authorization": $jwtToken,
                "userID": $userID
            }
        });
        const res = await req.json();

        return res.data;
    }

    const getTrendingBooks = async () => {
        const req = await fetch("http://localhost:8080/api/v1/books/trending/list", {
            headers: {
                "Accept": "application/json",
                "Authorization": $jwtToken
            }
        });
        const res = await req.json();

        return res.data;
    }

    const getRecommendedBooks = async () => {
        const req = await fetch("http://localhost:8080/api/v1/books/recommend", {
            headers: {
                "Accept": "application/json",
                "Authorization": $jwtToken,
                "userID": $userID
            }
        });
        const res = await req.json();

        return res.data;
    }
</script>

<div class="px-4 py-20 flex-grow">
    <header class="mt-4">
        {#await getUserProfile() then data}
            <h1 class="text-2xl font-bold">Hello, {data["firstName"]} 👋</h1>
        {/await}
        <h2 class="font-bold text-gray-400 mt-2">What do you want to read today?</h2>
    </header>

    <!-- List of `favourite books` -->
    <section class="mt-8">
        <header>
            <h1 class="font-bold uppercase">Favourite Books</h1>
        </header>
        {#await getFavouriteBooks()}
        <ul class="flex gap-x-4 mt-2 overflow-x-hidden">
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
        </ul>
        {:then data}
            {#if data.length === 0}
            <ul class="flex gap-x-4 mt-2 overflow-x-auto">
                <li><SkeletonBookDisplay /></li>
                <li><SkeletonBookDisplay /></li>
                <li><SkeletonBookDisplay /></li>
                <li><SkeletonBookDisplay /></li>
            </ul>
            {:else}
            <ul class="flex gap-x-4 mt-2 overflow-x-auto">
                {#each data as book, index}
                <li><BookDisplay 
                    bookID={book["bookID"]}
                    cover={book["cover"]}
                    title={book["title"]}
                /></li>
                {/each}
            </ul>
            {/if}
        {/await}
    </section>

    <!-- List of `trending now` -->
    <section class="mt-6">
        <header>
            <h1 class="font-bold uppercase">Trending Now</h1>
        </header>
        {#await getTrendingBooks()}
        <ul class="flex gap-x-4 mt-2 overflow-x-hidden">
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
        </ul>
        {:then data}
            {#if data.length === 0}
            <ul class="flex gap-x-4 mt-2 overflow-x-auto">
                <li><SkeletonBookDisplay /></li>
                <li><SkeletonBookDisplay /></li>
                <li><SkeletonBookDisplay /></li>
                <li><SkeletonBookDisplay /></li>
            </ul>
            {:else}
            <ul class="flex gap-x-4 mt-2 overflow-x-auto">
                {#each data as book, index}
                <li><BookDisplay 
                    bookID={book["bookID"]}
                    cover={book["cover"]}
                    title={book["title"]}
                /></li>
                {/each}
            </ul>
            {/if}
        {/await}
    </section>

    <!-- List of `recommended for you` -->
    <section class="mt-6">
        <header>
            <h1 class="font-bold uppercase">Recommended for You</h1>
        </header>
        {#await getRecommendedBooks()}
        <ul class="flex gap-x-4 mt-2 overflow-x-hidden">
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
            <li><SkeletonBookDisplay /></li>
        </ul>
        {:then data}
            {#if data.length === 0}
            <ul class="flex gap-x-4 mt-2 overflow-x-auto">
                <li><SkeletonBookDisplay /></li>
                <li><SkeletonBookDisplay /></li>
                <li><SkeletonBookDisplay /></li>
                <li><SkeletonBookDisplay /></li>
            </ul>
            {:else}
            <ul class="flex gap-x-4 mt-2 overflow-x-auto">
                {#each data as book, index}
                <li><BookDisplay 
                    bookID={book["bookID"]}
                    cover={book["cover"]}
                    title={book["title"]}
                /></li>
                {/each}
            </ul>
            {/if}
        {/await}
    </section>
</div>