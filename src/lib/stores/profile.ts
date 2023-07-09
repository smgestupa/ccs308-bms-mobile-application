import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

const profilePhoto: Writable<string> = writable();

export {
    profilePhoto
}