<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Preferences } from '@capacitor/preferences';
	import toast from 'svelte-french-toast';
	import { currentTitle } from '$lib/stores/currentPage';
	import { jwtToken, userID } from '$lib/stores/jwt';
	import { profilePhoto } from '$lib/stores/profile';
	import magnifying_glass from '$lib/icons/magnifying_glass.svg?raw';
	import logout from '$lib/icons/logout.svg?raw';
	import house from '$lib/icons/house.svg?raw';
	import star from '$lib/icons/star.svg?raw';
	import camera from '$lib/icons/camera.svg?raw';
	import person from '$lib/icons/person.svg?raw';
	import bms_icon_inverted from '$lib/assets/bms-icon-inverted.png';

	const getUserProfile = async () => {
		const req = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/profile/get`, {
			headers: {
				Accept: 'application/json',
				Authorization: $jwtToken,
				userID: $userID
			}
		});
		const res = await req.json();

		$profilePhoto = res['data']['photo'];
	};

	const logoutUser = async () => {
		await Preferences.set({ key: 'jwtToken', value: '' });
		await Preferences.set({ key: 'userID', value: '' });
		goto('/login', { replaceState: true });
		toast.success('Successfully logged out', { position: 'bottom-center' });
	};

	$: ({ route } = $page);
</script>

<section
	class="fixed top-0 z-10 flex w-full items-center justify-between bg-base-100 p-4 drop-shadow-lg"
>
	<header>
		<h1 class="text-2xl font-bold">{$currentTitle}</h1>
	</header>
	<div class="flex items-center gap-x-4">
		<a href="/search" class="h-10 w-10 p-2">
			{@html magnifying_glass}
		</a>
		<div class="dropdown-end dropdown">
			<label tabindex="0" class="m-1">
				<div class="avatar">
					<figure class="h-10 w-10 overflow-hidden rounded-full bg-white">
						{#await getUserProfile() then _}
							<img
								src={$profilePhoto ? `data:image/png;base64, ${$profilePhoto}` : bms_icon_inverted}
								alt="Profile"
							/>
						{/await}
					</figure>
				</div>
			</label>
			<ul tabindex="0" class="dropdown-content menu z-[1] w-40 rounded bg-base-200 shadow">
				<li><a class="text-lg" href="/profile">Profile</a></li>
				<li><div class="divider my-0" /></li>
				<li>
					<button class="text-lg font-bold text-error" on:click={logoutUser}>
						<div class="h-5 w-5">{@html logout}</div>
						Logout
					</button>
				</li>
			</ul>
		</div>
	</div>
</section>

<slot />

<div class="btm-nav">
	<a href="/home" class:active={route.id === '/(authed)/home'}>
		<div class="h-5 w-5">
			{@html house}
		</div>
		<span class="btm-nav-label">Home</span>
	</a>
	<a href="/favourites" class:active={route.id === '/(authed)/favourites'}>
		<div class="h-5 w-5">
			{@html star}
		</div>
		<span class="btm-nav-label">Favourites</span>
	</a>
	<a href="/scan" class:active={route.id === '/(authed)/scan'}>
		<div class="h-5 w-5">
			{@html camera}
		</div>
		<span class="btm-nav-label">Scan</span>
	</a>
	<a
		href="/profile"
		class:active={route.id === '/(authed)/profile' || route.id === '/(authed)/profile/edit'}
	>
		<div class="h-5 w-5">
			{@html person}
		</div>
		<span class="btm-nav-label">Profile</span>
	</a>
</div>
