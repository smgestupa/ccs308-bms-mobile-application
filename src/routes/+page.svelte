<script lang="ts">
    import { goto } from "$app/navigation";
    import { Preferences, type GetResult } from "@capacitor/preferences";
    import { jwtToken, userID } from "$lib/stores/jwt";
	import { onMount } from "svelte";

    onMount(() => {
        setTimeout(async () => {
            const preferencesJwtToken: GetResult = await Preferences.get({ key: "jwtToken" });
            const preferencesUserID: GetResult = await Preferences.get({ key: "userID" });

            if (preferencesJwtToken.value && preferencesUserID.value) {
                $jwtToken = preferencesJwtToken.value;
                $userID = Number(preferencesUserID.value);
                goto("/home", { replaceState: true });
            } 
            else 
                goto("/login", { replaceState: true });
        }, 1500);
    });
</script>

<p>RAAAAH</p>