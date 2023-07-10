<script lang="ts">
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import arrow_left_circle from '$lib/icons/arrow_left_circle.svg?raw';
	import fantasy_img from '$lib/assets/genres/fantasy.jpg';
	import horror_img from '$lib/assets/genres/horror.jpg';
	import adventure_img from '$lib/assets/genres/adventure.jpg';
	import romance_img from '$lib/assets/genres/romance.jpg';
	import mystery_img from '$lib/assets/genres/mystery.jpg';
	let step: number = 0,
		firstName: string = '',
		lastName: string = '',
		bio: string = '',
		username: string = '',
		password: string = '',
		fantasy: boolean = false,
		horror: boolean = false,
		adventure: boolean = false,
		romance: boolean = false,
		mystery: boolean = false;

	const increaseStep = () => {
		if (step + 1 > 3) return;
		step += 1;
	};

	const decreaseStep = () => {
		if (step - 1 < 0) return;
		step -= 1;
	};

	const registerUser = async () => {
		let genres: Array<string> = [];

		if (fantasy) genres.push('fantasy');
		if (horror) genres.push('horror');
		if (adventure) genres.push('adventure');
		if (romance) genres.push('romance');
		if (mystery) genres.push('mystery');

		if (genres.length !== 3) {
			toast.error('You must only choose three genres before proceeding', {
				position: 'bottom-center'
			});
			return;
		}

		const user: any = {
			username,
			password,
			roles: ['user'],
			firstName,
			lastName,
			bio,
			genres
		};

		try {
			const req = await fetch('http://localhost:8080/api/v1/users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(user)
			});
			const res = await req.json();

			if (req.status !== 200) {
				toast.error(res['message'], { position: 'bottom-center' });
				return;
			}

			toast.success(res['message'], { position: 'bottom-center' });
			goto('/login', { replaceState: true });
		} catch (err) {
			toast.error('Something went wrong during register, try again later', {
				position: 'bottom-center'
			});
		}
	};
</script>

