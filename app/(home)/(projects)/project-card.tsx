import React from 'react'
import Image from 'next/image';
import { Github, Eye } from 'lucide-react';

interface Props {
    proj: {
        name: string;
        category: string;
        image: string;
        desc: string;
        link: string;
        github: string;
    };
}

const ProjectCard = ({ proj }: Props) => {
    return (
        <div key={proj.name} className='flex flex-col justify-center items-center border-2 hover:shadow-xl m-4 md:p-4 rounded-md w-60 sm:w-64 h-80 group'>
            <div className='relative flex flex-col items-center w-52 h-40'>
                <Image src={proj.image} alt='Project-Image' width={800} height={700} quality={100} className='object-top group-hover:opacity-50 mb-4 rounded-lg w-52 h-36 object-cover' />
                <p className='bottom-0 absolute flex bg-white px-2 py-1 rounded-t-lg text-slate-400 text-sm capitalize'>{proj.category}</p>
                <div  className='group-hover:flex absolute flex-row justify-center items-center gap-6 hidden w-full h-full'>
                    <a href={proj.link} target='blank'>
                        <Eye className="bg-black p-1 rounded-full text-white duration-200 delay-250 size-7 hover:scale-125 transition ease-in-out" />
                    </a>
                    <a href={proj.github} target='blank'>
                        <Github className="bg-black p-1 rounded-full text-white duration-200 delay-250 size-7 hover:scale-125 transition ease-in-out" />
                    </a>
                </div>
            </div>
            <div>
                <p className='my-2 text-center'>{proj.name}</p>
                <p className='px-3 sm:px-0 text-center text-gray-500 text-sm' >{proj.desc}</p>
            </div>
        </div>
    )
}

export default ProjectCard