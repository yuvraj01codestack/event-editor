import {useRecoilValue} from "recoil";
import {goLiveAttemptedAtom} from "../../state/ui.atoms.ts";
import {eventValidationSelector} from "../../state/eventValidation.selector.ts";

type Props = {
    value: string;
    onChange: (v: string) => void;
};

export function EventTitleInput({value, onChange}: Props) {
    const attempted = useRecoilValue(goLiveAttemptedAtom);
    const {errors} = useRecoilValue(eventValidationSelector);

    return (
        <>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Name your event"
                className="w-full bg-transparent text-[44px] font-semibold tracking-tight text-white/45 placeholder:text-white/35 focus:outline-none"
            />
            {attempted && errors.title && (
                <div className="mt-1 text-sm text-red-300/90">
                    {errors.title}
                </div>
            )}
        </>
    );
}
