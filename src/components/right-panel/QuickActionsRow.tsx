import { useRecoilState } from "recoil";
import { eventDraftAtom, type EventModuleType } from "../../state/eventDraft.atom";

function plusSvg() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/65">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function newId() {
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function QuickActionsRow() {
    const [draft, setDraft] = useRecoilState(eventDraftAtom);

    const has = (type: EventModuleType) => draft.modules.some((m) => m.type === type);

    function addModule(type: EventModuleType) {
        // @ts-ignore
        setDraft((d) => {
            if (d.modules.some((m) => m.type === type)) return d;

            const module =
                type === "capacity"
                    ? ({ id: newId(), type, data: { capacity: "" } } as const)
                    : type === "gallery"
                        ? ({ id: newId(), type, data: { images: [] } } as const)
                        : ({
                            id: newId(),
                            type,
                            data: { links: [{ id: newId(), label: "", url: "" }] },
                        } as const);

            return { ...d, modules: [...d.modules, module] };
        });
    }

    return (
        <div className="mt-5 flex flex-wrap items-center gap-4">
            <QuickAction label="Capacity" disabled={has("capacity")} onClick={() => addModule("capacity")} />
            <QuickAction label="Photo gallery" disabled={has("gallery")} onClick={() => addModule("gallery")} />
            <QuickAction label="Links" disabled={has("links")} onClick={() => addModule("links")} />

            <button type="button" className="ml-2 text-sm font-medium text-white/35 hover:text-white/55">
                Show more
            </button>
        </div>
    );
}

function QuickAction({
                         label,
                         onClick,
                         disabled,
                     }: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:bg-white/15 disabled:opacity-50 disabled:hover:bg-white/10"
        >
            {plusSvg()}
            {label}
        </button>
    );
}
