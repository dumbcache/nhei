import { store } from "./getDoujin";
import { searchValue } from "./stores";

export const refresh = () => {
    store.set(undefined);
    searchValue.set("");
};
