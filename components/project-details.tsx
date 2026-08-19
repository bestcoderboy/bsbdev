"use client";

import {ChevronLeft, ChevronRight} from "lucide-react";
import ProjectItem from "@/components/project-item";
import {useState} from "react";

const currentProjects: { logo: string | false, header: string, description: string, link: string }[] = [
    {
        logo: "/logos/rotheme-logo.webp",
        header: "rotheme",
        description: "A powerful, customizable theme editor for Roblox.",
        link: "https://rotheme.com"
    },
    {
        logo: false,
        header: "The Roblox Archives",
        description: "Over 46K posts from the DevForum's old Lounge category.",
        link: "https://archive.bsb.dev"
    },
    {
        logo: "/logos/bsb-tools-logo.webp",
        header: "tools.bsb.dev",
        description: "An online collection of useful text/developer utilities.",
        link: "https://tools.bsb.dev"
    },
]

const previousWork: { logo: string | false, header: string, description: string, link: string | false }[] = [
    {
        logo: "/logos/rankgun-icon.webp",
        header: "rankgun centres",
        description: "Designed two react-lua apps for use by Rankgun customers. Claim group roles with either a gamepass purchase or a successful quiz attempt.",
        link: "https://github.com/rankgun/application-centre"
    },
    {
        logo: "/logos/tle-icon.webp",
        header: "The Luxury Elevator",
        description: "Rebuilt all the UI and client scripting, led QA, and refactored the legacy codebase.",
        link: "https://theluxuryelevator.com"
    },
    {
        logo: "/logos/saas-thumb.webp",
        header: "Stare at a Stud",
        description: "My game to demonstrate UI and scripting proficiency. Collect and trade studs.",
        link: false
    },
]

export default function ProjectDetails() {
    const [currentTab, setCurrentTab] = useState<"current" | "previous">("current");
    const toggleTab = () =>
        setCurrentTab((prev) => (prev === "current" ? "previous" : "current"));

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">
                    {currentTab === "current" ? "Current projects" : "Previous work"}
                </h2>
                <div className="flex items-center gap-2">
                    <button className="px-2 py-1 bg-white/5 rounded-md cursor-pointer" onClick={toggleTab}>
                        <ChevronLeft />
                    </button>
                    <button className="px-2 py-1 bg-white/5 rounded-md cursor-pointer" onClick={toggleTab}>
                        <ChevronRight />
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {(currentTab === "current" ? currentProjects : previousWork)
                    .map((item, i) => (
                        <ProjectItem {...item} key={i} />
                    ))
                }
            </div>
        </div>
    )
}