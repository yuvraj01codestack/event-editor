import { type EventModule } from "../../../state/eventDraft.atom";

export function CapacityModuleCard({
                                       module,
                                       onRemove,
                                       onChange,
                                   }: {
    module: Extract<EventModule, { type: "capacity" }>;
    onRemove: () => void;
    onChange: (next: Extract<EventModule, { type: "capacity" }>) => void;
}) {
    return (
        <div className="flex w-full items-center gap-4 px-5 py-5 rounded-2xl bg-white/10 ring-1 ring-white/10 hover:bg-white/5">
            <span className="text-xl text-white/60">👥</span>

            <input
                type="number"
                inputMode="numeric"
                min={0}
                step={1}
                value={module.data.capacity}
                onChange={(e) =>
                    onChange({
                        ...module,
                        data: { capacity: e.target.value },
                    })
                }
                placeholder="Add capacity"
                className="flex-1 bg-transparent text-white/80 placeholder:text-white/60 focus:outline-none"
            />

            <button
                type="button"
                onClick={onRemove}
                className="rounded-lg px-3 py-2 text-sm text-white/60 hover:bg-white/10"
                aria-label="Remove capacity"
                title="Remove"
            >
                ✕
            </button>
        </div>
    );
}
