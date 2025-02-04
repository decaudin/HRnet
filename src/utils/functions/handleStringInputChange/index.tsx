import { Dispatch, SetStateAction, ChangeEvent } from "react";

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export const handleStringInputChange = (setter: Dispatch<SetStateAction<string>>) => (e: InputChangeEvent) => {
    const { value } = e.target;
    setter(value);
};
