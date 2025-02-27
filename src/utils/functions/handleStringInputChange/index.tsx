import { Dispatch, SetStateAction, ChangeEvent } from "react";

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export const handleStringInputChange = (setter: Dispatch<SetStateAction<string>>, setErrors?: Dispatch<SetStateAction<{ [key: string]: boolean }>>) => (e: InputChangeEvent | string) => {
    if (typeof e === "string") {
        setter(e);
    } else {
        const { name, value } = e.target;
        setter(value);
        if (setErrors) setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }
};