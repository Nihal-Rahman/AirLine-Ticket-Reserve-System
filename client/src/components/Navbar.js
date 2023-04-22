import React, { useState } from 'react'

function Navbar() {

    return (
        <nav className='nav bg-white flex-wrap'>
            <div className='w-screen h-[100px] z-10 fixed'>
                <div className='px-10 flex justify-between relative flex items-center w-full h-full'>
                    <div className='relative mt-20 flex items-center ml-32 text-[#424B5A]'>
                        <a href='/'>
                            <img
                                className="hidden lg:block h-20"
                                src="https://engineering.nyu.edu/sites/default/files/2019-01/tandon_long_color.png"
                                alt="Workflow"
                            />
                        </a>
                    </div>
                    <div className='hidden md:flex pr-4 mr-32'>
                        <a href='/user'>
                            <button className='px-16 mr-4 mt-20 py-3 drop-shadow-lg bg-[#424B5A] text-4xl text-white rounded-2xl hover:bg-[#3c8b8a] focus:bg-[#3c8b8a]'>
                                Sign In
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            
        </nav>
    )
}

export default Navbar