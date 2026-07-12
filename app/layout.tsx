import { Instrument_Sans } from "next/font/google";
import { Metadata } from "next";
import { ReactNode } from "react";

import "./globals.css";

const instrumentSans = Instrument_Sans();

export const metadata: Metadata = {
    title: "BestSpyBoy",
    description: "A software developer specialising in large-scale projects, data preservation, and developer tooling.",
}

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html>
            <body className={`${instrumentSans.className} bg-black`}>
                {children}
                <script defer src="https://bsb.dev/l/script.js" data-website-id="5cce7e6b-ed4a-45dc-93ff-27e1ca4d8ca4"
                        data-host-url="https://bsb.dev"></script>
            </body>
        </html>
    )
}