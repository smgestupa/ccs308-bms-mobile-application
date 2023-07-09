<script lang="ts">
    import { currentTitle } from "$lib/stores/currentPage";
    import { jwtToken, userID } from "$lib/stores/jwt";
    import edit from "$lib/icons/edit.svg?raw";
    $currentTitle = "Profile";

    const getUserProfile = async () => {
        const req = await fetch("http://localhost:8080/api/v1/users/profile/get", {
            headers: {
                "Accept": "application/json",
                "Authorization": $jwtToken,
                "userID": $userID
            }
        });
        const res = await req.json();

        console.log(res.data);

        return res.data;
    }
</script>

<div class="flex-grow py-20">
    {#await getUserProfile() then data}
    <section class="relative bg-secondary h-36">
        <button class="avatar absolute bottom-0 translate-y-14 px-4">
            <figure class="w-28 h-28 bg-black rounded-full overflow-hidden">
                <img src="{data["photo"] ? `data:image/png;base64, ${data["photo"]}` : "/favicon.png"}" alt="Profile">
            </figure>
        </button>
    </section>
    
    
    <section class="flex gap-x-2 mt-4 pl-36">
        <a href="/profile/edit" class="btn btn-info btn-sm max-w-fit">
            <div class="w-5 h-5">{@html edit}</div>
            Edit Profile
        </a>
    </section>
    
    <section class="mt-8 px-4">
        <p class="font-bold text-3xl break-words">{data["firstName"] + " " + data["lastName"]}</p>
        <div class="flex gap-x-2 justify-between w-full max-w-full mt-4">
            <div class="form-control w-1/2">
                <label class="label">
                  <span class="label-text font-bold uppercase text-gray-400">First Name</span>
                </label>
                <p class="w-full max-w-xs break-words text-xl">{data["firstName"]}</p>
            </div>
            <div class="form-control w-1/2">
                <label class="label">
                  <span class="label-text font-bold uppercase text-gray-400">Last Name</span>
                </label>
                <p class="w-full max-w-xs break-words text-xl">{data["lastName"]}</p>
            </div>
        </div>
        <div class="form-control mt-8">
            <label class="label">
              <span class="label-text font-bold uppercase text-gray-400">Bio</span>
            </label>
            <textarea class="textarea textarea-bordered h-full min-h-[8rem] resize-none" placeholder="This user does not have a default bio" disabled>{data["bio"]}</textarea>
        </div>
    </section>
    {/await}
</div>