<script lang="ts">
    import { Geolocation } from "@capacitor/geolocation";
	import type { Position } from "@capacitor/geolocation";

    let loc: Position | undefined = undefined;

    const getCurrentLocation = async () => {
        const res = await Geolocation.getCurrentPosition();
        loc = res;
    };
</script>

<div>
    <h1 class="font-bold text-3xl">Geolocation</h1>
    <h2 class="text-xl">Your location is:</h2>
    <p class="text-lg">Latitude: {loc?.coords.latitude}</p>
    <p class="text-lg">Longitude: {loc?.coords.longitude}</p>

    <button class="mt-4"
    on:click={getCurrentLocation}>
        Get Current Location
    </button>
</div>