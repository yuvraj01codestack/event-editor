import { useImagePicker } from "./useImagePicker";

type Props = {
    onPickBackground: (file: File) => void | Promise<void>;
};

export function ChangeBackgroundButton({ onPickBackground }: Props) {
    const { open, inputRef, reset } = useImagePicker();

    return (
        <>
            <button
                type="button"
                onClick={open}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-white/10 px-6 py-5 text-white/90 hover:bg-white/15"
            >
        <span className="grid h-6 w-6 place-items-center rounded-md bg-white/10">
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white/80"
            >
            <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
            />
            <circle cx="9" cy="10" r="2" fill="currentColor" />
            <path
                d="M21 15l-5-5-4 4-2-2-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
          </svg>
        </span>

                <span className="text-base font-medium">Change background</span>
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    void onPickBackground(file);
                    reset(e);
                }}
            />
        </>
    );
}
