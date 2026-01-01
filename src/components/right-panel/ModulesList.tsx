import { useRecoilState } from "recoil";
import { eventDraftAtom, type EventModule } from "../../state/eventDraft.atom";
import { CapacityModuleCard } from "./modules/CapacityModuleCard";
import { LinksModuleCard } from "./modules/LinksModuleCard";
import { GalleryModuleCard } from "./modules/GalleryModuleCard";

export function ModulesList() {
    const [draft, setDraft] = useRecoilState(eventDraftAtom);

    function removeModule(id: string) {
        setDraft((d) => ({ ...d, modules: d.modules.filter((m) => m.id !== id) }));
    }

    function updateModule(id: string, updater: (m: EventModule) => EventModule) {
        setDraft((d) => ({
            ...d,
            modules: d.modules.map((m) => (m.id === id ? updater(m) : m)),
        }));
    }

    if (draft.modules.length === 0) return null;

    return (
        <div className="mt-5 space-y-3">
            {draft.modules.map((m) => {
                if (m.type === "capacity") {
                    return (
                        <CapacityModuleCard
                            key={m.id}
                            module={m}
                            onRemove={() => removeModule(m.id)}
                            onChange={(next) => updateModule(m.id, () => next)}
                        />
                    );
                }
                if (m.type === "links") {
                    return (
                        <LinksModuleCard
                            key={m.id}
                            module={m}
                            onRemove={() => removeModule(m.id)}
                            onChange={(next) => updateModule(m.id, () => next)}
                        />
                    );
                }
                return (
                    <GalleryModuleCard
                        key={m.id}
                        module={m}
                        onRemove={() => removeModule(m.id)}
                        onChange={(next) => updateModule(m.id, () => next)}
                    />
                );
            })}
        </div>
    );
}
