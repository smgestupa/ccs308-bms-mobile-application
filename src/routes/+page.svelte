<script lang="ts">
    import { goto } from "$app/navigation";
    import { Preferences, type GetResult } from "@capacitor/preferences";
	import { onMount } from "svelte";

    onMount(() => {
        setTimeout(async () => {
            const jwtToken: GetResult = await Preferences.get({ key: "jwtToken" });

            if (jwtToken.value) goto("/home", { replaceState: true });
            else goto("/login", { replaceState: true });
        }, 1500);
    });
</script>

<p>RAAAAH</p>