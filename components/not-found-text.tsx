"use client";

import {useEffect, useState} from "react";

const titleClasses = `font-semibold text-transparent bg-clip-text ` +
    `bg-gradient-to-bl from-teal-100 to-teal-300 ` +
    `text-shadow-[0_0_10px] text-shadow-teal-300/30`;

export function NotFoundText() {
    const [foundText, setFoundText] = useState(<>Couldn&apos;t find this page.</>);

    useEffect(() => {
        let cursor = 0;
        const konamiCodes = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

        document.addEventListener("keydown", (e) => {
            const expected = konamiCodes[cursor];
            cursor = e.key === expected ? cursor + 1 : 0;

            if (cursor === konamiCodes.length) {
                setFoundText(<>
                    Still <a href="//bsb.dev/secret" className="underline">nothing</a> here.
                </>);
            }
        });
    }, []);

    return (
            <div>
                <h1 className={`text-7xl md:text-8xl roboto-mono mb-3 md:mb-0 md:me-5 xl:me-7 ${titleClasses}`}>404</h1>
                <p className="text-3xl mt-3 mb-8 subtitle">{foundText} It may be a short link that expired.</p>
                <p className="flex font-medium text-2xl items-center gap-3">— <img
                    src="/logos/bsb-profile.webp" className="size-8"/> bsb.dev</p>
            </div>
    )
}