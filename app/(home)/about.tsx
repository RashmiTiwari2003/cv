import React from 'react'
import Image from 'next/image'
import aboutName from '@/data/myAbout'

const About = () => {
    return (
        <div id='about' className='flex flex-col justify-center items-center bg-blue-50 py-20 w-full md:h-fit'>
            <h2 className="mx-6 md:mx-0 mb-6 md:mb-10 font-bold text-2xl text-center md:text-4xl">Make it <span className='text-blue-800'>work</span>, make it <span className='text-blue-800'>right</span>, make it <span className='text-blue-800'>fast</span>.</h2>
            <div className='flex md:flex-row flex-col flex-wrap justify-center items-center gap-4 md:border-2 shadow-none md:shadow-[0_20px_8px_-4px_rgb(173,216,230)] md:mx-12 mb-14 p-4 md:rounded-3xl'>
                {aboutName.map((skill, ind) => (
                    <div className="flex flex-col justify-center items-center border-2 shadow-[0_20px_8px_-4px_rgb(173,216,230)] md:shadow-none m-4 p-4 md:p-0 md:border-none rounded-xl md:rounded-none" key={skill.name + ind} >
                        <Image src={skill.image} alt='image' width={250} height={250} className='mb-3 md:mb-6 rounded-xl md:w-80 md:h-64' />
                        <h1 className='pb-4 h-10 font-bold'>{skill.name}</h1>
                        <p className='pb-2 w-[250px] h-20 text-center text-sm'>{skill.desc}</p>
                    </div>
                ))}
            </div>
            <div >
                <button className='border-2 bg-blue-400 hover:bg-blue-800 hover:shadow-[0_20px_8px_-4px_rgb(173,216,230)] md:mt-4 px-5 py-3 hover:border-blue-800 rounded-lg w-fit font-extrabold font-mono hover:text-white transition delay-150 ease-in-out hover:scale-110'><a
                    href="Rashmi Resume.pdf" download="Rashmi's Resume">Download Resume</a></button>
            </div>
        </div>
    )
}

export default About