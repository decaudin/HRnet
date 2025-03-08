import { Dispatch, SetStateAction, useState, useEffect, useRef, MouseEvent } from "react";
import { formatDate } from '../../../utils/functions/formatDate';
import { handleStringInputChange } from '../../../utils/functions/handleStringInputChange';
import Input from '../Input';
import RenderCalendarDays from '../RenderCalendarDays';
import Select from "../Select";

interface DatePickerProps {
    inputId: string;
    inputLabel: string;
    inputName: string;
    isError: boolean;
    errorKey: string;
    isSubmittedSuccessfully: boolean;
    setErrors: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
    onChange: (date: Date | null) => void;
}

export default function DatePicker({ inputId, inputLabel, inputName, isError, errorKey, isSubmittedSuccessfully, setErrors, onChange }: DatePickerProps) {

    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [viewDate, setViewDate] = useState(new Date());
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const calendarRef = useRef<HTMLDivElement | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        const handleClickOutside = (e: Event) => {
            if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
    
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscapeKey);
        }
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        }
    }, [isOpen]);

    const handleMonthChange = (e: MouseEvent<HTMLButtonElement>, direction: 'prev' | 'next') => {
        e.preventDefault();
        const newDate = new Date(viewDate);
        if (direction === 'prev') newDate.setMonth(newDate.getMonth() - 1);
        else newDate.setMonth(newDate.getMonth() + 1);
        setViewDate(newDate);
    };

    const handleTodayClick = (e: MouseEvent) => {
        e.preventDefault()
        const today = new Date();
        setViewDate(today);
    };

    const selectHandleMonthChange = (month: string) => {
        const newViewDate = new Date(viewDate);
        newViewDate.setMonth(months.indexOf(month));
        setViewDate(newViewDate);
    };

    const handleYearChange = (year: number) => {
        const newViewDate = new Date(viewDate);
        newViewDate.setFullYear(year);
        setViewDate(newViewDate);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
      
        if (value.length === 4 && /^\d{4}$/.test(value)) {
          const parsedYear = new Date(`${value}-01-01`);
          setViewDate(parsedYear);
        }
      
        if (value.length === 7 && /^\d{4}-(0[1-9]|1[0-2])$/.test(value)) {
          const parsedDate = new Date(value);
          setViewDate(parsedDate);
        }

        handleStringInputChange(setInputValue, setErrors)(e);
    };

    const isValidDate = (year: number, month: number, day: number) => {
        const testDate = new Date(year, month - 1, day);
        return (
            testDate.getFullYear() === year &&
            testDate.getMonth() === month - 1 &&
            testDate.getDate() === day
        );
    };

    const handleBlur = () => {

        if (!inputValue.trim()) {
            setSelectedDate(null);
            onChange(null);
            return;
        }
    
        const dateString = inputValue.trim().replace(/\//g, "-");
        const dateParts = dateString.split("-").map(Number);
        let parsedDate: Date | null = null;
    
        if (dateParts.length === 3) {
            const [year, month, day] = dateParts;
    
            if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && isValidDate(year, month, day)) {
                parsedDate = new Date(year, month - 1, day);
            }
        }
    
        if (parsedDate && !isNaN(parsedDate.getTime())) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
    
            if (parsedDate > today) {
                setInputValue("");
                setErrorMessage("The date cannot be in the future.");
            } else {
                setSelectedDate(parsedDate);
                setInputValue(formatDate(parsedDate));
                onChange(parsedDate);
                setErrorMessage(null);
            }
        } else {
            setInputValue("");
            setErrorMessage("Invalid date. Please enter a valid date.");
        }
    }

    const handleCalendarBlur = (e: React.FocusEvent) => {
        if (calendarRef.current && !calendarRef.current.contains(e.relatedTarget)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isSubmittedSuccessfully) {
            setInputValue("");
            setSelectedDate(null);
        }
    }, [isSubmittedSuccessfully]);

    return (
        <div className="relative w-full flex flex-col items-center">
            <Input id={inputId} label={inputLabel} type="text" name={inputName} value={inputValue} onChange={handleInputChange} onBlur={handleBlur} onFocus={() => setIsOpen(true)} isError={isError} placeholder="YYYY-MM-DD" />
            {isOpen && (
                <div ref={calendarRef} className="absolute z-50 bg-white shadow-lg rounded-lg p-4 mt-20 w-72" onBlur={handleCalendarBlur}>
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={(e) => handleMonthChange(e, 'prev')} className="text-gray-400 cursor-pointer hover:text-gray-900">◀</button>

                        <div className="flex items-center space-x-2">
                            <button onClick={handleTodayClick} className="text-gray-600 cursor-pointer hover:text-gray-900">🏠</button>
                            <Select value={months[viewDate.getMonth()]} options={months} onChange={(e) => selectHandleMonthChange(e.target.value)} className="h-[34px] text-gray-700 border-gray-300 p-1 rounded-md" />
                            <input type="number" value={viewDate.getFullYear()} onChange={(e) => handleYearChange(parseInt(e.target.value, 10))} className="w-20 text-gray-700 border border-gray-300 p-1 pl-2 rounded-md cursor-pointer" />
                        </div>

                        <button onClick={(e) => handleMonthChange(e, 'next')} className="text-gray-400 cursor-pointer hover:text-gray-900">▶</button>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center mb-4">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                          <div key={index} className="font-bold">{day}</div>
                        ))}
                        <RenderCalendarDays viewDate={viewDate} selectedDate={selectedDate} errorKey={errorKey} setSelectedDate={setSelectedDate} setInputValue={setInputValue} setIsOpen={setIsOpen} setErrorMessage={setErrorMessage} setErrors={setErrors} onChange={onChange} />
                    </div>
                </div>
            )}
            {errorMessage && <span className="text-red-500 mt-2 text-center">{errorMessage}</span>}
        </div>
    );
}