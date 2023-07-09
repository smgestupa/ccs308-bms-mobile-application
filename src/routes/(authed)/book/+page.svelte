<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { currentTitle } from "$lib/stores/currentPage";
    import { jwtToken, userID } from "$lib/stores/jwt";
    $currentTitle = "";

    const getBookInformation = async () => {
        if ($page.url.searchParams.get("id") == null) 
            goto("/home");

        const bookID: string | null = $page.url.searchParams.get("id");

        const req = await fetch(`http://localhost:8080/api/v1/books/get/${bookID}`, {
            headers: {
                "Accept": "application/json",
                "Authorization": $jwtToken,
                "userID": $userID
            }
        });
        
        if (req.status !== 200)
            goto("/home");

        const res = await req.json();

        return res["data"];
    }

</script>

<div class="flex-grow py-20">
    {#await getBookInformation() then data}
    <!-- Book background -->
    <section class="block h-60 bg-secondary -translate-y-1"></section>
    <!-- Book information -->
    <section class="relative block bg-base-100 -translate-y-3 rounded-xl p-4">
        <!-- Cover -->
        <figure class="absolute top-0 left-0 right-0 -translate-y-[60%]">
            <img class="w-[198px] h-[316px] bg-white rounded-md bg-center bg-no-repeat bg-contain mx-auto" 
            src="data:image/png;base64, {data[0]["cover"]}" 
            alt="">
        </figure>
        <!-- Title -->
        <header class="mt-32 text-center">
            <h2 class="text-lg font-bold">{data[0]["title"]}</h2>
            <!-- Genres -->
            <div class="flex gap-2 mt-4 w-full justify-center flex-wrap">
                {#each data[1] as genre, index}
                <span class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200">{genre}</span>
                {/each}
            </div>
        </header>
        <!-- Author -->
        <p class="mt-10">
            <span class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200 mr-2">Author</span>
            {data[0]["author"]}
        </p>
        <!-- Publish Date -->
        <p class="mt-10">
            <span class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200 mr-2">Publish Date</span>
            {data[0]["bookMetadata"]["publishDate"] }
        </p>
        <!-- Description -->
        <div class="mt-10">
            <p class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200 mr-2 w-fit">Description</p>
            <p class="mt-2 text-justify">{data[0]["description"]}</p>
        </div>
        <!-- Pages -->
        <p class="mt-10">
            <span class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200 mr-2">Pages</span>
            {data[0]["bookMetadata"]["pages"]}
        </p>
        <!-- Publisher -->
        <p class="mt-10">
            <span class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200 mr-2">Publisher</span>
            {data[0]["bookMetadata"]["publisher"]}
        </p>
        <!-- ISBN10 -->
        <p class="mt-10">
            <span class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200 mr-2">ISBN10</span>
            {data[0]["bookMetadata"]["isbn10"]}
        </p>
        <!-- ISBN13 -->
        <p class="mt-10">
            <span class="p-2 rounded text-xs uppercase font-bold text-white bg-base-200 mr-2">ISBN13</span>
            {data[0]["bookMetadata"]["isbn13"]}
        </p>
        <button class="btn btn-info p-2 rounded w-full mt-12 uppercase font-bold text-white">Read Book</button>
    </section>
    {/await}
</div>