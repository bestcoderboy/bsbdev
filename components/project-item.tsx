export default function ProjectItem({ logo, header, description, link }: { logo: string | false, header: string, description: string, link: string}) {
    return (
        <div className="flex items-center gap-5 bg-white/5 rounded-md px-5 py-3">
            {logo ?
                <img src={logo} alt={`Logo of ${header}`} className="rounded-xl size-16 border border-white/10"/> :
                <div className="rounded-xl aspect-square size-16 bg-blue-500 border border-white/10"/>
            }
            <div>
                <h3 className="text-xl font-medium">{header}</h3>
                <p className="font-light">{description}</p>
                <a href={link} className="text-white/70 text-sm">{link} -&gt;</a>
            </div>
        </div>
    );
};