import { useRef, KeyboardEvent, FocusEvent, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalType = {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    children: ReactNode;
};

export default function Modal({ isOpen, onClose, className = '', children }: ModalType) {
    return createPortal(
        <div
            tabIndex={1}
            className={`${isOpen ? '' : 'hidden'} fixed z-10 inset-0 overflow-y-auto`}
        >
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-md"></div>
                </div>
                <div
                    className={
                        'rounded-lg overflow-auto shadow-xl transform transition-all min-w-lg mx-auto ' +
                        className
                    }
                    role="dialog"
                    aria-modal="true"
                    id="modal"
                >
                    {children}
                </div>
            </div>
        </div>,
        document.body,
    );
}
