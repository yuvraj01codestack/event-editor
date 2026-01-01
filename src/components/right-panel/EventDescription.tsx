
type Props = {
    value?: string;
    onChange?: (v: string) => void;
};

export function EventDescription({ value, onChange }: Props) {



    return (
        <div className="mt-5 rounded-2xl glass px-5 py-5 ring-1 ring-white/15">
      <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Describe your event"
          className="min-h-[88px] w-full resize-none bg-transparent text-white/75 placeholder:text-white/50 focus:outline-none"
      />


        </div>
    );
}
