import {NotFoundText} from "@/components/not-found-text";

export default function Page() {
    return (
        <div className="bg-radial from-slate-950 to-black overflow-x-clip wrap-break-word text-white">
            <div className="w-full min-h-screen md:px-8 lg:px-24 xl:px-32 py-8 md:py-24 lg:py-32 flex flex-col justify-end">
                <NotFoundText />
            </div>
        </div>
    )
}