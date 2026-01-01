import { type EventModule } from "../../../state/eventDraft.atom";

function newId() {
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function LinksModuleCard({
                                    module,
                                    onRemove,
                                    onChange,
                                }: {
    module: Extract<EventModule, { type: "links" }>;
    onRemove: () => void;
    onChange: (next: Extract<EventModule, { type: "links" }>) => void;
}) {
    const links = module.data.links;

    function addLink() {
        onChange({
            ...module,
            data: {
                links: [...links, { id: newId(), label: "", url: "" }],
            },
        });
    }

    function updateLink(id: string, patch: { label?: string; url?: string }) {
        onChange({
            ...module,
            data: {
                links: links.map((l) =>
                    l.id === id ? { ...l, ...patch } : l
                ),
            },
        });
    }

    function removeLink(id: string) {
        onChange({
            ...module,
            data: { links: links.filter((l) => l.id !== id) },
        });
    }

    return (
        <div className="rounded-2xl bg-white/10 px-5 py-5 ring-1 ring-white/10">
            <div className="flex items-center gap-4">
                <span className="text-xl text-white/60">🔗</span>
                <span className="flex-1 text-white/60">Add link</span>

                <button
                    type="button"
                    onClick={onRemove}
                    className="rounded-lg px-3 py-2 text-sm text-white/60 hover:bg-white/10"
                >
                    ✕
                </button>
            </div>

            {links.length > 0 && (
                <div className="mt-4 space-y-3">
                    {links.map((l) => (
                        <div key={l.id} className="flex gap-3">
                            <input
                                value={l.label}
                                onChange={(e) =>
                                    updateLink(l.id, { label: e.target.value })
                                }
                                placeholder="Label"
                                className="w-[35%] rounded-lg bg-white/10 px-3 py-2 text-sm text-white/85 outline-none ring-1 ring-white/10"
                            />
                            <input
                                value={l.url}
                                onChange={(e) =>
                                    updateLink(l.id, { url: e.target.value })
                                }
                                placeholder="URL"
                                className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm text-white/85 outline-none ring-1 ring-white/10"
                            />
                            <button
                                type="button"
                                onClick={() => removeLink(l.id)}
                                className="rounded-lg px-3 py-2 text-sm text-white/60 hover:bg-white/10"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <button
                type="button"
                onClick={addLink}
                className="mt-4 w-full rounded-xl bg-white/5 py-3 text-sm font-medium text-white/75 hover:bg-white/10"
            >
                + Add another link
            </button>
        </div>
    );
}
