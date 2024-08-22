import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link"
import { SquareMenu } from "lucide-react"

const Sidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button><SquareMenu size={35} absoluteStrokeWidth/></button>
            </SheetTrigger>
            <SheetContent>
                <div className="flex flex-col gap-5 mt-4 text-lg">
                    <Link className='hover:border-2 opacity-60 hover:opacity-100 px-2 py-1 hover:border-black hover:rounded-lg' href={"#home"}>Home</Link>
                    <Link className='hover:border-2 opacity-60 hover:opacity-100 px-2 py-1 hover:border-black hover:rounded-lg' href={"#about"}>About</Link>
                    <Link className='hover:border-2 opacity-60 hover:opacity-100 px-2 py-1 hover:border-black hover:rounded-lg' href={"#projects"}>Projects</Link>
                    <Link className='hover:border-2 opacity-60 hover:opacity-100 px-2 py-1 hover:border-black hover:rounded-lg' href={"#skills"}>Skills</Link>
                    <Link className='hover:border-2 opacity-60 hover:opacity-100 px-2 py-1 hover:border-black hover:rounded-lg' href={"#footer"}>Contact</Link>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default Sidebar