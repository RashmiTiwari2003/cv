'use client'
import React, { useEffect, useState } from 'react'
import ProjectCard from './project-card';
import projects, { Category } from '@/data/myProjects'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel"

const Project = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [category, setCategory] = useState("all");
  const [projectData, setProjectData] = useState(projects);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [disableButton, setDisableButton] = useState(true);

  const filterItem = (category: string) => {
    setCarouselIndex(0);
    setDisableButton(true);
    if (category === "all") {
      return setProjectData(projects);
    }
    const updatedList = projects.filter((curElem) => {
      return curElem.category === category;
    })

    setProjectData(updatedList);
  }

  useEffect(() => {
    filterItem(category);
    if (api) {
      api.scrollTo(carouselIndex);
    }
  }, [category, api]);

  return (
    <div id='projects' className='flex flex-col justify-center items-center py-14 w-full'>
      <h2 className="mx-6 md:mx-0 mb-8 font-bold text-2xl md:text-3xl">Projects</h2>
      <div className='flex justify-center items-center gap-2 md:gap-8 mt-4 mb-6'>
        {Category.map((cat, ind) => (
          <button key={ind} onClick={() => setCategory(cat)} className='flex justify-center items-center bg-blue-800 hover:bg-white mb-4 hover:mb-0 px-4 py-2 hover:border-b-4 hover:border-blue-800 rounded-lg md:w-28 hover:font-bold text-sm text-white sm:text-base hover:text-black capitalize'>{cat}</button>
        ))}
      </div>
      <div className='flex flex-row flex-wrap justify-center items-center px-2'>
        {disableButton ?
          (<Carousel setApi={setApi} opts={{
            align: "start",
            dragFree: true,
          }}
            className='w-[35vh] sm:w-[45vh] md:w-[30vh] lg:w-screen lg:max-w-screen-lg'>
            <CarouselContent>
              {projectData.map((proj, ind) => (
                <CarouselItem key={ind} className="flex flex-wrap lg:basis-1/3">
                  <ProjectCard proj={proj} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>)
          :
          (<div className='flex flex-wrap justify-center items-center gap-8 mb-4'>
            {projectData.map((proj, ind) => (
              <ProjectCard key={ind} proj={proj} />
            ))}
          </div>)}
      </div>
      {disableButton ? <button className='bg-blue-900 my-8 px-6 py-3 rounded-lg text-sm text-white md:text-base transition ease-in-out hover:scale-110' onClick={() => setDisableButton(false)}> Show All Projects</button> : <button className='bg-blue-900 my-3 px-6 py-3 rounded-lg text-sm text-white hover:scale-110 md:text-base transition ease-in-out' onClick={() => setDisableButton(true)}>Hide Projects</button>}
    </div>
  )
}

export default Project