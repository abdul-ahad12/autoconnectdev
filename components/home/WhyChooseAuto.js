import React from 'react'
import TitleDesc from '../section/TitleDesc'

const WhyChooseAuto = () => {
const content=[
    {
        img:"/whychooseus/Protect.svg",
        title:"100% Warranty",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        img:"/whychooseus/Pickup.svg",
        title:"100% Warranty",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        img:"/whychooseus/Sanitizer.svg",
        title:"100% Warranty",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        img:"/whychooseus/Taxi.svg",
        title:"100% Warranty",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        img:"/whychooseus/Protect.svg",
        title:"100% Warranty",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        img:"/whychooseus/Pickup.svg",
        title:"100% Warranty",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        img:"/whychooseus/Sanitizer.svg",
        title:"100% Warranty",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        img:"/whychooseus/Taxi.svg",
        title:"100% Warranty",
        desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },

]


  return (
    <div className='w-full flex items-center flex-col'>
        <div className='w-[90%] py-[5rem]'>
            <TitleDesc title={"WHY CHOOSE"} titleColor={"AutoConnect?"} />
            <div className='py-[4rem] grid base:grid-cols-2 lg:grid-cols-4 base:gap-[2rem] lg:gap-[6rem]'>
                {content.map((data,idx)=>{
                    return(
                        <div key={idx} className='flex flex-col'>
                            <img className='lg:w-[4rem] base:w-[3rem]' src={data.img} />
                            <div className='base:text-[1.2rem] leading-5 base:py-2 lg:text-[1.8rem] font-semibold text-primary'>{data.title}</div>
                            <div className='text-graycolor2 text-[0.8rem] lg:text-[1rem] '>{data.desc}</div>

                            </div>

                    )
                })}

            </div>

        </div>
        
    </div>
  )
}

export default WhyChooseAuto