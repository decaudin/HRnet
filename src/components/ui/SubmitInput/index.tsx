interface SubmitInputProps {
    value: string;
}

export default function SubmitInput({ value }: SubmitInputProps) {

    return <input type="submit" value={value} className="border bg-gray-100 px-2 mx-auto mt-8 cursor-pointer hover:bg-gray-200" />
}