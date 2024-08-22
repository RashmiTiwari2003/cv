import React from 'react'
import Image from 'next/image'
import skillName from '@/data/mySkills'

const Skills = () => {
  return (
    <div id='skills' className='flex flex-col justify-center items-center bg-blue-50 px-8 py-14'>
      <h2 className="mx-6 md:mx-0 mb-8 font-bold text-2xl md:text-3xl">Skills</h2>
      <div className='flex flex-wrap justify-center items-center gap-6 md:gap-10 md:mt-10'>
        {skillName.map((skill, ind) => (
          <div key={ind} className='flex flex-col justify-center items-center w-20 md:w-28 text-center'>
            <Image src={skill.image} alt='icon' width={80} height={80} quality={100} className='border-2 bg-white m-4 p-2 rounded-full' />
            <p className='font-mono text-center'>
              {skill.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills