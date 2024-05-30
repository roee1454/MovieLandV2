import { Link } from "@remix-run/react"

export default function Navbar() {
    return <header className="px-6 md:px-24 py-6 w-full flex flex-row justify-between items-center">
        <div className="text-[24px] text-nowrap font-bold flex cursor-pointer">
            <div className="text-black">Movie</div> 
            <div className="text-blue-500">Land.</div>
        </div>
        <div className="flex flex-row justify-center items-center gap-4">
            <NavItem label="Home" to="/" />
            <NavItem label="Explore" to="/explore"/>
        </div>
    </header>
}

interface NavItemProps {
    label: string,
    to: string
}

function NavItem({ label, to }: NavItemProps) {
    return <Link className="font-semibold py-2 px-6 rounded-md transition-all hover:bg-slate-300" to={to}>{label}</Link>
}