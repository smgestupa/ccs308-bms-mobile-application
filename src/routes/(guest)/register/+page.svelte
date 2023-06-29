<script lang="ts">
    import arrow_left_circle from "$lib/icons/arrow_left_circle.svg?raw";
    let step: number = 0,
        firstName: string = "",
        lastName: string = "",
        bio: string = "",
        username: string = "",
        password: string = "",
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

    const register = () => {
        if (!fantasy || !horror || !adventure || !romance || !mystery)
            return;

        const user = {
            firstName,
            lastName,
            bio,
            username,
            password
        };

        const genres = {
            fantasy,
            horror,
            adventure,
            romance,
            mystery
        };
    };
</script>

<div class="bg-base-100 mt-40 px-4 pb-16">
    <ul class="steps mb-4 w-full">
        <li class="step" class:step-primary={step >= 0}>Personal</li>
        <li class="step" class:step-primary={step >= 1}>Account</li>
        <li class="step" class:step-primary={step >= 2}>Genre</li>
    </ul>
    {#if step === 0}
    <form on:submit={increaseStep}>
        <div class="form-control w-full">
            <label class="label" for="firstName">
                <span class="label-text font-bold uppercase text-gray-400">First Name <span class="text-red-500">*</span></span>
            </label>
            <input class="input input-bordered w-full" type="text" name="firstName" bind:value={firstName} required>
        </div>
        <div class="form-control w-full mt-4">
            <label class="label" for="lastName">
                <span class="label-text font-bold uppercase text-gray-400">Last Name <span class="text-red-500">*</span></span>
            </label>
            <input class="input input-bordered w-full" type="text" name="lastName" bind:value={lastName} required>
        </div>
        <div class="form-control w-full mt-4">
            <label class="label" for="bio">
                <span class="label-text font-bold uppercase text-gray-400">Describe yourself</span>
            </label>
            <textarea class="textarea textarea-bordered h-24" bind:value={bio}></textarea>
        </div>
        <button class="btn w-full btn-accent mt-8 normal-case font-bold">Next Step</button>
    </form>
    {:else if step === 1}
    <button class="btn btn-ghost text-lg px-0 flex gap-x-2 items-center" 
    on:click={decreaseStep}>
        <div class="w-5 h-5">{@html arrow_left_circle}</div>
        Go Back
    </button>
    <form on:submit={increaseStep}>
        <div class="form-control w-full mt-4">
            <label class="label" for="username">
                <span class="label-text font-bold uppercase text-gray-400">Username <span class="text-red-500">*</span></span>
            </label>
            <input class="input input-bordered w-full" type="text" name="username" bind:value={username} required>
        </div>
        <div class="form-control w-full mt-4">
            <label class="label" for="password">
                <span class="label-text font-bold uppercase text-gray-400">Password <span class="text-red-500">*</span></span>
            </label>
            <input class="input input-bordered w-full" type="password" name="password" bind:value={password} required>
        </div>
        <button class="btn w-full btn-accent mt-8 normal-case font-bold">Next Step</button>
    </form>
    {:else if step === 2}
    <button class="btn btn-ghost text-lg px-0 flex gap-x-2 items-center" 
    on:click={decreaseStep}>
        <div class="w-5 h-5">{@html arrow_left_circle}</div>
        Go Back
    </button>
    <div class="grid grid-cols-2 gap-2">
        <button class="card card-compact hover:bg-base-200 transition-all duration-200 hover:-translate-y-1"
        on:click={_ => fantasy = !fantasy}
        class:active={fantasy}>
            <figure class="px-4 pt-4">
                <img class="border-base-content bg-base-300 rounded-lg border border-opacity-5 w-full"
                src="/favicon.png" alt="">
            </figure>
            <div class="card-body">
                <h2 class="card-title">Fantasy</h2>
            </div>
        </button>
        <button class="card card-compact hover:bg-red-500 transition-all duration-200 hover:-translate-y-1"
        on:click={_ => horror = !horror}
        class:active={horror}>
            <figure class="px-4 pt-4">
                <img class="border-base-content bg-base-300 rounded-lg border border-opacity-5 w-full"
                src="/favicon.png" alt="">
            </figure>
            <div class="card-body">
                <h2 class="card-title">Horror</h2>
            </div>
        </button>
        <button class="card card-compact hover:bg-red-500 transition-all duration-200 hover:-translate-y-1"
        on:click={_ => adventure = !adventure}
        class:active={adventure}>
            <figure class="px-4 pt-4">
                <img class="border-base-content bg-base-300 rounded-lg border border-opacity-5 w-full"
                src="/favicon.png" alt="">
            </figure>
            <div class="card-body">
                <h2 class="card-title">Adventure</h2>
            </div>
        </button>
        <button class="card card-compact hover:bg-red-500 transition-all duration-200 hover:-translate-y-1"
        on:click={_ => romance = !romance}
        class:active={romance}>
            <figure class="px-4 pt-4">
                <img class="border-base-content bg-base-300 rounded-lg border border-opacity-5 w-full"
                src="/favicon.png" alt="">
            </figure>
            <div class="card-body">
                <h2 class="card-title">Romance</h2>
            </div>
        </button>
        <button class="card card-compact hover:bg-red-500 transition-all duration-200 hover:-translate-y-1"
        on:click={_ => mystery = !mystery}
        class:active={mystery}>
            <figure class="px-4 pt-4">
                <img class="border-base-content bg-base-300 rounded-lg border border-opacity-5 w-full"
                src="/favicon.png" alt="">
            </figure>
            <div class="card-body">
                <h2 class="card-title">Mystery</h2>
            </div>
        </button>
    </div>
    <button class="btn w-full btn-secondary mt-8"
    on:click={register}>
        <span class="font-bold text-base-100 normal-case">Complete Register</span>
    </button>
    {/if}
</div>

<style>
    .grid > .card.active {
        --tw-translate-y: -0.25rem/* -4px */;
        background-color: hsl(var(--b2) / 1);
        transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    }
</style>