<div class="mt-40 bg-base-100 px-4 pb-16">
	<ul class="steps mb-4 w-full">
		<li class="step" class:step-primary={step >= 0}>Personal</li>
		<li class="step" class:step-primary={step >= 1}>Account</li>
		<li class="step" class:step-primary={step >= 2}>Genre</li>
	</ul>
	{#if step === 0}
		<a class="btn-ghost btn flex w-fit items-center gap-x-2 px-0 text-lg" href="/login">
			<div class="h-5 w-5">{@html arrow_left_circle}</div>
			Go Back
		</a>
		<form on:submit={increaseStep}>
			<div class="form-control mt-4 w-full">
				<label class="label" for="firstName">
					<span class="label-text font-bold uppercase text-gray-400"
						>First Name <span class="text-red-500">*</span></span
					>
				</label>
				<input
					class="input-bordered input w-full"
					type="text"
					name="firstName"
					bind:value={firstName}
					required
				/>
			</div>
			<div class="form-control mt-4 w-full">
				<label class="label" for="lastName">
					<span class="label-text font-bold uppercase text-gray-400"
						>Last Name <span class="text-red-500">*</span></span
					>
				</label>
				<input
					class="input-bordered input w-full"
					type="text"
					name="lastName"
					bind:value={lastName}
					required
				/>
			</div>
			<div class="form-control mt-4 w-full">
				<label class="label" for="bio">
					<span class="label-text font-bold uppercase text-gray-400">Describe yourself</span>
				</label>
				<textarea class="textarea-bordered textarea h-24" bind:value={bio} />
			</div>
			<button class="btn-accent btn mt-8 w-full font-bold normal-case">Next Step</button>
		</form>
	{:else if step === 1}
		<button class="btn-ghost btn flex items-center gap-x-2 px-0 text-lg" on:click={decreaseStep}>
			<div class="h-5 w-5">{@html arrow_left_circle}</div>
			Go Back
		</button>
		<form on:submit={increaseStep}>
			<div class="form-control mt-4 w-full">
				<label class="label" for="username">
					<span class="label-text font-bold uppercase text-gray-400"
						>Username <span class="text-red-500">*</span></span
					>
				</label>
				<input
					class="input-bordered input w-full"
					type="text"
					name="username"
					bind:value={username}
					required
				/>
			</div>
			<div class="form-control mt-4 w-full">
				<label class="label" for="password">
					<span class="label-text font-bold uppercase text-gray-400"
						>Password <span class="text-red-500">*</span></span
					>
				</label>
				<input
					class="input-bordered input w-full"
					type="password"
					name="password"
					bind:value={password}
					required
				/>
			</div>
			<button class="btn-accent btn mt-8 w-full font-bold normal-case">Next Step</button>
		</form>
	{:else if step === 2}
		<button class="btn-ghost btn flex items-center gap-x-2 px-0 text-lg" on:click={decreaseStep}>
			<div class="h-5 w-5">{@html arrow_left_circle}</div>
			Go Back
		</button>
		<div class="grid grid-cols-2 gap-2">
			<button
				class="card card-compact transition-all duration-200 hover:-translate-y-1 hover:bg-base-200"
				on:click={(_) => (fantasy = !fantasy)}
				class:active={fantasy}
			>
				<figure class="px-4 pt-4">
					<img
						class="object-fit h-[154px] w-full rounded-lg border border-base-content border-opacity-5 bg-base-300"
						src={fantasy_img}
						alt="Fantasy"
					/>
				</figure>
				<div class="card-body">
					<h2 class="card-title">Fantasy</h2>
				</div>
			</button>
			<button
				class="card-compact card transition-all duration-200 hover:-translate-y-1 hover:bg-red-500"
				on:click={(_) => (horror = !horror)}
				class:active={horror}
			>
				<figure class="px-4 pt-4">
					<img
						class="h-[154px] w-full rounded-lg border border-base-content border-opacity-5 bg-base-300"
						src={horror_img}
						alt="Horror"
					/>
				</figure>
				<div class="card-body">
					<h2 class="card-title">Horror</h2>
				</div>
			</button>
			<button
				class="card-compact card transition-all duration-200 hover:-translate-y-1 hover:bg-red-500"
				on:click={(_) => (adventure = !adventure)}
				class:active={adventure}
			>
				<figure class="px-4 pt-4">
					<img
						class="h-[154px] w-full rounded-lg border border-base-content border-opacity-5 bg-base-300"
						src={adventure_img}
						alt="Adventure"
					/>
				</figure>
				<div class="card-body">
					<h2 class="card-title">Adventure</h2>
				</div>
			</button>
			<button
				class="card-compact card transition-all duration-200 hover:-translate-y-1 hover:bg-red-500"
				on:click={(_) => (romance = !romance)}
				class:active={romance}
			>
				<figure class="px-4 pt-4">
					<img
						class="h-[154px] w-full rounded-lg border border-base-content border-opacity-5 bg-base-300"
						src={romance_img}
						alt="Romance"
					/>
				</figure>
				<div class="card-body">
					<h2 class="card-title">Romance</h2>
				</div>
			</button>
			<button
				class="card-compact card transition-all duration-200 hover:-translate-y-1 hover:bg-red-500"
				on:click={(_) => (mystery = !mystery)}
				class:active={mystery}
			>
				<figure class="px-4 pt-4">
					<img
						class="h-[154px] w-full rounded-lg border border-base-content border-opacity-5 bg-base-300"
						src={mystery_img}
						alt="Mystery"
					/>
				</figure>
				<div class="card-body">
					<h2 class="card-title">Mystery</h2>
				</div>
			</button>
		</div>
		<button class="btn-secondary btn mt-8 w-full" on:click={registerUser}>
			<span class="font-bold normal-case text-base-100">Complete Register</span>
		</button>
	{/if}
</div>

<style>
	.grid > .card.active {
		--tw-translate-y: -0.25rem /* -4px */;
		background-color: hsl(var(--b2) / 1);
		transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate))
			skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
			scaleY(var(--tw-scale-y));
	}
</style>
