import { useEffect, useRef } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {

    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (isOpen) {
        closeButtonRef.current?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div aria-modal="true" role="dialog" onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 text-lg">
            <div role="document" ref={modalRef} onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md min-h-[200px] flex items-center justify-center text-center">
                <button aria-label="Close modal" ref={closeButtonRef} onClick={onClose} className="absolute top-1 right-3 text-2xl text-gray-700 hover:text-black cursor-pointer">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}