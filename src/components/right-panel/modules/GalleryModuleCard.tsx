import { useRef } from "react";
import { type EventModule } from "../../../state/eventDraft.atom";
import { mockUploadImage } from "../../../services/mockEventMediaApi";

export function GalleryModuleCard({
                                      module,
                                      onRemove,
                                      onChange,
                                  }: {
    module: Extract<EventModule, { type: "gallery" }>;
    onRemove: () => void;
    onChange: (next: Extract<EventModule, { type: "gallery" }>) => void;
}) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    async function onPick(files: FileList) {
        const urls: string[] = [];
        for (const f of Array.from(files)) {
            const url = await mockUploadImage(f);
            urls.push(url);
        }
        onChange({
            ...module,
            data: { images: [...module.data.images, ...urls] },
        });
    }

    function removeImage(url: string) {
        onChange({
            ...module,
            data: { images: module.data.images.filter((x) => x !== url) },
        });
    }

    return (
        <div className="rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/10">
            <Header title="Photo gallery" subtitle="Upload photos to show on your event" onRemove={onRemove} />

            <div className="mt-4">
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="w-full rounded-xl bg-white/10 py-3 text-sm font-semibold text-white/80 hover:bg-white/15"
                >
                    + Upload images
                </button>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                        const files = e.target.files;
                        if (!files || files.length === 0) return;
                        void onPick(files);
                        e.currentTarget.value = "";
                    }}
                />
            </div>

            {module.data.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                    {module.data.images.map((url) => (
                        <div key={url} className="relative overflow-hidden rounded-xl ring-1 ring-white/10">
                            <img src={url} alt="Gallery" className="h-24 w-full object-cover" />
                            <button
                                type="button"
                                onClick={() => removeImage(url)}
                                className="absolute right-2 top-2 rounded-lg bg-black/40 px-2 py-1 text-xs font-semibold text-white hover:bg-black/55"
                                aria-label="Remove image"
                                title="Remove image"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function Header({
                    title,
                    subtitle,
                    onRemove,
                }: {
    title: string;
    subtitle: string;
    onRemove: () => void;
}) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <div className="text-white/90 font-semibold">{title}</div>
                <div className="mt-1 text-sm text-white/55">{subtitle}</div>
            </div>

            <button
                type="button"
                onClick={onRemove}
                className="rounded-xl bg-white/10 px-3 py-2 text-sm font-medium text-white/75 hover:bg-white/15"
            >
                Remove
            </button>
        </div>
    );
}
