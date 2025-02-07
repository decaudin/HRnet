// import { Dispatch, SetStateAction, ChangeEvent } from "react";

// type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

// export const handleStringInputChange = (setter: Dispatch<SetStateAction<string>>) => (e: InputChangeEvent) => {
//     const { value } = e.target;
//     setter(value);
// };

import { Dispatch, SetStateAction, ChangeEvent } from "react";

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export const handleStringInputChange = (setter: Dispatch<SetStateAction<string>>) => (e: InputChangeEvent | string) => {
        if (typeof e === "string") {
            setter(e); // Cas où on passe directement une string
        } else {
            setter(e.target.value); // Cas où on passe un événement
        }
    };
