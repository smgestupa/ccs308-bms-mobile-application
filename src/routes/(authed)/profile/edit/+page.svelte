<script lang="ts">
    import { goto } from "$app/navigation";
    import toast from "svelte-french-toast";
    import { currentTitle } from "$lib/stores/currentPage";
    import { jwtToken, userID } from "$lib/stores/jwt";
    import edit from "$lib/icons/edit.svg?raw";
    $currentTitle = "Profile";
    let photo: string | undefined = "",
        firstName: string = "",
        lastName: string = "",
        bio: string = "";

    const getUserProfile = async () => {
        const req = await fetch("http://localhost:8080/api/v1/users/profile/get", {
            headers: {
                "Accept": "application/json",
                "Authorization": $jwtToken,
                "userID": $userID
            }
        });
        const res = await req.json();

        photo = res["photo"];
        firstName = res["firstName"];
        lastName = res["lastName"];
        bio = res["bio"];

        return res.data;
    }

    const editUserProfile = async () => {
        const user = {
            userID: $userID,
            firstName,
            lastName,
            bio
        };

        const req = await fetch("http://localhost:8080/api/v1/users/profile/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": $jwtToken,
                "userID": $userID
            },
            body: JSON.stringify(user)
        });
        const res = await req.json();

        if (req.status === 200) {
            toast.success(res["message"], { position: "bottom-center" });
            goto("/profile", { replaceState: true });
        }
    }
</script>

<div class="flex-grow py-20">
    {#await getUserProfile() then data}
    <section class="relative bg-secondary h-36">
        <button class="avatar absolute bottom-0 translate-y-14 px-4">
            <figure class="w-28 h-28 bg-black rounded-full">
                {#if data["photo"]}
                <img src="data:image/png;base64, {data["cover"]}" alt="Profile">
                {:else}
                <img src="/favicon.png" alt="Profile">
                {/if}
            </figure>
        </button>
    </section>
    
    
    <section class="flex gap-x-2 mt-4 pl-36">
        <button class="btn btn-success btn-sm w-full max-w-fit" on:click={editUserProfile}>
            <div class="w-5 h-5">{@html edit}</div>
            Confirm Edit
        </button>
    </section>
    
    <section class="mt-8 px-4">
        <p class="font-bold text-3xl break-words">{data["firstName"] + " " + data["lastName"]}</p>
        <div class="flex gap-x-2 justify-between w-full max-w-full mt-4">
            <div class="form-control w-1/2">
                <label class="label">
                  <span class="label-text font-bold uppercase text-gray-400">First Name</span>
                </label>
                <input type="text" placeholder="e.g. John" class="input input-bordered w-full max-w-xs break-words" bind:value={firstName}>
            </div>
            <div class="form-control w-1/2">
                <label class="label">
                  <span class="label-text font-bold uppercase text-gray-400">Last Name</span>
                </label>
                <input type="text" placeholder="e.g. Doe" class="input input-bordered w-full max-w-xs break-words" bind:value={lastName}>
            </div>
        </div>
        <div class="form-control mt-8">
            <label class="label">
              <span class="label-text font-bold uppercase text-gray-400">Bio</span>
            </label>
            <textarea class="textarea textarea-bordered h-full min-h-[8rem] resize-none" placeholder="e.g. My name is Yoshikage Kira. I'm 33 years old. My house is in the northeast section of Morioh, where all the villas are, and I am not married." bind:value={bio}></textarea>
        </div>
    </section>
    {/await}
</div>