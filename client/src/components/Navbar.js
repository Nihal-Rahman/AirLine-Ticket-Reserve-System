import React, { useState } from 'react'

function Navbar() {

    return (
        <nav className=' bg-slate-200 h-32 flex-wrap top-0 w-full fixed'>
            <div className='max-w-screen h-[100px]'>
                <div className='px-10 flex justify-between relative flex items-center w-full h-full'>
                    <div className='relative mt-10 flex items-center ml-10 text-[#424B5A]'>
                        <a href='/'>
                            <img
                                className="hidden lg:block h-20"
                                src="https://engineering.nyu.edu/sites/default/files/2019-01/tandon_long_color.png"
                                alt="Workflow"
                            />
                        </a>
                    </div>
                    <div className='hidden md:flex pr-4 mr-10'>
                        <a href='/user/register'>
                            <button className='px-16 mr-4 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-4xl text-white rounded-2xl hover:bg-violet-300 focus:bg-[#3c8b8a]'>
                                Register
                            </button>
                        </a>

                        <a href='/user/login'>
                            <button className='px-16 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-4xl text-white rounded-2xl hover:bg-violet-300 focus:bg-[#3c8b8a]'>
                                Login
                            </button>
                        </a>
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default Navbar