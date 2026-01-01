import {useEffect, useRef, useState} from "react";
import {CustomizeCard} from "./CustomizeCard";
import {EventCoreFieldsCard} from "./EventCoreFieldsCard";
import {EventDescription} from "./EventDescription";
import {EventTitleInput} from "./EventTitleInput";
import {GoLiveButton} from "./GoLiveButton";
import {QuickActionsRow} from "./QuickActionsRow";
import {DraftPhoneInput} from "./DraftPhoneInput.tsx";
import {useRecoilState} from "recoil";
import {eventDraftAtom} from "../../state/eventDraft.atom.ts";
import {ModulesList} from "./ModulesList.tsx";
import {ModulesValidationError} from "./ModulesValidationError.tsx";
import {draftLoadStatusAtom, saveDraftStatusAtom} from "../../state/ui.atoms.ts";
import {useDebouncedValue} from "../../hooks/useDebouncedValue.ts";
import {loadDraftByPhone} from "../../services/eventDraftApi.ts";


export function RightPanel() {
    const [, setLocLoading] = useState(false);

    const [draft, setDraft] = useRecoilState(eventDraftAtom);
    const [saveStatus, setSaveStatus] = useRecoilState(saveDraftStatusAtom);
    const [loadStatus, setLoadStatus] = useRecoilState(draftLoadStatusAtom);

    const debouncedPhone = useDebouncedValue(draft.phone.trim(), 500);
    const lastLoadedPhoneRef = useRef<string>("");

    useEffect(() => {
        if (saveStatus.state === "saved") {
            const t = setTimeout(
                () => setSaveStatus({state: "idle"}),
                2500
            );
            return () => clearTimeout(t);
        }
    }, [saveStatus.state]);

    useEffect(() => {
        if (loadStatus.state === "loaded") {
            const t = setTimeout(
                () => setLoadStatus({state: "idle"}),
                2500
            );
            return () => clearTimeout(t);
        }
    }, [loadStatus.state]);


    useEffect(() => {
        async function run() {
            const phone = debouncedPhone;

            // don’t try on tiny values
            if (!phone || phone.length < 8) {
                setLoadStatus({state: "idle"});
                return;
            }

            // prevent re-loading same phone repeatedly
            if (lastLoadedPhoneRef.current === phone) return;

            setLoadStatus({state: "loading"});

            const res = await loadDraftByPhone(phone);
            if (!res.ok) {
                setLoadStatus({state: "not_found"});
                return;
            }

            lastLoadedPhoneRef.current = phone;
            setDraft(res.draft);
            setLoadStatus({state: "loaded"});
        }

        void run();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedPhone]);

    async function mockAutoDetectLocation() {
        setLocLoading(true);
        await new Promise((r) => setTimeout(r, 600));
        setDraft((d) => ({...d, location: "MG Road, Bengaluru, Karnataka, India"}));
        setLocLoading(false);
    }

    return (
        <div className="w-full max-w-[760px]">
            <EventTitleInput
                value={draft.title}
                onChange={(v) =>
                    setDraft((d) => ({...d, title: v}))
                }
            />

            <DraftPhoneInput
                value={draft.phone}
                onChange={(v) =>
                    setDraft((d) => ({...d, phone: v}))
                }
            />


            <EventCoreFieldsCard
                dateTime={draft.dateTime}
                onDateTimeChange={(v) =>
                    setDraft((d) => ({...d, dateTime: v}))
                }
                location={draft.location}
                onLocationChange={(v) =>
                    setDraft((d) => ({...d, location: v}))
                }
                cost={draft.cost}
                onCostChange={(v) =>
                    setDraft((d) => ({...d, cost: v}))
                }
                onAutoDetectLocation={mockAutoDetectLocation}
            />

            <EventDescription/>

            <ModulesList/>
            <ModulesValidationError/>
            <QuickActionsRow/>

            <CustomizeCard/>

            <GoLiveButton/>
        </div>
    );
}
