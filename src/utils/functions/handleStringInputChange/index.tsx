import { Dispatch, SetStateAction, ChangeEvent } from "react";

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export const handleStringInputChange = (setter: Dispatch<SetStateAction<string>>) => (e: InputChangeEvent | string) => {
    if (typeof e === "string") {
        setter(e);
    } else {
        setter(e.target.value);
    }
};