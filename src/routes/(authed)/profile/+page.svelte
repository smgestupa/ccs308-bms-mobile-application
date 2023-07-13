<script lang="ts">
	import { currentTitle } from '$lib/stores/currentPage';
	import { jwtToken, userID } from '$lib/stores/jwt';
	import edit from '$lib/icons/edit.svg?raw';
	$currentTitle = 'Profile';
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

		return res.data;
	};
</script>

<div class="flex-grow py-20">
	{#await getUserProfile() then data}
		<section class="relative h-36 bg-secondary">
			<button class="avatar absolute bottom-0 translate-y-14 px-4">
				<figure class="h-28 w-28 overflow-hidden rounded-full bg-white">
					<img
						src={data['photo'] ? `data:image/png;base64, ${data['photo']}` : bms_icon_inverted}
						alt="Profile"
					/>
				</figure>
			</button>
		</section>

		<section class="mt-4 flex gap-x-2 pl-36">
			<a href="/profile/edit" class="btn-info btn-sm btn max-w-fit">
				<div class="h-5 w-5">{@html edit}</div>
				Edit Profile
			</a>
		</section>

		<section class="mt-8 px-4">
			<p class="break-words text-3xl font-bold">{data['firstName'] + ' ' + data['lastName']}</p>
			<div class="mt-4 flex w-full max-w-full justify-between gap-x-2">
				<div class="form-control w-1/2">
					<label class="label">
						<span class="label-text font-bold uppercase text-gray-400">First Name</span>
					</label>
					<p class="w-full max-w-xs break-words text-xl">{data['firstName']}</p>
				</div>
				<div class="form-control w-1/2">
					<label class="label">
						<span class="label-text font-bold uppercase text-gray-400">Last Name</span>
					</label>
					<p class="w-full max-w-xs break-words text-xl">{data['lastName']}</p>
				</div>
			</div>
			<div class="form-control mt-8">
				<label class="label">
					<span class="label-text font-bold uppercase text-gray-400">Bio</span>
				</label>
				<textarea
					class="textarea-bordered textarea h-full min-h-[8rem] resize-none"
					placeholder="This user does not have a default bio"
					disabled>{data['bio']}</textarea
				>
			</div>
		</section>
	{/await}
</div>
