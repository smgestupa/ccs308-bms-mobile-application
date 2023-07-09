<script lang="ts">
    import { currentTitle } from "$lib/stores/currentPage";
    import { jwtToken, userID } from "$lib/stores/jwt";
    import maginifying_glass from "$lib/icons/magnifying_glass.svg?raw";
	import BookDisplay from "$lib/components/BookDisplay.svelte";
	import { onMount } from "svelte";
    $currentTitle = "Favourites";
    let query: string = "",
        books: any = [];

    const getFavouriteBooks = async () => {
        const req = await fetch(`http://localhost:8080/api/v1/books/favourite/search${ query ? `?query=${query}` : ""}`, {
            headers: {
                "Accept": "application/json",
                "Authorization": $jwtToken,
                "userID": $userID
            }
        });
        const res = await req.json();

        if (req.status === 200)
            books = res["data"];
    }

    onMount(getFavouriteBooks);
</script>

<div class="px-4 py-20 h-full overflow-hidden flex-grow">
    <div class="join w-full mt-4">
        <input class="input w-full input-bordered join-item rounded-l-full" placeholder="Name of the book, ISBN10, ISBN13" bind:value={query}/>
        <button class="btn join-item rounded-r-full" on:click={getFavouriteBooks}>
            <div class="w-5 h-5">{@html maginifying_glass}</div>
        </button>
    </div>
    <ul class="grid grid-cols-[repeat(auto-fill,_minmax(132px,_1fr))] gap-4 mt-2">
    {#each books as book, index}
        <li class="mx-auto">
            <BookDisplay 
            bookID={book["bookID"]}
            cover={book["cover"]}
            title={book["title"]}
            />
        </li>
    {/each}
    </ul>
</div>