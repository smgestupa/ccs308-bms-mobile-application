<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import { currentTitle } from '$lib/stores/currentPage';
	import { jwtToken, userID } from '$lib/stores/jwt';
	import bookmark from "$lib/icons/bookmark.svg?raw";
	$currentTitle = '';

	const getBookInformation = async () => {
		if ($page.url.searchParams.get('id') == null) goto('/home');

		const bookID: string | null = $page.url.searchParams.get('id');

		const req = await fetch(`http://localhost:8080/api/v1/books/get/${bookID}`, {
			headers: {
				Accept: 'application/json',
				Authorization: $jwtToken,
				userID: $userID
			}
		});

		if (req.status !== 200) goto('/home');

		const res = await req.json();

		return res['data'];
	};

	const favouriteBook = async () => {
		const bookID: string | null = $page.url.searchParams.get('id');

		const req = await fetch(`http://localhost:8080/api/v1/books/favourite/${bookID}`, {
			headers: {
				Accept: 'application/json',
				Authorization: $jwtToken,
				userID: $userID
			}
		});
		const res = await req.json();

		if (req.status !== 200) goto('/home');

		if (req.status === 200)
			toast.success(res["message"], { position: "bottom-center" });
	};
</script>

<div class="flex-grow py-20">
	{#await getBookInformation() then data}
		<!-- Book background -->
		<section class="block h-60 -translate-y-1 bg-secondary" />
		<!-- Book information -->
		<section class="relative block -translate-y-3 rounded-xl bg-base-100 p-4">
			<!-- Cover -->
			<figure class="absolute left-0 right-0 top-0 -translate-y-[60%]">
				<img
					class="mx-auto h-[316px] w-[198px] rounded-md bg-white bg-contain bg-center bg-no-repeat"
					src="data:image/png;base64, {data[0]['cover']}"
					alt=""
				/>
			</figure>
			<!-- Title -->
			<header class="mt-32 text-center">
				<h2 class="text-lg font-bold">{data[0]['title']}</h2>
				<!-- Genres -->
				<div class="mt-4 flex w-full flex-wrap justify-center gap-2">
					{#each data[1] as genre, index}
						<span class="rounded bg-base-200 p-2 text-xs font-bold uppercase text-white"
							>{genre}</span
						>
					{/each}
				</div>
			</header>
			<!-- Author -->
			<p class="mt-10">
				<span class="mr-2 rounded bg-base-200 p-2 text-xs font-bold uppercase text-white"
					>Author</span
				>
				{data[0]['author']}
			</p>
			<!-- Publish Date -->
			<p class="mt-10">
				<span class="mr-2 rounded bg-base-200 p-2 text-xs font-bold uppercase text-white"
					>Publish Date</span
				>
				{data[0]['bookMetadata']['publishDate']}
			</p>
			<!-- Description -->
			<div class="mt-10">
				<p class="mr-2 w-fit rounded bg-base-200 p-2 text-xs font-bold uppercase text-white">
					Description
				</p>
				<p class="mt-2 text-justify">{data[0]['description']}</p>
			</div>
			<!-- Pages -->
			<p class="mt-10">
				<span class="mr-2 rounded bg-base-200 p-2 text-xs font-bold uppercase text-white"
					>Pages</span
				>
				{data[0]['bookMetadata']['pages']}
			</p>
			<!-- Publisher -->
			<p class="mt-10">
				<span class="mr-2 rounded bg-base-200 p-2 text-xs font-bold uppercase text-white"
					>Publisher</span
				>
				{data[0]['bookMetadata']['publisher']}
			</p>
			<!-- ISBN10 -->
			<p class="mt-10">
				<span class="mr-2 rounded bg-base-200 p-2 text-xs font-bold uppercase text-white"
					>ISBN10</span
				>
				{data[0]['bookMetadata']['isbn10']}
			</p>
			<!-- ISBN13 -->
			<p class="mt-10">
				<span class="mr-2 rounded bg-base-200 p-2 text-xs font-bold uppercase text-white"
					>ISBN13</span
				>
				{data[0]['bookMetadata']['isbn13']}
			</p>
			<div class="flex w-full gap-x-2">
				<button class="btn-info btn mt-12 flex-grow rounded p-2 font-bold uppercase text-white"
					>Read Book</button
				>
				<button class="btn-success btn mt-12 w-14 rounded p-2 font-bold uppercase text-white"
				on:click={favouriteBook}><div class="w-5 h-5">{@html bookmark}</div></button
				>
			</div>
		</section>
	{/await}
</div>
