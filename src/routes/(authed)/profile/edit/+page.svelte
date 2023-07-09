<script lang="ts">
	import { goto } from '$app/navigation';
	import { Camera, CameraResultType } from '@capacitor/camera';
	import toast from 'svelte-french-toast';
	import { currentTitle } from '$lib/stores/currentPage';
	import { jwtToken, userID } from '$lib/stores/jwt';
	import { profilePhoto } from '$lib/stores/profile';
	import edit from '$lib/icons/edit.svg?raw';
	$currentTitle = 'Profile';
	let photo: string = '',
		firstName: string = '',
		lastName: string = '',
		bio: string = '';

	const uploadPhoto = async () => {
		const image = await Camera.getPhoto({
			quality: 100,
			allowEditing: true,
			resultType: CameraResultType.Base64
		});

		if (image.base64String) photo = image.base64String;
	};

	const getUserProfile = async () => {
		const req = await fetch('http://localhost:8080/api/v1/users/profile/get', {
			headers: {
				Accept: 'application/json',
				Authorization: $jwtToken,
				userID: $userID
			}
		});
		const res = await req.json();
		const data = res.data;

		if (data['photo']) photo = data['photo'];

		firstName = data['firstName'];
		lastName = data['lastName'];
		bio = data['bio'];

		return data;
	};

	const editUserProfile = async () => {
		const user = {
			userID: $userID,
			photo,
			firstName,
			lastName,
			bio
		};

		const req = await fetch('http://localhost:8080/api/v1/users/profile/edit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: $jwtToken,
				userID: $userID
			},
			body: JSON.stringify(user)
		});
		const res = await req.json();

		if (req.status === 200) {
			toast.success(res['message'], { position: 'bottom-center' });
			$profilePhoto = photo;
			goto('/profile', { replaceState: true });
		}
	};
</script>

<div class="flex-grow py-20">
	{#await getUserProfile() then data}
		<section class="relative h-36 bg-secondary">
			<button class="avatar absolute bottom-0 translate-y-14 px-4" on:click={uploadPhoto}>
				<figure class="h-28 w-28 overflow-hidden rounded-full bg-black">
					<img
						src={photo !== '' ? `data:image/png;base64, ${photo}` : '/favicon.png'}
						alt="Profile"
					/>
				</figure>
			</button>
		</section>

		<section class="mt-4 flex gap-x-2 pl-36">
			<button class="btn-success btn-sm btn w-full max-w-fit" on:click={editUserProfile}>
				<div class="h-5 w-5">{@html edit}</div>
				Confirm Edit
			</button>
		</section>

		<section class="mt-8 px-4">
			<p class="break-words text-3xl font-bold">{data['firstName'] + ' ' + data['lastName']}</p>
			<div class="mt-4 flex w-full max-w-full justify-between gap-x-2">
				<div class="form-control w-1/2">
					<label class="label">
						<span class="label-text font-bold uppercase text-gray-400">First Name</span>
					</label>
					<input
						type="text"
						placeholder="e.g. John"
						class="input-bordered input w-full max-w-xs break-words"
						bind:value={firstName}
					/>
				</div>
				<div class="form-control w-1/2">
					<label class="label">
						<span class="label-text font-bold uppercase text-gray-400">Last Name</span>
					</label>
					<input
						type="text"
						placeholder="e.g. Doe"
						class="input-bordered input w-full max-w-xs break-words"
						bind:value={lastName}
					/>
				</div>
			</div>
			<div class="form-control mt-8">
				<label class="label">
					<span class="label-text font-bold uppercase text-gray-400">Bio</span>
				</label>
				<textarea
					class="textarea-bordered textarea h-full min-h-[8rem] resize-none"
					placeholder="e.g. My name is Yoshikage Kira. I'm 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married."
					bind:value={bio}
				/>
			</div>
		</section>
	{/await}
</div>
