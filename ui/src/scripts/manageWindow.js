import { writable } from "svelte/store";

import Home from "../components/Home.svelte";
import Collections from "../components/Collections.svelte";
import Profile from "../components/Profile.svelte";
/***
 * Storing the menu options as windows
 */
export const windowList = {
    home: Home,
    collections: Collections,
    profile: Profile,
};

/**
 * Creating a store with home as default value.
 */
export const window = writable(windowList.home);

/**
 * Change the store value with respect to the menu value of user choice.
 * @param {eventObject} e To get the menu value of user choice
 */
export const changeActiveWindow = (e) => {
    let activeWindow = e.target.value;
    if (activeWindow) {
        // console.log(activeWindow, windowList[activeWindow]);
        window.set(windowList[activeWindow]);
    }
};
