import React from 'react'
import Image from 'next/image'

import cont from '@/data/myContacts'

const Footer = () => {
    return (
        <div id='footer' className='flex flex-col justify-center items-center p-6 w-full' >
            <h1 className='justify-center items-center my-6 md:my-8 font-bold font-mono text-center text-xl md:text-2xl'>Thank You for visiting my Site.</h1>
            <div className='flex justify-center items-center gap-10'>
                {cont.map((con, ind) => (
                    <div key={ind} className='flex justify-center items-center'>
                        <a className='flex justify-center items-center gap-2' key={con.name} href={con.link}>
                            <Image src={con.image} alt='linkedin' width={40} height={40} />
                            <p className='font-'>{con.name}</p>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Footer