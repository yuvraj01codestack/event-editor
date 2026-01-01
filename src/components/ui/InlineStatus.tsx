export function InlineStatus({
                                 text,
                                 tone = "neutral",
                             }: {
    text: string;
    tone?: "neutral" | "success" | "error";
}) {
    const color =
        tone === "success"
            ? "text-emerald-300"
            : tone === "error"
                ? "text-red-300"
                : "text-white/50";

    return (
        <span className={`text-xs ${color}`}>
      {text}
    </span>
    );
}
