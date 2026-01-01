export function formatDateTime(value: string) {
    if (!value) return "Date and time";

    const d = new Date(value);
    return d.toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}