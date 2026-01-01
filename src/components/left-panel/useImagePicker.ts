import { useRef } from "react";

export function useImagePicker() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    function open() {
        inputRef.current?.click();
    }

    function reset(e: React.ChangeEvent<HTMLInputElement>) {
        e.currentTarget.value = "";
    }

    return { inputRef, open, reset };
}
