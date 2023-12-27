import React from 'react'
import CusButton from '../section/button'

const Navbar = () => {
const menu=[
  {
    title:"About",
    href:"#"
  },
  {
    title:"Services",
    href:"#"
  },
  {
    title:"FAQ's",
    href:"#"
  },
  {
    title:"Contact Us",
    href:"#"
  }
]


  return (
    <div className='w-full text-graycolor bg-primary flex justify-center py-[1rem]'>
        <div className='w-[90%] grid grid-cols-12'>

          {/* logo */}
          <div className='text-[2rem] row-span-full col-start-1 col-end-13 font-semibold '>
            Auto<span className='text-secondary'>connect</span>
          </div>

          {/* menu */}
          <div className='row-span-full col-start-1 col-end-13 base:hidden lg:flex gap-7 justify-center items-center font-normal text-[min(1rem,1vw)] '>
           {
            menu.map((data,idx)=>(
              <div key={idx}>
                {data.title}

              </div>
            )

            )
           } 


          </div>

          {/* buttons */}

          <div className='base:hidden lg:flex gap-6 row-span-full items-center justify-end col-start-1 col-end-13'>
            <div>
              
              Sign In
            </div>
            <CusButton type={"primary"} text={"Sign Up"} href={"#"} />

          </div>

        </div>
        
    </div>
  )
}

export default Navbar