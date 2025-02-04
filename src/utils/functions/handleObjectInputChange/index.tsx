import { Dispatch, SetStateAction, ChangeEvent } from "react";

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export const handleObjectInputChange = <T extends object>(setter: Dispatch<SetStateAction<T>>) => (e: InputChangeEvent) => {
   const { name, value } = e.target;
   setter((prevData) => ({ ...prevData, [name]: value }));
};