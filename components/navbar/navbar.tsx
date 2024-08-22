import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { Fredoka } from 'next/font/google';
import Sidebar from './sidebar';

const fredoka = Fredoka({
    subsets: ['latin'],
    weight: ["700"],
});

const Navbar = () => {
    return (
        <>
            <div className="top-0 z-20 fixed flex bg-slate-100 opacity-85 w-full h-14">
                {/* <div className='flex items-center mx-4 font-["Fredoka"] font-bold text-lg'>Rashmi</div> */}
                <div className={`flex items-center mx-4 ${fredoka.className} text-3xl font-black`}>Rashmi</div>
                <div className='flex ml-auto'>
                    <div className='md:flex justify-center items-center gap-8 hidden mx-6 md:w-full font-serif text-lg'>
                        <Link className='opacity-60 hover:opacity-100' href={"#home"}>Home</Link>
                        <Link className='opacity-60 hover:opacity-100' href={"#about"}>About</Link>
                        <Link className='opacity-60 hover:opacity-100' href={"#projects"}>Projects</Link>
                        <Link className='opacity-60 hover:opacity-100' href={"#skills"}>Skills</Link>
                        <Link className='opacity-60 hover:opacity-100' href={"#footer"}>Contact</Link>
                    </div>
                </div>
                <div className='flex justify-center items-center md:hidden mr-4 ml-auto'>
                    <Sidebar />
                </div>
            </div>
        </>
    )
}

export default Navbar