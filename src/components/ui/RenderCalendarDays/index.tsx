import { Dispatch, SetStateAction, useMemo, useRef } from "react";
import { formatDate } from "../../../utils/functions/formatDate";

interface RenderCalendarDaysProps {
    viewDate: Date;
    selectedDate: Date | null;
    errorKey: string;
    setSelectedDate: Dispatch<SetStateAction<Date | null>>;
    setInputValue: Dispatch<SetStateAction<string>>;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setErrorMessage: Dispatch<SetStateAction<string | null>>;
    setEmptyErrors: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
    onChange: (date: Date) => void;
}

export default function RenderCalendarDays({ viewDate, selectedDate, errorKey, setSelectedDate, setInputValue, setIsOpen, setErrorMessage, setEmptyErrors, onChange }: RenderCalendarDaysProps) {

    const dayRefs = useRef<(HTMLDivElement | null)[]>([]);

    const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
    
    const endOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const startOfWeek = (date: Date) => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() - date.getDay());
        return newDate;
    };

    const endOfWeek = (date: Date) => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + (6 - date.getDay()));
        return newDate;
    };

    const eachDayOfInterval = ({ start, end }: { start: Date; end: Date }) => {
        const days = [];
        const current = new Date(start);
        while (current <= end) {
            days.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        return days;
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setInputValue(formatDate(date));
        setIsOpen(false);
        setErrorMessage(null);
        setEmptyErrors((prevErrors) => ({...prevErrors, [errorKey]: false }));
        onChange(date);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, date: Date) => {
        if (e.key === "Tab" && e.shiftKey) {
            return;
        }
        
        e.preventDefault();

        const currentIndex = days.findIndex((d) => d.getTime() === date.getTime());
        let newIndex = currentIndex;
        const today = new Date();
        const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        switch (e.key) {
            case "ArrowRight":
                if (currentIndex + 1 < days.length && days[currentIndex + 1] <= normalizedToday) {
                    newIndex = currentIndex + 1;
                }
                break;
            case "ArrowLeft":
                newIndex = Math.max(currentIndex - 1, 0);
                break;
            case "ArrowDown":
                if (currentIndex + 7 < days.length && days[currentIndex + 7] <= normalizedToday) {
                    newIndex = currentIndex + 7;
                } else {
                    if (normalizedToday <= days[days.length - 1]) {
                        newIndex = days.findIndex(d => d.getTime() === normalizedToday.getTime());
                    } else {
                        newIndex = days.length - 1;
                    }
                }
                break;
            case "ArrowUp":
                newIndex = Math.max(currentIndex - 7, 0);
                break;
            case "Enter":
            case " ":
                handleDateClick(days[newIndex]);
                return;
            case "Tab":
                if (!e.shiftKey) {
                    setIsOpen(false);
                }
                return;
            default:
                return;
        }
        
        setTimeout(() => {
            dayRefs.current[newIndex]?.focus();
        }, 0);
    };    

    const days = useMemo(() => {
        const firstDayOfMonth = startOfMonth(viewDate);
        const lastDayOfMonth = endOfMonth(viewDate);
        const firstDayOfWeekStart = startOfWeek(firstDayOfMonth);
        const lastDayOfWeekEnd = endOfWeek(lastDayOfMonth);
        return eachDayOfInterval({ start: firstDayOfWeekStart, end: lastDayOfWeekEnd });
      }, [viewDate]);
    
    return (
        <>
            {days.map((day, index) => {
                const isCurrentMonth = day.getMonth() === viewDate.getMonth();
                const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                const isToday = new Date().toDateString() === day.toDateString();
                const isFuture = day > new Date();
                const dayClass = `${isCurrentMonth ? '' : 'text-gray-400'} ${isSelected ? 'bg-blue-500 text-white' : ''} ${isToday ? 'border-2 border-blue-500' : ''} ${isFuture ? 'cursor-not-allowed text-gray-300' : 'cursor-pointer hover:bg-orange-400 hover:text-white focus:bg-orange-400 focus:text-white'} py-2 rounded-lg`;
    
                return (
                    <div
                        key={day.getTime()}
                        ref={(el) => dayRefs.current[index] = el}
                        role="button"
                        aria-label={`Date: ${formatDate(day)}`}
                        aria-selected={isSelected || false}
                        aria-disabled={isFuture}
                        tabIndex={isFuture ? -1 : 0}
                        onClick={() => !isFuture && handleDateClick(day)}
                        onKeyDown={(e) => !isFuture && handleKeyDown(e, day)}
                        className={dayClass}
                    >
                        {day.getDate()}
                    </div>
                );
            })}
            
            <div aria-live="polite" className="sr-only">
                {selectedDate ? `Selected date: ${formatDate(selectedDate)}` : "No date selected"}
            </div>
        </>
    );
};