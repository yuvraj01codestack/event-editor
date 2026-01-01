type Props = {
    onCustomize?: () => void;
};

export function CustomizeCard({ onCustomize }: Props) {
    return (
        <div className="mt-6 overflow-hidden rounded-2xl bg-black/25 ring-1 ring-white/10">
            <div className="relative px-6 py-8">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-6 top-10 rotate-[-10deg] text-3xl text-white/30">
                        📣
                    </div>
                    <div className="absolute left-28 top-6 rotate-[14deg] text-3xl text-white/25">
                        🧾
                    </div>
                    <div className="absolute left-28 top-20 rotate-[6deg] text-3xl text-white/25">
                        🫧
                    </div>

                    <div className="absolute right-24 top-8 rotate-[12deg] text-3xl text-white/25">
                        🔗
                    </div>
                    <div className="absolute right-10 top-14 rotate-[-10deg] text-3xl text-white/25">
                        🖼️
                    </div>
                    <div className="absolute right-16 top-24 rotate-[8deg] text-3xl text-white/25 font-semibold tracking-widest">
                        RSVP
                    </div>
                </div>

                <div className="relative flex justify-center">
                    <div className="text-center text-[20px] font-semibold leading-snug text-white/90">
                        Customize your
                        <br />
                        event your way
                    </div>
                </div>
            </div>

            <div className="px-6 pb-6 mt-8">
                <button
                    type="button"
                    onClick={onCustomize}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-white/10 py-4 text-white/85 hover:bg-white/15"
                >
                    <span>🎨</span>
                    <span className="font-medium">Customize</span>
                </button>
            </div>
        </div>
    );
}
