<form class="bg-base-100 mt-40 px-4">
    <div class="form-control w-full">
        <label class="label" for="username">
            <span class="label-text font-bold uppercase text-gray-400">Username <span class="text-red-500">*</span></span>
        </label>
        <input class="input input-bordered w-full" type="text" name="username" required>
    </div>
    <div class="form-control w-full mt-4">
        <label class="label" for="password">
            <span class="label-text font-bold uppercase text-gray-400">Password <span class="text-red-500">*</span></span>
        </label>
        <input class="input input-bordered w-full" type="password" name="password" required>
    </div>
    <button class="btn w-full btn-secondary mt-8"><span class="font-bold text-base-100 normal-case">Log in</span></button>
    <p class="mt-4">Don't have an account? <a class="link link-info font-bold" href="/register">Register instead</a></p>
</form>