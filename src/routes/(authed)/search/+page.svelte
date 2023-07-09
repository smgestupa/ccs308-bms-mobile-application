<script lang="ts">
	import { page } from '$app/stores';
	import { currentTitle } from '$lib/stores/currentPage';
	import { jwtToken, userID } from '$lib/stores/jwt';
	import maginifying_glass from '$lib/icons/magnifying_glass.svg?raw';
	import BookDisplay from '$lib/components/BookDisplay.svelte';
	import { onMount } from 'svelte';
	$currentTitle = 'Search';
	let query: string = $page.url.searchParams.get('query') ?? '',
		books: any = [];

	const getBooks = async () => {
		const req = await fetch(
			`http://localhost:8080/api/v1/books/search${query ? `?query=${query}` : ''}`,
			{
				headers: {
					Accept: 'application/json',
					Authorization: $jwtToken,
					userID: $userID
				}
			}
		);
		const res = await req.json();

		if (req.status === 200) books = res['data'];
	};

	onMount(getBooks);
</script>

<div class="h-full flex-grow px-4 py-20">
	<div class="join mt-4 w-full">
		<input
			class="input-bordered input join-item w-full rounded-l-full"
			placeholder="Name of the book, ISBN10, ISBN13"
			bind:value={query}
		/>
		<button class="join-item btn rounded-r-full" on:click={getBooks}>
			<div class="h-5 w-5">{@html maginifying_glass}</div>
		</button>
	</div>
	<ul class="mt-2 grid grid-cols-[repeat(auto-fill,_minmax(132px,_1fr))] gap-4">
		{#each books as book, index}
			<li class="mx-auto">
				<BookDisplay bookID={book['bookID']} cover={book['cover']} title={book['title']} />
			</li>
		{/each}
	</ul>
</div>
