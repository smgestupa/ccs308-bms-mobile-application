<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { currentTitle } from "$lib/stores/currentPage";
    $currentTitle = "";

    const getBookInformation = async () => {
        if ($page.url.searchParams.get("id") == null) 
            goto("/home");

        const bookID: string | null = $page.url.searchParams.get("id");

        const req = await fetch(`http://localhost:8080/api/v1/books/get/${bookID}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "userID": "2560"
            }
        });
        
        if (req.status !== 200)
            goto("/home");

        const res = await req.json();

        return res;
    }

</script>

<div class="flex-grow py-20">
    {#await getBookInformation()}
    {:then _}
    {/await}
    <!-- Book background -->
    <section class="block h-60 bg-secondary -translate-y-1"></section>
    <!-- Book information -->
    <section class="relative block bg-base-100 -translate-y-3 rounded-xl p-4">
        <!-- Cover -->
        <figure class="absolute top-0 left-0 right-0 -translate-y-[60%]">
            <img class="w-[198px] h-[316px] bg-white rounded-md bg-center bg-no-repeat bg-contain mx-auto" 
            src="" 
            alt="">
        </figure>
        <!-- Title -->
        <header class="mt-32 text-center">
            <h2 class="text-lg font-bold">Harry Potter and The Goblin Gold Movie Blah</h2>
            <!-- Genres -->
            <div class="flex gap-2 mt-4 w-full justify-center flex-wrap">
                <span class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200">Fantasy</span>
                <span class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200">Horror</span>
            </div>
        </header>
        <!-- Author -->
        <p class="mt-10">
            <span class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200 mr-2">Author</span>
            Loading...
        </p>
        <!-- Publish Date -->
        <p class="mt-10">
            <span class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200 mr-2">Publish Date</span>
            Loading...
        </p>
        <!-- Description -->
        <div class="mt-10">
            <p class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200 mr-2 w-fit">Description</p>
            <p class="mt-2">Loading...</p>
        </div>
        <!-- Pages -->
        <p class="mt-10">
            <span class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200 mr-2">Pages</span>
            Loading...
        </p>
        <!-- Publisher -->
        <p class="mt-10">
            <span class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200 mr-2">Publisher</span>
            Loading...
        </p>
        <!-- ISBN10 -->
        <p class="mt-10">
            <span class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200 mr-2">ISBN10</span>
            Loading...
        </p>
        <!-- ISBN13 -->
        <p class="mt-10">
            <span class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200 mr-2">ISBN13</span>
            Loading...
        </p>
        <button class="btn btn-info p-2 rounded w-full mt-12 uppercase font-bold text-white">Read Book</button>
    </section>
</div>