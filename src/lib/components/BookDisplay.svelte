<script lang="ts">
    export let bookID: number, cover: string, title: string;
</script>

<a class="card card-compact w-fit h-fit p-1 rounded-none"
href="/book?id={bookID}">
    <figure>
        <img class="w-[132px] h-[211px] bg-white rounded-md bg-center bg-no-repeat bg-contain mx-auto" 
        src="data:image/png;base64, {cover}" 
        alt="">
    </figure>
    <p class="card-title inline-block mt-2 text-ellipsis overflow-hidden w-[132px] text-sm whitespace-nowrap">{title}</p>
</a>