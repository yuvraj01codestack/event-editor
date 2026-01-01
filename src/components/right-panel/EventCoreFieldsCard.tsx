import {useRef} from "react";
import {formatDateTime} from "../../utils/utils.ts";
import {useRecoilValue} from "recoil";
import {goLiveAttemptedAtom} from "../../state/ui.atoms.ts";
import {eventValidationSelector} from "../../state/eventValidation.selector.ts";

type Props = {
    dateTime: string;
    onDateTimeChange: (v: string) => void;

    location?: string;
    onLocationChange: (v: string) => void;
    cost: string;
    onCostChange: (v: string) => void;

    onAutoDetectLocation: () => void;
    locLoading?: boolean;
};

export function EventCoreFieldsCard({
                                        location,
                                        dateTime,
                                        onDateTimeChange,
                                        onLocationChange,
                                        locLoading,
                                        cost,
                                        onCostChange,
                                        onAutoDetectLocation,
                                    }: Props) {


    const dateInputRef = useRef<HTMLInputElement | null>(null);

    const attempted = useRecoilValue(goLiveAttemptedAtom);
    const {errors} = useRecoilValue(eventValidationSelector);


    return (
        <>

            <div className="mt-5 overflow-hidden rounded-2xl glass ring-1 ring-white/15">

                <div
                    role="button"
                    tabIndex={0}
                    onClick={() => dateInputRef.current?.showPicker()}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") dateInputRef.current?.showPicker();
                    }}
                    className="flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left hover:bg-white/5"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white/55"
                    >
                        <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <path
                            d="M16 2v4M8 2v4M3 10h18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>

                    <span
                        className={`flex-1 ${
                            dateTime ? "text-white/80" : "text-white/65"
                        }`}
                    >
    {formatDateTime(dateTime)}
  </span>

                    <input
                        ref={dateInputRef}
                        type="datetime-local"
                        value={dateTime}
                        onChange={(e) => onDateTimeChange(e.target.value)}
                        className="absolute opacity-0 pointer-events-none"
                    />


                </div>

                <div className="h-px bg-white/10"/>


                <div className="flex w-full items-center gap-4 px-5 py-5 hover:bg-white/5">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white/55"
                    >
                        <path
                            d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle
                            cx="12"
                            cy="10"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                    </svg>


                    <input
                        value={location}
                        onChange={(e) => onLocationChange(e.target.value)}
                        placeholder="Location"
                        className="flex-1 bg-transparent text-white/80 placeholder:text-white/65 focus:outline-none"
                    />



                    <button
                        type="button"
                        onClick={onAutoDetectLocation}
                        disabled={locLoading}
                        className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white/80 hover:bg-white/15 disabled:opacity-50"
                        aria-label="Auto-detect location"
                        title="Auto-detect location"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/90">
                            <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="2"
                                  strokeLinecap="round"/>
                            <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                        </svg>
                    </button>
                </div>

                <div className="h-px bg-white/10"/>

                <div className="flex w-full items-center gap-4 px-5 py-5 hover:bg-white/5">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white/55"
                    >
                        <path
                            d="M12 1v22"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M17 5H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>

                    <input
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        min="0"
                        value={cost}
                        onChange={(e) => onCostChange(e.target.value)}
                        placeholder="Cost per person"
                        className="flex-1 bg-transparent text-white/80 placeholder:text-white/65 focus:outline-none"
                    />



                </div>

            </div>

            {attempted && errors.dateTime && (
                <div className="mt-2 text-sm text-red-300/90">
                    {errors.dateTime}
                </div>
            )}

            {attempted && errors.cost && (
                <div className="mt-2 text-sm text-red-300/90">{errors.cost}</div>
            )}

            {attempted && errors.location && (
                <div className="mt-2 text-sm text-red-300/90">{errors.location}</div>
            )}
        </>
    );
}
