import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function StaffNavbar() {
    let history = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        history("/")
    };

    return (
        <nav className=' bg-slate-200 h-32 flex-wrap top-0 w-full fixed'>
            <div className='max-w-screen h-[100px]'>
                <div className='px-10 flex justify-between relative flex items-center w-full h-full'>
                    <div className='relative mt-10 flex items-center ml-10 text-[#424B5A]'>
                        <a href='/staff/home'>
                            <img
                                className="hidden lg:block h-20"
                                src="https://engineering.nyu.edu/sites/default/files/2019-01/tandon_long_color.png"
                                alt="Workflow"
                            />
                        </a>
                    </div>
                    <div className='hidden md:flex gap-4 pr-4 mr-10'>
                        <a href='/staff/add-airport'>
                            <button className='px-8 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-2xl text-white rounded-2xl hover:bg-violet-300'>
                                Add Airport
                            </button>
                        </a>

                        <a href='/staff/add-plane'>
                            <button className='px-8 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-2xl text-white rounded-2xl hover:bg-violet-300'>
                                Add Plane
                            </button>
                        </a>
                        
                        <a href='/staff/create-flight'>
                            <button className='px-8 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-2xl text-white rounded-2xl hover:bg-violet-300'>
                                Create Flight
                            </button>
                        </a>
                        
                        <a href='/staff/home'>
                            <button className='px-8 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-2xl text-white rounded-2xl hover:bg-violet-300'>
                                View Customers
                            </button>
                        </a>
                        
                        <a href='/staff/home'>
                            <button className='px-8 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-2xl text-white rounded-2xl hover:bg-violet-300'>
                                View Reports
                            </button>
                        </a>
                        
                        <a href='/staff/home'>
                            <button className='px-8 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-2xl text-white rounded-2xl hover:bg-violet-300'>
                                View Revenue
                            </button>
                        </a>
                        
                        <a href='/staff/home'>
                            <button onClick={logout} className='px-8 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-2xl text-white rounded-2xl hover:bg-violet-300'>
                                Logout
                            </button>
                        </a>
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default StaffNavbar