<script lang="ts">
  import { page } from "$app/stores";
  import { currentTitle } from "$lib/stores/currentPage";
  import { profilePhoto } from "$lib/stores/profile";
  import magnifying_glass from "$lib/icons/magnifying_glass.svg?raw";
  import logout from "$lib/icons/logout.svg?raw";
  import house from "$lib/icons/house.svg?raw";
  import star from "$lib/icons/star.svg?raw";
  import camera from "$lib/icons/camera.svg?raw";
  import person from "$lib/icons/person.svg?raw";

  $: ({ route } = $page);
</script>

<section class="fixed top-0 w-full flex items-center justify-between p-4 bg-base-100 drop-shadow-lg z-10">
  <header>
    <h1 class="text-2xl font-bold">{$currentTitle}</h1>
  </header>
  <div class="flex items-center gap-x-4">
    <a href="/search" class="w-10 h-10 p-2">
      {@html magnifying_glass}
    </a>
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="m-1">
        <div class="avatar">
          <figure class="w-10 h-10 bg-black rounded-full overflow-hidden">
            <img src="{$profilePhoto !== "" ? `data:image/png;base64, ${$profilePhoto}` : "/favicon.png"}" alt="Profile">
          </figure>
        </div>
      </label>
      <ul tabindex="0" class="dropdown-content z-[1] menu shadow bg-base-200 rounded w-40">
        <li><a class="text-lg" href="/profile">Profile</a></li>
        <li><div class="divider my-0" /></li>
        <li>
          <button class="text-lg font-bold text-error">
            <div class="w-5 h-5">{@html logout}</div>
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</section>

<slot />

<div class="btm-nav">
  <a href="/home"
  class:active={ route.id === "/(authed)/home"}>
    <div class="w-5 h-5">
      {@html house}
    </div>
    <span class="btm-nav-label">Home</span>
  </a>
  <a href="/favourites"
  class:active={ route.id === "/(authed)/favourites"}>
    <div class="w-5 h-5">
      {@html star}
    </div>
    <span class="btm-nav-label">Favourites</span>
  </a>
  <a href="/scan"
  class:active={ route.id === "/(authed)/scan"}>
    <div class="w-5 h-5">
      {@html camera}
    </div>
    <span class="btm-nav-label">Scan</span>
  </a>
  <a href="/profile"
  class:active={ route.id === "/(authed)/profile" || route.id === "/(authed)/profile/edit" }>
    <div class="w-5 h-5">
      {@html person}
    </div>
    <span class="btm-nav-label">Profile</span>
  </a>
</div>