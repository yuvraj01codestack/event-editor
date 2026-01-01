import {useRecoilState, useRecoilValue} from "recoil";
import {eventDraftAtom} from "../../state/eventDraft.atom.ts";
import {eventValidationSelector} from "../../state/eventValidation.selector.ts";
import {goLiveAttemptedAtom, goLiveStatusAtom} from "../../state/ui.atoms.ts";
import {publishEvent} from "../../services/eventDraftApi.ts";




export function GoLiveButton() {

    const draft = useRecoilValue(eventDraftAtom);
    const {isValid} = useRecoilValue(eventValidationSelector);
    const [, setAttempted] = useRecoilState(goLiveAttemptedAtom);
    const [status, setStatus] = useRecoilState(goLiveStatusAtom);

    async function onGoLive() {
        setAttempted(true);

        if (!isValid) {
            setStatus({state: "error", message: "Please fix the highlighted fields."});
            return;
        }

        setStatus({state: "publishing"});
        const res = await publishEvent(draft);
        if (res.ok) setStatus({state: "published"});
        else setStatus({state: "error", message: res.message});
    }

    return (
        <>
            {status.state === "error" && (
                <div className="mt-2 text-sm text-red-300/90">{status.message}</div>
            )}
            {status.state === "published" && (
                <div className="mt-2 text-sm text-emerald-300/80">Event is live (mock)</div>
            )}

            <button
                type="button"
                onClick={onGoLive}
                disabled={status.state === "publishing"}
                className="mt-6 mb-10 w-full rounded-2xl bg-white/10 py-5 text-center text-base font-semibold text-emerald-300 hover:bg-white/15 disabled:opacity-50"
            >
                {status.state === "publishing" ? "Going live..." : "Go live"}
            </button>
        </>


    );
}
