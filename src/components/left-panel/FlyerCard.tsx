
import { useImagePicker } from "./useImagePicker";

type Props = {
    flyerUrl: string;
    onPickFlyer: (file: File) => void | Promise<void>;
};

export function FlyerCard({ flyerUrl, onPickFlyer }: Props) {
    const {open, inputRef, reset} = useImagePicker();

    return (
        <div className="relative overflow-hidden rounded-[28px] glass ring-1 ring-white/15">
            <div className="relative overflow-hidden rounded-[22px]">
                <img
                    src={flyerUrl}
                    alt="Event flyer"
                    className="h-[440px] w-full object-cover"
                    draggable={false}
                />

                <button
                    type="button"
                    onClick={open}
                    className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-black/35 text-white hover:bg-black/45"
                    aria-label="Change flyer"
                    title="Change flyer"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white/90"
                    >
                        <path
                            d="M12 20h9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        void onPickFlyer(file);
                        reset(e);
                    }}
                />
            </div>
        </div>
    );
}
