<script>
    import { goto } from "$app/navigation";
    import { jwtToken } from "$lib/stores/jwt";
	import { onMount } from "svelte";

    onMount(() => {
        setTimeout(() => {
            if ($jwtToken) goto("/home", { replaceState: true });
            else goto("/login", { replaceState: true });
        }, 1500);
    });
</script>

<p>RAAAAH</p>