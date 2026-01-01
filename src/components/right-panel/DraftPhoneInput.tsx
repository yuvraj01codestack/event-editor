import { useRecoilState, useRecoilValue } from "recoil";
import {eventDraftAtom} from "../../state/eventDraft.atom.ts";
import {draftLoadStatusAtom, saveDraftStatusAtom} from "../../state/ui.atoms.ts";
import {eventValidationSelector} from "../../state/eventValidation.selector.ts";
import {saveDraftByPhone} from "../../services/eventDraftApi.ts";
import {InlineStatus} from "../ui/InlineStatus.tsx";


type Props = {
    value: string;
    onChange: (v: string) => void;
    onSubmit?: () => void;
};

export function DraftPhoneInput({ value, onChange }: Props) {
    const [draft, ] = useRecoilState(eventDraftAtom);
    const [saveStatus, setSaveStatus] = useRecoilState(saveDraftStatusAtom);
    const { errors } = useRecoilValue(eventValidationSelector);
    const [loadStatus, ] = useRecoilState(draftLoadStatusAtom);

    async function onSaveDraft() {
        const phoneErr = errors.phone;
        if (phoneErr) {
            setSaveStatus({ state: "error", message: phoneErr });
            return;
        }

        setSaveStatus({ state: "saving" });
        const res = await saveDraftByPhone(draft.phone, draft);
        if (res.ok) setSaveStatus({ state: "saved" });
        else setSaveStatus({ state: "error", message: res.message });
    }

    return (
        <div className="mt-6 rounded-2xl glass px-5 py-4 ring-1 ring-white/15">
            <div className="flex items-center gap-3">
                <span className="text-white/60">💾</span>
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Enter phone number to save the draft"
                    className="flex-1 bg-transparent text-white/80 placeholder:text-white/50 focus:outline-none"
                />

                <button
                    type="button" onClick={onSaveDraft} disabled={saveStatus.state === "saving"}
                    className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white/80 hover:bg-white/15"
                    aria-label="Save draft"
                    title="Save draft"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white/90"
                    >
                        <path
                            d="M5 12h14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                        <path
                            d="M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                {saveStatus.state === "saving" && (
                    <InlineStatus text="Saving…" />
                )}
                {saveStatus.state === "saved" && (
                    <InlineStatus text="Saved" tone="success" />
                )}
                {loadStatus.state === "loaded" && (
                    <InlineStatus text="Draft loaded" />
                )}

            </div>
        </div>
    );
}
