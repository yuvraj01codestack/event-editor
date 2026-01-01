import { atom } from "recoil";

export const goLiveAttemptedAtom = atom<boolean>({
    key: "goLiveAttemptedAtom",
    default: false,
});

export const saveDraftStatusAtom = atom<
    | { state: "idle" }
    | { state: "saving" }
    | { state: "saved" }
    | { state: "error"; message: string }
>({
    key: "saveDraftStatusAtom",
    default: { state: "idle" },
});

export const goLiveStatusAtom = atom<
    | { state: "idle" }
    | { state: "publishing" }
    | { state: "published" }
    | { state: "error"; message: string }
>({
    key: "goLiveStatusAtom",
    default: { state: "idle" },
});


export const draftLoadStatusAtom = atom<
    | { state: "idle" }
    | { state: "loading" }
    | { state: "loaded" }
    | { state: "not_found" }
    | { state: "error"; message: string }
>({
    key: "draftLoadStatusAtom",
    default: { state: "idle" },
});