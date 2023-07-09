<script lang="ts">
    import { currentTitle } from "$lib/stores/currentPage";
    import edit from "$lib/icons/edit.svg?raw";
    $currentTitle = "Profile";
</script>

<div class="flex-grow py-20">
    <section class="relative bg-secondary h-36">
        <button class="avatar absolute bottom-0 translate-y-14 px-4">
            <figure class="w-28 h-28 bg-black rounded-full">
              <img src="/favicon.png" alt="Profile">
            </figure>
        </button>
    </section>
    
    
    <section class="flex gap-x-2 mt-4 pl-36">
        <button class="btn btn-success btn-sm w-full max-w-fit">
            <div class="w-5 h-5">{@html edit}</div>
            Confirm Edit
        </button>
    </section>
    
    <section class="mt-8 px-4">
        <p class="font-bold text-3xl break-words">Shawn Michael Gestupa</p>
        <div class="flex gap-x-2 justify-between w-full max-w-full mt-4">
            <div class="form-control w-1/2">
                <label class="label">
                  <span class="label-text font-bold uppercase text-gray-400">First Name</span>
                </label>
                <input type="text" placeholder="e.g. John" class="input input-bordered w-full max-w-xs break-words">
            </div>
            <div class="form-control w-1/2">
                <label class="label">
                  <span class="label-text font-bold uppercase text-gray-400">Last Name</span>
                </label>
                <input type="text" placeholder="e.g. Doe" class="input input-bordered w-full max-w-xs break-words">
            </div>
        </div>
        <div class="form-control mt-3">
            <label class="label">
              <span class="label-text font-bold uppercase text-gray-400">Bio</span>
            </label>
            <textarea class="textarea textarea-bordered h-full min-h-[8rem] resize-none" placeholder="e.g. My name is Yoshikage Kira. I'm 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married."></textarea>
        </div>
    </section>
</div>