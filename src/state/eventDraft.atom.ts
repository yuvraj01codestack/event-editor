import { atom } from "recoil";


export type EventModuleType = "capacity" | "gallery" | "links";

export type CapacityModuleData = { capacity: string };
export type GalleryModuleData = { images: string[] };
export type LinksModuleData = { links: Array<{ id: string; label: string; url: string }> };

export type EventModule =
    | { id: string; type: "capacity"; data: CapacityModuleData }
    | { id: string; type: "gallery"; data: GalleryModuleData }
    | { id: string; type: "links"; data: LinksModuleData };



export type EventDraft = {
    title: string;
    phone: string;
    dateTime: string;
    location: string;
    cost: string;

    flyerUrl: string;
    background:
        | { kind: "gradient" }
        | { kind: "image"; url: string };

    modules: EventModule[];
};

export const eventDraftAtom = atom<EventDraft>({
    key: "eventDraftAtom",
    default: {
        title: "",
        phone: "",
        dateTime: "",
        location: "",
        cost: "",

        flyerUrl: "/flyer-default.png",
        background: { kind: "gradient" },

        modules: [],
    },
});
