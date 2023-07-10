<script lang="ts">
	import { goto } from '$app/navigation';
	import { Preferences, type GetResult } from '@capacitor/preferences';
	import { jwtToken, userID } from '$lib/stores/jwt';
	import { onMount } from 'svelte';
	import bms_icon from "$lib/assets/bms-icon.png";

	onMount(() => {
		setTimeout(async () => {
			const preferencesJwtToken: GetResult = await Preferences.get({ key: 'jwtToken' });
			const preferencesUserID: GetResult = await Preferences.get({ key: 'userID' });

			if (preferencesJwtToken.value && preferencesUserID.value) {
				$jwtToken = preferencesJwtToken.value;
				$userID = preferencesUserID.value;
				goto('/home', { replaceState: true });
			} else goto('/login', { replaceState: true });
		}, 1500);
	});
</script>

<div class="flex justify-center items-center flex-grow">
	<figure id="bms-icon" class="w-48 h-48">
		<img src={bms_icon} alt="Book Management System">
	</figure>
</div>

<style>
	#bms-icon {
		animation: spin 3s ease-in-out infinite;
		animation-delay: 1s;
	}

	@keyframes spin {
		100% {
			transform: rotate(360deg);
		}
	}
</style>