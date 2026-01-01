import type { EventDraft } from "../state/eventDraft.atom";

type SaveResult = { ok: true } | { ok: false; message: string };

const KEY_PREFIX = "lh_event_draft_v1:";

function key(phone: string) {
    return `${KEY_PREFIX}${phone}`;
}

function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}

export async function saveDraftByPhone(phone: string, draft: EventDraft): Promise<SaveResult> {
    const p = phone.trim();
    if (!p) return { ok: false, message: "Phone is required" };

    await sleep(250);

    try {
        localStorage.setItem(
            key(p),
            JSON.stringify({ draft, savedAt: Date.now() })
        );
        return { ok: true };
    } catch (e) {
        return { ok: false, message: "Failed to save draft" };
    }
}

export async function loadDraftByPhone(phone: string): Promise<{ ok: true; draft: EventDraft } | { ok: false }> {
    const p = phone.trim();
    if (!p) return { ok: false };

    await sleep(150);

    try {
        const raw = localStorage.getItem(key(p));
        if (!raw) return { ok: false };
        const parsed = JSON.parse(raw) as { draft: EventDraft };
        return { ok: true, draft: parsed.draft };
    } catch {
        return { ok: false };
    }
}

export async function publishEvent(draft: EventDraft): Promise<SaveResult> {
    await sleep(300);
    console.log("PUBLISH_EVENT_PAYLOAD", draft);
    return { ok: true };
}
