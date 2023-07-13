<script lang="ts">
	import bms_icon_inverted from '$lib/assets/bms-icon-inverted.png';
	export let bookID: number, cover: string, title: string;
</script>

<a class="card card-compact h-fit w-fit rounded-none p-1" href="/book?id={bookID}">
	<figure>
		<img
			class="mx-auto h-[211px] w-[132px] rounded-md bg-white bg-contain bg-center bg-no-repeat"
			src={cover ? `data:image/png;base64, ${cover}` : bms_icon_inverted}
			alt=""
		/>
	</figure>
	<p
		class="card-title mt-2 inline-block w-[132px] overflow-hidden text-ellipsis whitespace-nowrap text-sm"
	>
		{title}
	</p>
</a>
