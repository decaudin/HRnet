interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    wrapperClassName?: string;
    inputClassName?: string;
    isEmptyError?: boolean;
    isTextError?: boolean;
    errorMessage?: string | null;
}

export default function Input({ id, label, type, name, value, onChange, wrapperClassName = "", inputClassName = "", isEmptyError, isTextError, errorMessage, ...props }: InputProps) {

    return (
        <>
            <div className={`flex flex-col my-2 ${wrapperClassName}`}>
                <label htmlFor={id}>
                    {label}
                </label>
                <input type={type} id={id} name={name} value={value} onChange={onChange} className={`pl-2 pr-1 mt-2 w-[180px] bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-700 ${(isEmptyError || isTextError || errorMessage) && "border border-red-500 focus:ring-red-500"} ${inputClassName}`} {...props} />
                {isEmptyError && <p className="text-red-500 mt-2">This field is required</p>}
                {isTextError && (<p className="text-red-500 mt-2">{name === "street" ? "Invalid characters" : "Invalid characters or digits"}</p>)}
            </div>
            {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        </>
    );
}