<script lang="ts">
	import { goto } from '$app/navigation';
	import { Preferences } from '@capacitor/preferences';
	import { jwtToken, userID } from '$lib/stores/jwt';
	import toast from 'svelte-french-toast';

	const loginUser = async (event: Event) => {
		const formData: FormData = new FormData(event.target as HTMLFormElement);
		const formEntries: any = Object.fromEntries(formData);

		try {
			const req = await fetch('http://localhost:8080/api/v1/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(formEntries)
			});
			const res = await req.json();

			if (req.status !== 200) {
				toast.error(res['message'] ?? 'Username or password is invalid', {
					position: 'bottom-center'
				});
				return;
			}

			await Preferences.set({ key: 'jwtToken', value: res['type'] + res['token'] });

			await Preferences.set({ key: 'userID', value: res['userID'] });

			$jwtToken = res['type'] + res['token'];
			$userID = res['userID'];

			toast.success('Successfully logged in', { position: 'bottom-center' });

			goto('/home', { replaceState: true });
		} catch (err) {
			toast.error('Something went wrong during login, try again later', {
				position: 'bottom-center'
			});
		}
	};
</script>

<form class="mt-40 bg-base-100 px-4" on:submit={loginUser}>
	<div class="form-control w-full">
		<label class="label" for="username">
			<span class="label-text font-bold uppercase text-gray-400"
				>Username <span class="text-red-500">*</span></span
			>
		</label>
		<input class="input-bordered input w-full" type="text" name="username" required />
	</div>
	<div class="form-control mt-4 w-full">
		<label class="label" for="password">
			<span class="label-text font-bold uppercase text-gray-400"
				>Password <span class="text-red-500">*</span></span
			>
		</label>
		<input class="input-bordered input w-full" type="password" name="password" required />
	</div>
	<button class="btn-secondary btn mt-8 w-full"
		><span class="font-bold normal-case text-base-100">Log in</span></button
	>
	<p class="mt-4">
		Don't have an account? <a class="link-info link font-bold" href="/register">Register instead</a>
	</p>
</form>
