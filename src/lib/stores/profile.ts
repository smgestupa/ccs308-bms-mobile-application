import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

const profile: Writable<string> = writable();

export {
    profile
}