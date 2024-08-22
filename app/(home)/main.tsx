'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

const Main = () => {

    const arr = ['Student', 'Engineer', 'Developer'];
    const arrRef = useRef<HTMLHeadingElement>(null);
    const i = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (arrRef.current) {
                arrRef.current.textContent = arr[i.current];
            }
            i.current += 1;
            if (i.current >= 3) {

                i.current = 0;
            }
        }, 2000)
    },[]);

    return (
        <div id='home' className='relative flex justify-center items-center w-full min-h-[75vh] sm:min-h-[90vh]'>
            <div className='z-10 flex flex-col justify-center items-center'>
                <div className="py-2 font-bold font-sans text-2xl">Hey, This is Rashmi Tiwari</div>
                <h1 ref={arrRef} className="opacity-75 py-4 font-semibold font-serif text-2xl italic"></h1>
                <p className="opacity-65 py-2 font-sans text-2xl">Welcome to my Site</p>
            </div>
            <Image src="/images/homepage/home.jpg" alt="profile" fill priority style={{ objectFit: "cover" }} className='opacity-85 w-full h-auto object-center' />
        </div>
    )
}

export default Main