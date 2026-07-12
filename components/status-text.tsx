import {Code, Gamepad2, Music} from "lucide-react";

const EmptyIcon = () => <></>;

export default function StatusText(
    { status, statusColor, musicData, activityData }: { status: string, statusColor: string, musicData: { song: string, artist: string } | null, activityData: { name: string } }
) {
    const codingActivities = ["VS Code", "WebStorm", "PyCharm"];
    const isCoding = codingActivities.includes(activityData?.name);

    const Icon = isCoding ? Code : activityData ? Gamepad2 : EmptyIcon;

    return (
        <p className="text-white/50 text-sm mt-4 flex gap-3 items-center">
            <span className={`size-3 relative ${statusColor} rounded-full`}>
                <span className={`size-3 absolute top-0 ${statusColor} rounded-full animate-ping`} />
            </span>

            {musicData && <>
                <span>
                    Listening to <span className="font-semibold">{musicData.song}</span> by <span className="font-semibold">{musicData.artist}</span>
                </span>
                <Music className="text-gray-400 size-4 -ms-2" />
            </>}

            {musicData && activityData && "•"}

            {activityData && <>
                <span>
                    {isCoding ? "Developing on" : "Playing"} <span className="font-semibold">{activityData.name}</span>
                </span>
                <Icon className="text-gray-400 size-4 -ms-2" />
            </>}

            {!activityData && !musicData && `Currently ${status}`}
        </p>
    )
}