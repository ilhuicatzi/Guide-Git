
import Link from "next/link"
import { ModeToggle } from "./ModeToggle"

function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4">
            <div>
                <h1 className="text-2xl font-bold">
                    <Link href="/">Git</Link>
                </h1>
            </div>
            <div className="flex items-center space-x-4">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                </ul>
                <ModeToggle />
            </div>
        </nav>
    )
}

export default Navbar