import { DiscordIcon, GithubIcon, RobloxIcon } from "@/components/social-icons";
import ModalLink from "@/components/modal-link";
import StatusText from "@/components/status-text";
import EmailButton from "@/components/email-details";
import ProjectDetails from "@/components/project-details";

const titleClasses = `font-semibold text-transparent bg-clip-text ` +
    `bg-gradient-to-bl from-teal-100 to-teal-300 ` +
    `text-shadow-[0_0_10px] text-shadow-teal-300/30`;

const WebIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
         className="inline-block size-5 -mt-0.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
        <path d="M2 12h20"/>
    </svg>
)

export const dynamic = "force-dynamic";

export default async function BetaPage() {
    // get my current discord status from Lanyard
    const lanyardReq = await fetch("https://api.lanyard.rest/v1/users/725417693699899534", {
        cache: "no-store"
    });

    let discordData = null;
    if (lanyardReq.ok) discordData = await lanyardReq.json();

    const statusColor = discordData?.data?.discord_status === "online" ?
        "bg-green-500" : discordData?.data?.discord_status === "idle" ?
            "bg-yellow-500" : "bg-gray-400";

    const musicData = discordData?.data?.spotify ? {
        song: discordData.data.spotify.song,
        artist: discordData.data.spotify.artist.replace(";", ",")
    } : null;

    // if there's music data, the first activity will always be spotify
    const activityData = discordData?.data?.activities && discordData.data.activities[
        (musicData !== null) ? 1 : 0
    ];

    return (
        <div className="w-screen min-h-svh flex flex-col items-center text-white bg-white/2">
            <div className="w-full h-full max-w-200 pt-12 px-5">
                <div className="text-lg md:text-xl">
                    <div className="flex gap-4 items-center mb-3">
                        <div className="relative">
                            <img src="/logos/bsb-profile.webp" className="size-12 aspect-square object-scale-down" alt="" />
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-light">Hello, I&apos;m
                            <span className={titleClasses}> BestSpyBoy</span>.
                        </h1>
                    </div>
                    <p>I&apos;m a full-stack developer that specialises in advanced project design.</p>
                    <p className="text-white/80 text-base md:text-xl mt-2 md:mt-0">My work spans across&nbsp;
                        <WebIcon/> <ModalLink text="the web" modalText="5K+ extension users" />
                        &nbsp;and <RobloxIcon className="-mt-1"/>&nbsp;
                        <ModalLink text="Roblox games" modalText="Contributed 10M+ visits" />.
                    </p>
                    {discordData ? <StatusText
                        status={discordData.data.discord_status}
                        statusColor={statusColor}
                        musicData={musicData}
                        activityData={activityData}
                    /> : null}
                </div>

                <hr className="border border-white/10 my-5"/>

                <ProjectDetails />

                <hr className="border border-white/10 my-5"/>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    <div className="flex gap-1.5 items-center text-white/70">
                        <RobloxIcon className="size-4 -mt-px"/> <a
                        href="https://www.roblox.com/users/301814265/profile">@BestSpyBoy</a>
                    </div>
                    <span className="hidden md:block">•</span>
                    <div className="flex gap-1.5 items-center text-white/70">
                        <GithubIcon className="size-5"/> <a href="https://github.com/bestcoderboy">@bestcoderboy</a>
                    </div>
                    <span className="hidden md:block">•</span>
                    <div className="flex gap-1.5 items-center text-white/70">
                        <DiscordIcon className="size-5"/> <a href="https://bsb.dev/discord">@bestspyboy</a>
                    </div>
                    <span className="hidden md:block">•</span>
                    <EmailButton />
                </div>

                <div className="mb-12">
                    <noscript>
                        <p className="text-red-400 mt-2">JavaScript is required to view my email.</p>
                    </noscript>
                </div>
            </div>
        </div>
    )
}