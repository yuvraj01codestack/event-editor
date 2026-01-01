import {useRecoilValue} from "recoil";
import { eventDraftAtom } from "../state/eventDraft.atom";
import {LeftMediaPanel} from "../components/left-panel/LeftMediaPanel.tsx";
import {RightPanel} from "../components/right-panel/RightPanel.tsx";

export function CreateEventPage() {
    const draft = useRecoilValue(eventDraftAtom);
    const bg = draft.background;

    const gradient = `
    linear-gradient(180deg,
      #d6a4c2 0%,
      #9a7fc2 35%,
      #5b5fa8 65%,
      #2b2f55 100%
    )
  `;

    return (
        <div className="relative min-h-dvh w-full overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    background:
                        bg.kind === "image"
                            ? `url(${bg.url}) center / cover no-repeat`
                            : gradient,
                }}
            />
            <div className="absolute inset-0 bg-black/20"/>

            <div className="relative z-10">
                <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-12 pt-8 text-white">
                    <div className="text-3xl font-semibold tracking-tight">let’s hang</div>

                    <div className="mt-10 grid gap-10 lg:gap-14 lg:grid-cols-[520px_1fr]">
                        <div className="mx-auto lg:mx-0 w-full max-w-[520px]">
                            <LeftMediaPanel />
                        </div>

                        <div className="mx-auto lg:mx-0 w-full max-w-[760px]">
                            <RightPanel />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
