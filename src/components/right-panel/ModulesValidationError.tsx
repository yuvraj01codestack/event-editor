import { useRecoilValue } from "recoil";
import { goLiveAttemptedAtom } from "../../state/ui.atoms";
import { eventValidationSelector } from "../../state/eventValidation.selector";

export function ModulesValidationError() {
    const attempted = useRecoilValue(goLiveAttemptedAtom);
    const { errors } = useRecoilValue(eventValidationSelector);

    if (!attempted || !errors.modules) return null;

    return (
        <div className="mt-3 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300 ring-1 ring-red-400/20">
            {errors.modules}
        </div>
    );
}
