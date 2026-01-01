import { selector } from "recoil";
import { eventDraftAtom, type EventModule } from "./eventDraft.atom";

export type FieldErrors = Partial<Record<
    "title" | "phone" | "dateTime" | "location" | "cost" | "modules",
    string
>>;

function isValidPhone(phone: string) {
    // simple (India-friendly) validation; keep it light for take-home
    const p = phone.trim();
    return /^[0-9+\-\s]{8,16}$/.test(p);
}

function isValidUrl(url: string) {
    try {
        const u = new URL(url);
        return u.protocol === "http:" || u.protocol === "https:";
    } catch {
        return false;
    }
}

function validateModules(modules: EventModule[]): string | null {
    for (const m of modules) {
        if (m.type === "capacity") {
            const n = Number(m.data.capacity);
            if (!m.data.capacity || Number.isNaN(n) || n <= 0) return "Capacity must be greater than 0";
        }
        if (m.type === "links") {
            const links = m.data.links;
            if (links.length === 0) return "Add at least one link";
            for (const l of links) {
                if (!l.label.trim()) return "Link label is required";
                if (!l.url.trim() || !isValidUrl(l.url.trim())) return "Enter a valid link URL (https://...)";
            }
        }
        // gallery is optional (no validation)
    }
    return null;
}

export const eventValidationSelector = selector({
    key: "eventValidationSelector",
    get: ({ get }) => {
        const d = get(eventDraftAtom);

        const errors: FieldErrors = {};

        if (!d.title.trim()) errors.title = "Event title is required";
        if (!d.phone.trim()) errors.phone = "Phone is required";
        else if (!isValidPhone(d.phone)) errors.phone = "Enter a valid phone number";

        if (!d.dateTime) errors.dateTime = "Date & time is required";
        if (!d.location.trim()) errors.location = "Location is required";

        if (!d.cost.trim()) errors.cost = "Cost is required";
        else if (Number.isNaN(Number(d.cost)) || Number(d.cost) < 0) errors.cost = "Enter a valid cost";

        const moduleErr = validateModules(d.modules);
        if (moduleErr) errors.modules = moduleErr;

        const isValid = Object.keys(errors).length === 0;

        return { isValid, errors };
    },
});
