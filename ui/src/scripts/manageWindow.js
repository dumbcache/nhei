import { writable } from "svelte/store";

import Home from "../components/Home.svelte";
import Collections from "../components/Collections.svelte";
import Profile from "../components/Profile.svelte";

export const windowList = {
    home: Home,
    collections: Collections,
    profile: Profile,
};

export const window = writable(windowList.profile);

export const changeActiveWindow = (e) => {
    let activeWindow = e.target.value;
    console.log(activeWindow, windowList[activeWindow]);
    window.set(windowList[activeWindow]);
};
