"use client";

import {Archive, CloudBackup, Key, Mail, MailWarning, X} from "lucide-react";
import {useState} from "react";

function EmailDetails({ closeModal }: { closeModal: () => void }) {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/80 flex justify-center items-center">
            <div className="w-full max-w-sm bg-[#121212] rounded-md p-8 relative">
                <X className="size-8 cursor-pointer absolute right-3 top-3" onClick={closeModal} />

                <p className="flex gap-3 text-xl mb-3">
                    <Mail className="size-7" /> <a href="mailto:me@bsb.dev">me@bsb.dev</a>
                </p>
                <p className="flex gap-3 text-xl mb-5 text-white/70">
                    <Archive className="size-7" /> <a href="mailto:bsb@tuta.com">bsb@tuta.com</a>
                </p>
                <p className="flex gap-3 text-xl mb-3">
                    <Key className="size-7" /> <a href="/pgp.asc" className="underline decoration-1 decoration-white/70">My PGP public key</a>
                </p>
                <p className="bg-white/5 font-mono text-white/70 text-sm px-2 py-1 rounded-md">8926 31B2 6528 91B0 CE99 9D02 20B9 55C0 C6B8 8EF2</p>
            </div>
        </div>
    )
}


export default function EmailButton() {
    const [emailDetailsOpen, setEmailDetailsOpen] = useState(false);

    return (
        <>
            <div className="flex gap-1.5 items-center text-white/70">
                <Mail className="size-5" />
                <button className="cursor-pointer" onClick={() => setEmailDetailsOpen(true)}>Email + PGP</button>
            </div>
            {emailDetailsOpen && <EmailDetails closeModal={() => setEmailDetailsOpen(false)} />}
        </>
    )
}