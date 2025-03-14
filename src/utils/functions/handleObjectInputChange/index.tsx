import { Dispatch, SetStateAction, ChangeEvent } from "react";

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export const handleObjectInputChange = <T extends object>(setter: Dispatch<SetStateAction<T>>, setErrors?: Dispatch<SetStateAction<{ [key: string]: boolean }>>) => (e: InputChangeEvent | string) => {
    if (typeof e === "string") {
        setter((prevData) => ({ ...prevData, state: e })); 
    } else {
        const { name, value } = e.target;
        setter((prevData) => ({ ...prevData, [name]: value }));
        if (setErrors) setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    }
};