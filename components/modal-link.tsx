"use client";

import {useState} from "react";

export default function ModalLink({ text, modalText }: { text: string, modalText: string }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <a className="underline decoration-1 relative cursor-pointer" onMouseEnter={() => setModalOpen(true)} onMouseLeave={() => setModalOpen(false)}>
            <span className={`absolute ${modalOpen ? "opacity-100" : "opacity-0"} border border-white/10 transition-opacity w-45 bottom-full left-1/2 -translate-x-1/2 bg-[#121212] rounded-md px-3 py-0.5 text-sm mb-2 text-center`}>
                {modalText}
            </span>
            {text}
        </a>
    )
}