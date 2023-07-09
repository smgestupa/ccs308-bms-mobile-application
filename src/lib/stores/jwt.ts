import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

const jwtToken: Writable<string> = writable();
const userID: Writable<string> = writable();

export {
    jwtToken,
    userID
}