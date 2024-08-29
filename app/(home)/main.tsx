import React from 'react'
import Image from 'next/image'
import QualArr from './qualArr';

const Main = () => {

    return (
        <div id='home' className='relative flex justify-center items-center w-full min-h-[75vh] sm:min-h-[90vh]'>
            <div className='z-10 flex flex-col justify-center items-center'>
                <div className="py-2 font-bold font-sans text-2xl">Hey, This is Rashmi Tiwari</div>
                <QualArr/>
                <p className="opacity-65 py-2 font-sans text-2xl">Welcome to my Site</p>
            </div>
            <Image src="/images/homepage/home.jpg" alt="profile" fill priority style={{ objectFit: "cover" }} className='opacity-85 w-full h-auto object-center' />
        </div>
    )
}

export default Main