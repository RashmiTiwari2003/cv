'use client'
import React, { useEffect, useRef } from 'react'


const QualArr = () => {
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
    }, []);
    return (
        <>
            <h1 ref={arrRef} className="opacity-75 py-4 font-semibold font-serif text-2xl italic"></h1>
        </>
    )
}

export default QualArr