import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

const currentTitle: Writable<string> = writable("Home");

export {
    currentTitle
}