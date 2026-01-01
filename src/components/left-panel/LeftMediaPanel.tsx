import { useRecoilState } from "recoil";
import { mockUploadImage } from "../../services/mockEventMediaApi.ts";
import {FlyerCard} from "./FlyerCard.tsx";
import {ChangeBackgroundButton} from "./ChangeBackgroundButton.tsx";
import {eventDraftAtom} from "../../state/eventDraft.atom.ts";

export function LeftMediaPanel() {
    const [draft, setDraft] = useRecoilState(eventDraftAtom);

    async function onPickFlyer(file: File) {
        const url = await mockUploadImage(file);
        setDraft((d) => ({ ...d, flyerUrl: url }));
    }

    async function onPickBackground(file: File) {
        const url = await mockUploadImage(file);
        setDraft((d) => ({
            ...d,
            background: { kind: "image", url },
        }));
    }

    return (
        <div className="w-full max-w-[520px]">
            <FlyerCard flyerUrl={draft.flyerUrl} onPickFlyer={onPickFlyer} />
            <ChangeBackgroundButton onPickBackground={onPickBackground} />
        </div>
    );
}
