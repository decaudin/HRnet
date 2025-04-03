import { Dispatch, SetStateAction, FocusEvent } from "react";

export const validateNoDigitsOrSpecialChars = (value: string): boolean => /^[a-zA-ZÀ-ÿ\s-']*$/.test(value);

export const validateNoSpecialChars = (value: string): boolean => /^[a-zA-ZÀ-ÿ0-9\s-']*$/.test(value);

interface ValidateTextOnBlurParams {
    e: FocusEvent<HTMLInputElement>;
    setTextErrors: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
    validate: (value: string) => boolean;
}

const validateTextOnBlur = ({ e, setTextErrors, validate }: ValidateTextOnBlurParams): boolean => {
    const { name, value } = e.target;
    const hasTextError = !validate(value);

    setTextErrors((prevTextErrors) => ({
        ...prevTextErrors,
        [name]: hasTextError,
    }));

    return hasTextError;
};

interface HandleBlurParams<T extends Record<string, string>> {
    e: FocusEvent<HTMLInputElement>;
    setTextErrors: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
    setFormData: Dispatch<SetStateAction<T>>;
    validate: (value: string) => boolean;
}

export const handleBlur = <T extends Record<string, string>>({ e, setTextErrors, setFormData, validate, }: HandleBlurParams<T>) => {

    const hasError = validateTextOnBlur({ e, setTextErrors, validate });

    if (hasError) {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: "",
        }));
    }
};